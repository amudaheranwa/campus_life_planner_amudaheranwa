import { tasks } from "./state.js";
import { matchesSearch } from "./search.js";

export function displayTask() {
    const tasklist = document.getElementById("task-list");
    const sortSelect = document.getElementById("sort");
    tasklist.innerHTML = "";

    tasks.sort((a, b) =>{
        if (sortSelect.value === "title") {
            return a.title.localeCompare(b.title);
        }

        if (sortSelect.value === "duration") {
            return Number(a.duration) - Number(b.duration);

        }
        return a.date.localeCompare(b.date);

    });

    for (let i = 0; i < tasks.length; i++) {

        const result = matchesSearch(tasks[i]);
        if (result === null) {
            return;
        }
        if (result === false) {
            continue;
        }

        const row = document.createElement("tr");

        row.innerHTML = `<td>${tasks[i].title}</td>
        <td>${tasks[i].date}</td>
        <td>${tasks[i].duration}</td>
        <td>${tasks[i].category}</td>
        `;
        tasklist.appendChild(row);
    }
}

export function updateDashboard() {
    const totalTasks = document.getElementById("total-tasks");
    const totalStudyTime = document.getElementById("total-study-time");
    const weeklyTarget = document.getElementById("weekly-target");
    const targetStatus = document.getElementById("target-status");   
    
    totalTasks.textContent = tasks.length;

    let total = 0;
    for (let i=0; i <tasks.length; i++) {
        total += Number(tasks[i].duration);
    }
    if (document.getElementById("time-format").value === "hours") {
        totalStudyTime.textContent = (total / 60).toFixed(1) + "hours";

    } else {
        totalStudyTime.textContent = total + "minutes";
    }

    if (Number(weeklyTarget.value)>0) {
        targetStatus.textContent = total + " / " + weeklyTarget.value + " minutes";

    } else {
        targetStatus.textContent = "No weekly target set";
    }
}