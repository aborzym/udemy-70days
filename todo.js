const button = document.querySelector(".container button");

const loadTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

const uploadTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const newTask = taskInput.value.trim();
  if (!newTask) return;
  const tasks = loadTasks();
  tasks.push({ text: newTask, completed: false });
  uploadTasks(tasks);
  taskInput.value = "";
  renderTasks();
};

const renderTasks = () => {
  const taskList = document.getElementById("taskList");
  const tasks = loadTasks();

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

const toggleTask = (index) => {
  //pobrac z local storage (parse)
  const tasks = loadTasks();
  //zmienić task z completed na null
  tasks[index].completed = !tasks[index].completed;
  //wyslac do local
  uploadTasks(tasks);
  //render
  renderTasks();
};

//funkcja kasowania ukonczonych tasków
const deleteCompleted = () => {
  const tasks = loadTasks();

  //usunac completed

  const filteredTasks = tasks.filter((e) => {
    return !e.completed;
  });
  console.log(filteredTasks);
  uploadTasks(filteredTasks);
  renderTasks();
};

const resetAllTasks = () => {
  localStorage.removeItem("tasks");
  renderTasks();
};
button.addEventListener("click", addTask);

const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

//ładowanie zadań przy otwarciu strony
document.addEventListener("DOMContentLoaded", renderTasks);

//funkcjonalność kasowania ukonczonych tasków

const resetCompletedBtn = document.getElementById("resetCompletedBtn");

resetCompletedBtn.addEventListener("click", deleteCompleted);

//kasowanie wszystkich tasków

const resetAllBtn = document.getElementById("resetAll");
resetAllBtn.addEventListener("click", resetAllTasks);
