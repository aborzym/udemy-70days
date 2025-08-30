const button = document.querySelector(".container button");

button.addEventListener("click", addTask);

const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const newTask = taskInput.value.trim();
  if (!newTask) return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: newTask, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
};

const renderTasks = () => {
  const taskList = document.getElementById("taskList");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.text;
    if (task.completed) {
      taskItem.classList.add("completed");
    } else {
      taskItem.classList.remove("completed");
    }
    taskItem.onclick = () => toggleTask(i);
    taskList.appendChild(taskItem);
  });
};

const toggleTask = (index) => {};
