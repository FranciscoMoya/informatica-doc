document.addEventListener('load', function(event){
    var forms = document.getElementByTag('form');
    var i;
    for(i=0; i<forms.length; i++) {
	form.addEventListener('submit', function(e){
	    window.fetch('url', { 
		method: 'POST',
		body: JSON.stringify({ 
		    user: userid,
		    task: taskid,
		    mode: 'submit',
		    form: formid
		})
	    });
	});
    };
    if (x.length) {
	window.fetch('url', { 
	    method: 'POST',
	    body: JSON.stringify({ 
		user: userid,
		task: taskid,
		mode: 'visit',
		forms: formids
	    })
	});
    }
});

