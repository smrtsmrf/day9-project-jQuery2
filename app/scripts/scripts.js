$(document).ready(function() {
	$('#newTaskForm').hide();

	var listo = [];


	var Task = function(task) {
		this.task = task;
		this.id = 'new';
	};


	var addTask = function (task) {
		if (task) {
			task = new Task(task);
		 	listo.push(task);

			$('#newItemInput').val('');
			$('#newList').append(
				'<a href="#finish" class="" id="item">' +
				'<li class="list-group-item">' +
			 	'<h3>' + task.task + '</h3>' +
			 	'<span class="arrow pull-right">' +
			 	'<i class="glyphicon glyphicon-arrow-right">' +
			 	'</span>' +
			 	'</li>' +
			 	'</a>');
		} 
		$('#newTaskForm').slideToggle('fast','linear');
	};


	var advanceTask = function (task) {
		 var modified = task.innerText.trim();
		 for (var i = 0; i < listo.length; i++) {
		 	if (listo[i].task === modified) {
		 		if (listo[i].id === 'new') {
		 			listo[i].id = 'inProgress';
		 		}
		 		else if (listo[i].id === 'inProgress') {
		 			listo[i].id = 'archived';
		 		}
		 		else {
		 			listo.splice(i,1);
		 		}
		 		break;
		 	}
		 };
		 task.remove();
	};


	// add new task
	$('#saveNewItem').click(function(e) {
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});


	// opens form
	$('#add-todo').click(function () {
		 $('#newTaskForm').fadeToggle('fast', 'linear');
	});


	// closes form 
	$('#cancel').click(function (e) {
		 e.preventDefault();
		 $('#newTaskForm').fadeToggle('fast','linear');
	});


	// change from new to inProgress
	$(document).on('click','#item',function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id = 'inProgress';
		$('#currentList').append(this.outerHTML);
	});

	// change from inProgress to archived
	$(document).on('click','#inProgress',function(e) {
		e.preventDefault();
		var task = this;
		task.id = 'archived';
		var changeIcon = task.outerHTML.replace(
			'glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
	});

	// delete items from list
	$(document).on('click','#archived',function(e) {
		e.preventDefault();
		var task = this;
		advanceTask(task);
	});


}); // end of doc ready