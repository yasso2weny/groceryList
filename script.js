const form = document.querySelector('#to-do-form');
const input = document.querySelector('#input-task');
const taskList = document.querySelector('#task-list');

const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', function() {
  this.classList.toggle('open');
});


let tasks = [];

function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
	tasks = JSON.parse(savedTasks);
	renderTasks();
}

function renderTasks() {
	taskList.innerHTML = '';
	for (let i = 0; i < tasks.length; i++) {
		const task = tasks[i];
		const li = document.createElement('li');
		const span = document.createElement('span');
		span.innerText = task;
		li.appendChild(span);
		taskList.appendChild(li);

		// Add the delete button to the task
		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-button');
		deleteButton.textContent = 'X';
		deleteButton.style.display = 'none'; // Hide the delete button by default

		li.appendChild(deleteButton);

		// Show the delete button when the task is clicked
		li.addEventListener('click', () => {
			if (deleteButton.style.display === 'none') {
				deleteButton.style.display = 'inline-block';
			} else {
				deleteButton.style.display = 'none';
			}
		});

		// Remove the task when the delete button is clicked
		deleteButton.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent the task from being clicked when the delete button is clicked
			tasks.splice(i, 1);
			saveTasks();
			renderTasks();
		});
	}
}

taskList.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON' && event.target.classList.contains('delete-button')) {
		const li = event.target.parentNode;
		const index = Array.from(taskList.children).indexOf(li);
		tasks.splice(index, 1);
		saveTasks();
		renderTasks();
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const task = input.value.trim();
	if (task !== '') {
		tasks.push(task);
		saveTasks();
		renderTasks();
		input.value = '';
		input.focus();
	}
});