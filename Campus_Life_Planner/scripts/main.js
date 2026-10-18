import { tasks, setTasks, addOrUpdateTask } from "./state.js";
import { saveTasks, saveSettings, exportTasks, importTasks } from "./storage.js";
import { validateTask } from "./validators.js";
import { displayTask, updateDashboard } from "./ui.js";

const searchInput = document.getElementById("search");
const caseSensitive = document.getElementById("case-sensitive");
const sortSelect = document.getElementById("sort");
const taskform = document.getElementById("task-form");

const tasktitle = document.getElementById("task-title");
const titleError = document.getElementById("title-error");       
tasktitle.addEventListener("input", function(){
    titleError.textContent = "";
});

const taskdate = document.getElementById("task-date")
const taskduration = document.getElementById("task-duration");
const taskcategory = document.getElementById("task-category");

const weeklyTarget = document.getElementById("weekly-target");
weeklyTarget.value = localStorage.getItem("weeklyTarget") || "";
document.getElementById("time-format").value = localStorage.getItem("timeFormat") || "minutes";

taskform.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = tasktitle.value;
    const date = taskdate.value;
    const duration = taskduration.value;
    const category = taskcategory.value;

    if (!validateTask(title, date, duration, category)) {
        return;
    }

    const task = {
        title: title,
        date: date,
        duration: duration,
        category: category
    };

    const taskId = document.getElementById("task-id").value;
    addOrUpdateTask(task, taskId);

    displayTask();
    updateDashboard();
    saveTasks(tasks);
    taskform.reset();

    document.getElementById("task-id").value = "";
    taskform.querySelector('button[type="submit"]').textContent =
         "save Task";

});

searchInput.addEventListener("input", displayTask);
caseSensitive.addEventListener("change", displayTask);
sortSelect.addEventListener("change", displayTask);

document.getElementById("export-data").addEventListener("click", function() {
    exportTasks(tasks);
});

document.getElementById("import-data").addEventListener("click", function(){
    importTasks(function(importedTasks) {
        setTasks(importedTasks);
        saveTasks(tasks);
        displayTask();
        updateDashboard();
    });
});

document.getElementById("save-settings").addEventListener("click",function(){
    saveSettings();
    updateDashboard();
});


displayTask();
updateDashboard();