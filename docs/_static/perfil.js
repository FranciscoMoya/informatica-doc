var perfil_url='';

function get_userId() {
    var userid = document.getElementsByName('userid');
    if (userid.length)
	return userid[0].value;
    return 'anonnymous';
}

function get_taskId() {
    var id = document.getElementsByName('id');
    if (id.length)
	return id[0].value;
    return 'unknown';
}

document.addEventListener('load', function(event){
    var i, forms = document.getElementByTag('form');
    var i;
    for(i=0; i<forms.length; i++) {
	form.addEventListener('submit', function(e){
	    window.fetch(perfil_url, { 
		method: 'POST',
		body: JSON.stringify({ 
		    user: get_userId(),
		    task: get_taskId(),
		    mode: 'submit',
		    form: forms[i].id
		})
	    });
	});
    };
    if (forms.length) {
	window.fetch(perfil_url, {
	    method: 'POST',
	    body: JSON.stringify({ 
		user: get_userId(),
		task: get_taskId,
		mode: 'visit',
		forms: forms[0].id
	    })
	});
    }
});

