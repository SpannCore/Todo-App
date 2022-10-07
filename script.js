let addMessage = document.getElementById('input');
let addButton = document.getElementById('add');
let todo = document.getElementById('todo-list');

let tasks = [];

if (localStorage.getItem('todo')) {
  tasks = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

function addTask() {
  if (!addMessage.value.trim()) {
    return;
  }
  // let checked = true;

  // tasks.forEach((item) => {
  //   if (addMessage.value.trim() === item.text) {
  //     checked = false;
  //   }
  // });

  // if (!checked) return;

  let newTodo = {
    text: addMessage.value,
    checked: false,
  };

  tasks.push(newTodo);
  displayMessages();
  addMessage.value = '';
  localStorage.setItem('todo', JSON.stringify(tasks));
}

addMessage.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addTask();
});

addButton.addEventListener('click', () => {
  addTask();
});

function displayMessages() {
  todo.innerHTML = '';
  tasks.forEach((item, index) => {
    let displayMessage = `
    <div class="task" data-index="${index}">
      <label>
        <input type="checkbox" class="check" id="item_${index}" ${
      item.checked ? 'checked' : ''
    }/>
        <div></div>
      </label>
      <div class="task-text ${item.checked ? 'complete' : ''}" >
        ${item.text}
      </div>
      <div class="task-del" id="del">x</div>
    </div>
    `;

    todo.insertAdjacentHTML('beforeend', displayMessage);
  });
}

todo.addEventListener('change', function (event) {
  let idInput = event.target.getAttribute('id');
  let task = document
    .querySelector(`#${idInput}`)
    .parentNode.parentNode.querySelector('.task-text')
    .textContent.trim();

  tasks.forEach((item) => {
    if (item.text === task) {
      item.checked = !item.checked;
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(tasks));
    }
  });
});

todo.addEventListener('click', function (e) {
  let delButton = e.target.classList.contains('task-del');
  if (delButton) {
    let taskIndex = e.target.parentNode.dataset.index;

    tasks.splice(taskIndex, 1);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(tasks));
  }
});
