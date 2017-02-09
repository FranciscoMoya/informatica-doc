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
//    TestCase class must be named Test.
//
// 3. Optionally define a container (em, span) with id failures containing the
//    maximum number of allowed failures (0 by default).

function installPythonFacade() {
    var editor = $('div.felement.feditor');
    if (editor.length == 0)
	return;
    editor.hide();
    editor.after('<div style="float:right; background-color:#FFF;">' +
                 '<input type="checkbox" id="python3" checked>Python 3</div>' + 
	         '<textarea rows="7" style="width:97%;font-family:monospace;"' +
                 ' id="code">' + getSubmittedCode() + '</textarea>' +
		 '<div id="status"></div>' +
		 '<div id="canvas"></div>' + 
	         '<pre id="output"></pre>');
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
    testPythonProgram(prog).then(
	function success(fail) {
            updateSubmittedText(fail);
	    $.post(form.attr('action'), form.serialize(), function(msg) {
		form.replaceWith($('div.submissionstatustable', $(msg)));
	    });
	}, 
	function failure(err) { 
	    status.html('<p>' + err.toString() + '</p>');
	});
}

function testPythonProgram(prog) {
    var testFail = 'Corrije los errores antes de enviar.'
    return new Promise(function (resolve, reject) {
	Sk.misceval.asyncToPromise(function () {
	    return Sk.importMainWithBody("<stdin>", false, prog, true);
	}).then(function (module) {
	    var test = module.tp$getattr('test__');
	    Sk.misceval.callsimAsync(null, test).then(
		function (r) {
		    if (r.v > allowedFailures()) reject(testFail);
		    else resolve(r.v); 
		},
		reject);
	}, reject);
    });
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
	throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function stdOut(text) {
    $('#output').append(text);
}

function buildProg() {
    var prog = $('#code').val();
    return prog + unittest($('#unittest'));
}

function unittest(elem) {
    if (elem.length == 0)
	return '\ndef test__():\n return True';
    return '\nimport unittest\n' + 
	elem.html() +
	'\ndef test__():\n' +
	' t=Test()\n t.main()\n' +
	' return t.numFailed'; 
}

function updateSubmittedText(fail) {
    var prog = $('#code').val(),
        out = $('#output').text(),
        header = "''' " + $("input[name=userid]").val() +
                 " (" + fail.toString() + " failures)\n\n",
        sep = $('#id_onlinetext_editor').attr("code-separator"),
        doc = header + out + sep + prog;
    $('#id_onlinetext_editor').val(doc);
}

function getSubmittedCode() {
    var sep = "\n===='''\n\n";
    $('#id_onlinetext_editor').attr("code-separator", sep);
    var code = $('#id_onlinetext_editor').val().split(sep);
    return code.length > 1? code[1]: code[0];
}

function isPython3Source() {
    var py3 = $('#python3')
    if (py3.length == 0) return true;
    return py3.prop('checked');
}

function allowedFailures() {
    var f = $('#failures')
    if (f.length == 0) return 0;
    return parseInt(f.text(), 10);
}

function loadJS (url, parent, success){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.onload = success;
    scriptTag.onreadystatechange = success;
    parent.appendChild(scriptTag);
};

//loadJS('https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
//loadJS('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
loadJS('https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',
       document.head, function() {
    $(document).ready(installPythonFacade);
    loadJS('https://www.promisejs.org/polyfills/promise-7.0.4.min.js',
           document.head, function(){});
    var skulpt_base = 'https://rawgit.com/skulpt/skulpt-dist/master/';
    loadJS(skulpt_base + 'skulpt.min.js', document.head, function() {
	loadJS(skulpt_base + 'skulpt-stdlib.js', document.head, function(){});
    });
});
