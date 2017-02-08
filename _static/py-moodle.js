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

function installPythonFacade() {
    var editor = $('div.felement.feditor');
    if (editor.length == 0)
	return;
    editor.hide();
    editor.after('<div style="float:right; background-color:#FFF;">' +
                 '<input type="checkbox" id="python3" checked>Python 3</div>' + 
	         '<textarea style="width:100%" id="code">' +
                 $('#id_onlinetext_editor').val() + '</textarea>' +
		 '<pre id="output"></pre>' +
		 '<div id="canvas"></div>' + 
		 '<div id="status"></div>');
    $('#mform1').submit(testAndSubmitPythonProgram);
}

function testAndSubmitPythonProgram(e) {
    e.preventDefault();

    var	prog = buildProg(),
	output = $('#output'), 
	status = $('#status'),
	form = $('#mform1');

    status.text('');
    output.text('');
    Sk.configure({
	output: stdOut,
	read: builtinRead,
	python3: isPython3Source(),
	imageProxy: 'http://image.runestone.academy:8080/320x',
	inputfunTakesPrompt: true,
    });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = this.graphics;
    Sk.canvas = 'canvas';
    testPythonProgram(prog).then(
	function success(r) { 
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
	    var test = module.tp$getattr('test_');
	    Sk.misceval.callsimAsync(null, test).then(
		function (r) { if (r.v) resolve(); else reject(testFail); },
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
    $('#id_onlinetext_editor').val(prog);
    return prog + unittest($('#unittest'));
}

function unittest(elem) {
    if (elem.length == 0)
	return '\ndef test_():\n return True';
    return '\nimport unittest\n' + 
	elem.html() +
	'\ndef test_():\n' +
	' t=Test()\n t.main()\n' +
	' return t.numFailed == 0'; 
}

function isPython3Source() {
    var py3 = $('#python3')
    if (py3.length == 0) return true;
    return py3.prop('checked');
}

require(['https://www.promisejs.org/polyfills/promise-7.0.4.min.js',
	 'https://www.promisejs.org/polyfills/promise-done-7.0.4.js',
	 'https://franciscomoya.github.io/informatica-doc/docs/_static/skulpt.min.js',
         'https://franciscomoya.github.io/informatica-doc/docs/_static/skulpt-stdlib.js',
         'https://franciscomoya.github.io/informatica-doc/docs/_static/jquery.js'], 
	function(){
	    var editor = $('div.felement.feditor');
	    if (editor.length != 0)
		editor.hide();
	    $(document).ready(initPythonMoodleTask);
	});
}
