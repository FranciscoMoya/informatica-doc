// Copyright (C) 2017 by Francisco Moya <francisco.moya@uclm.es>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Usage:
//
// 1. Insert a <script> tag in the task description:
//    <script src="py-moodle.js">
//
// 2. Define a container (pre, div) with id unittest containing the TestCase.
//    either class Test(TestCase) or class Test(TestCaseGui).
//
// 3. Optionally define a container (em, span, div) with id minpass
//    containing the minimum number of tests (asserts) required to
//    submit.

// Note: minpass has a different meaning when using TestCase (number
// of test_ methods successfully executed) or TestCaseGui (number of
// asserts successfully passed). This is an issue related to Skulpt
// unittest.gui

var code_separator = "\n# === === === # \n";

function installPythonFacade() {
    var editor = document.getElementById('id_onlinetext_editor');
    if (!editor)
	return;
    editor.setAttribute('id', '_id_onlinetext_editor'); // prevent rich-text install
    editor.style.display = 'block';
    editor.style.fontFamily = 'monospace';
    editor.value = getUserCode();
    
    var py3 = document.createElement('div');
    py3.style = 'float:right; background-color:#FFF;';
    py3.innerHTML = '<input type="checkbox" id="python3" checked>Python 3';
    editor.parentNode.insertBefore(py3, editor);

    var output = document.createElement('div');
    output.innerHTML= '<div id="status"></div>' +
	'<div id="canvas"></div>' + 
	'<div id="test"><pre id="output"></pre></div>';
    editor.parentNode.insertBefore(output, editor.nextSibling);

    var form = document.getElementById('mform1');
    if (form.addEventListener)
	form.addEventListener("submit", testAndSubmitPythonProgram, false);
    else if (form.attachEvent)
	form.attachEvent("onsubmit", testAndSubmitPythonProgram);
}

function testAndSubmitPythonProgram(e) {
    e.preventDefault();

    var output = document.getElementById('output');
    var status = document.getElementById('status');
    var form = document.getElementById('mform1');
    var prog = buildProg();

    status.innerHTML = '';
    output.innerHTML = '';
    Sk.configure({
	output: stdOut,
	read: builtinRead,
	python3: isPython3Source(),
	inputfunTakesPrompt: true,
    });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'canvas';
    Sk.canvas = 'canvas';
    Sk.divid = 'test';
    testPythonProgram(prog).then(
	function success(summary) {
            updateSubmittedText(summary[0], summary[1]);
	    form.submit();
	}, 
	function failure(err) { 
	    status.innerHTML = '<p>' + err.toString() + '</p>';
	});
}

function testPythonProgram(prog) {
    var testFail = 'Corrije los errores que se muestran abajo antes de enviar.'
    return new Promise(function (resolve, reject) {
	Sk.misceval.asyncToPromise(function () {
	    return Sk.importMainWithBody("<stdin>", false, prog, true);
	}).then(function (module) {
	    var test = module.tp$getattr('test__');
	    Sk.misceval.callsimAsync(null, test).then(
		function (r) {
		    var ret = Sk.ffi.remapToJs(r);
		    var results = document.getElementById('test_unit_results');
		    if (results)
			results.style.display = 'none';
		    if (ret[0] < minPassed()) reject(testFail);
		    else resolve(ret);
		},
		reject);
	}, reject);
    });
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
	var div = document.getElementById(x);
	if (div) return div.textContent;
	throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles["files"][x];
}

function stdOut(text) {
    var output = document.getElementById('output');
    output.innerHTML += sanitize(text);
}

function buildProg() {
    var prog = getUserCode() + unittest(document.getElementById('unittest'));
    return unsanitize(prog);
}

function unittest(elem) {
    if (!elem)
	return '\ndef test__():\n return [1,1]';
    return '\nfor n in ["Test","unittest","TestCase","TestCaseGui"]:' +
        '\n if n in globals():' +
        '\n  raise ImportError("No incluyas pruebas ({})".format(n))' +
        '\nfrom unittest.gui import TestCaseGui\n' + 
	'from unittest import TestCase\n' + 
	elem.innerHTML +
	'\ndef test__():\n' +
	' t=Test()\n t.main()\n' +
	' return [t.numPassed, t.numFailed]'; 
}

function unsanitize(text) {
    return text
	.replace(new RegExp('&amp;', 'g'), '&')
	.replace(new RegExp('&lt;', 'g'), '<')
	.replace(new RegExp('&gt;', 'g'), '>');
}

function sanitize(text) {
    return text
	.replace(new RegExp('<', 'g'), '&lt;')
	.replace(new RegExp('>', 'g'), '&gt;')
	.replace(new RegExp('&', 'g'), '&amp;');
}

function getUserCode() {
    var code = document.getElementById('_id_onlinetext_editor');
    var sec = code.value.split(code_separator);
    var prog =  sec.length > 1? sec[1]: sec[0]; 
    return unsanitize(prog);
}

function updateSubmittedText(passed, failed) {
    var prog = getUserCode();
    var out = document.getElementById('output').innerHTML;
    var header = (isPython3Source()? "#py3 ": "#py2 ") + passed.toString() + " passed / " + failed.toString() + " failed\n";
    var doc = '<pre>' + header + code_separator + prog + code_separator + out + '</pre>';
    document.getElementById('_id_onlinetext_editor').value = doc;
}

function isPython3Source() {
    var py3 = document.getElementById('python3');
    if (!py3) return true;
    return py3.checked;
}

function minPassed() {
    var f = document.getElementById('minpass');
    if (!f) return 0;
    return parseInt(f.innerHTML, 10);
}

// https://raw.githubusercontent.com/jfriend00/docReady/master/docready.js
(function(funcName, baseObj) {
    "use strict";
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    
    baseObj[funcName] = function(callback, context) {
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

docReady(installPythonFacade);
