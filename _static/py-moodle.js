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
// 3. Optionally define a container (em, span) with id minpass containing the
//    minimum number of tests (asserts) required to submit (0 by default).


var code_separator = "\n---- \n==== \n";

function installPythonFacade() {
    var editor = $('div.felement.feditor');
    if (editor.length == 0)
	return;
    editor.hide();
    editor.after('<div style="float:right; background-color:#FFF;">' +
                 '<input type="checkbox" id="python3" checked>Python 3</div>' + 
	         '<textarea rows="7" style="width:97%;font-family:monospace;"' +
                 ' id="code">' + sanitize(getSubmittedCode()) + '</textarea>' +
		 '<div id="status"></div>' +
		 '<div id="canvas"></div>' + 
	         '<div id="test"><pre id="output"></pre></div>');
    $('#mform1').submit(testAndSubmitPythonProgram.bind(null,$));
}

function testAndSubmitPythonProgram($, e) {
    e.preventDefault();
    window.$ = $;

    var output = $('#output'), 
	status = $('#status'),
	form = $('#mform1'),
        prog = buildProg();

    status.text('');
    output.text('');
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
	    $.post(form.attr('action'), form.serialize(), function(msg) {
		form.replaceWith($('div.submissionstatustable', $(msg)));
	    });
	}, 
	function failure(err) { 
	    status.html('<p>' + err.toString() + '</p>');
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
		    $('#test_unit_results p').hide(); // Remove missleading summaries
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
    $('#output').append(sanitize(text));
}

function buildProg() {
    var prog = $('#code').val() + unittest($('#unittest'));
    return unsanitize(prog);
}

function unittest(elem) {
    if (elem.length == 0)
	return '\ndef test__():\n return [1,1]';
    return '\nfor n in ["Test","unittest","TestCase","TestCaseGui"]:' +
        '\n if n in globals():' +
        '\n  raise ImportError("No incluyas pruebas ({})".format(n))' +
        '\nfrom unittest.gui import TestCaseGui\n' + 
	'from unittest import TestCase\n' + 
	elem.text() +
	'\ndef test__():\n' +
	' t=Test()\n t.main()\n' +
	' return [t.numPassed, t.numFailed]'; 
}

function unsanitize(text) {
    return text
	.replace(new RegExp('&amp;', 'g'), '&')
	.replace(new RegExp('&lt;', 'g'), '<')
	.replace(new RegExp('&gt;', 'g'), '>')
	.replace(new RegExp('&#34;', 'g'), '"')
	.replace(new RegExp('&#39;', 'g'), "'");
}

function sanitize(text) {
    /* unsanitize to avoid double encoding */
    return unsanitize(text)
	.replace(new RegExp('<', 'g'), '&lt;')
	.replace(new RegExp('&', 'g'), '&amp;')
	.replace(new RegExp('"', 'g'), '&#34;')
	.replace(new RegExp("'", 'g'), '&#39;');
}

function updateSubmittedText(passed, failed) {
    var prog = $('#code').val(),
        out = $('#output').text(),
        header = $("input[name=userid]").val() +
                 " (" + passed.toString() + "/" + failed.toString() + ")\n\n",
        doc = '<pre>' + header + out + code_separator + prog + code_separator + '</pre>';
    $('#id_onlinetext_editor').val(sanitize(doc));
}

function getSubmittedCode() {
    var code = $('#id_onlinetext_editor').val().split(code_separator);
    return code.length > 1? code[1]: code[0];
}

function isPython3Source() {
    var py3 = $('#python3');
    if (py3.length == 0) return true;
    return py3.prop('checked');
}

function minPassed() {
    var f = $('#minpass');
    if (f.length == 0) return 0;
    return parseInt(f.text(), 10);
}

function loadJS (url, success){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;
    document.head.appendChild(scriptTag);
};

// There is an incompatibility between jQuery 3.1 and
// https://campusvirtual.uclm.es/lib/requirejs.php/1476343773/core/first.js
// therefore we stay at 2.2
loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', function(){
    loadJS('https://www.promisejs.org/polyfills/promise-7.0.4.min.js', function(){});
    var skulpt_base = 'https://rawgit.com/skulpt/skulpt-dist/master/';
    loadJS(skulpt_base + 'skulpt.min.js', function() {
	loadJS(skulpt_base + 'skulpt-stdlib.js', function(){});
    });
    $(document).ready(installPythonFacade);
});
