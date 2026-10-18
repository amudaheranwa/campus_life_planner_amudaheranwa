const searchInput = document.getElementById("search");
const caseSensitive = document.getElementById("case-sensitive");
const searchError = document.getElementById("search-error");
const sortSelect = document.getElementById("sort");

const taskform = document.getElementById("task-form");

const tasktitle = document.getElementById("task-title");

const taskdate = document.getElementById("task-date")
const taskduration = document.getElementById("task-duration");
const taskcategory = document.getElementById("task-category");

const tasklist = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const totalTasks = document.getElementById("total-tasks");
const totalStudyTime = document.getElementById("total-study-time");
const weeklyTarget = document.getElementById("weekly-target");
const targetstatus = document.getElementById("target-status");



function displayTask() {
    tasklist.innerHTML = "";

    tasks.sort((a, b) =>{
        if (sortSelect.value === "title") {
            return a.title.localecompare(b.title);
        }

        if (sortSelect.value === "duration") {
            return Number(a.duration) - Number(b.duration);

        }
        return a.date.localeCompare(b.date);

    });

    for (let i = 0; i < tasks.length; i++) {
        
        const pattern = searchInput.value.trim();
        if (pattern !=="") {
            try {
                const flags = caseSensitive.checked ? "" : "i";
                const searchRegex = new RegExp(pattern, flags);
                const text = tasks[i].title + " " + tasks[i].date + " " + tasks[i].duration + " " + tasks[i].category;

                if (!searchRegex.test(text)) {
                    continue;
                }

                searchError.textContent = "";

            } catch (error) {
                searchError.textContent = "Invalid regex pattern.";
                return;
            }

        } else {
            searchError.textContent = "";
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

function updateDashboard() {
    totalTasks.textContent = tasks.length;

    let total = 0;
    for (let i=0; i <tasks.length; i++) {
        total += Number(tasks[i].duration);
    }
    totalStudyTime.textContent = total;
    if (Number(weeklyTarget.value)>0) {
        targetStatus.textContent = total + " / " + weeklyTarget.value + " minutes";

    } else {
        targetStatus.textContent = "No weekly target set";
    }
}

taskform.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = tasktitle.value;
    const date = taskdate.value;
    if (date === ""){
        alert("Please choose a date");
        return;
    }

    const selectedDate = new Date(date);
    if (Number.isNaN(selectedDate.getTime())) {
        alert("Please enter a valid date");
        return;
    }
    
    const duration = taskduration.value;
    const category = taskcategory.value;
    
    const cleanCategory = category.trim();
    if (cleanCategory === "") {
        alert("Please select a task category");
        return;
    }


    const cleanTitle = title.trim();
    if(cleanTitle === ""){
        alert("please enter a task title.");
        return;
    }

    const titlePattern = /^[a-zA-Z0-9\s.,!?'-]+$/;
    if (!titlePattern.test(cleanTitle)) {
        alert("Use letters in the alphabet, numbers,basic punctuation and spaces in the title.");
        return;
    }

    if (duration === ""|| Number(duration)<= 0){
        alert("Please enter a duration time above 0.");
        return;
    }

    if (date === ""){
        alert("Please select a date.");
        return;
    }

    


    const task = {
        title: title,
        date: date,
        duration: duration,
        category: category
    };

    const taskId = document.getElementById("task-id").value;
    if (taskId === "") {
        tasks.push(task);
    } else {
        tasks[Number(taskId)] = task;
    }

    displayTask();
    updateDashboard();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskform.reset();

    document.getElementById("task-id").value = "";
    taskform.querySelector('button[type="submit"]').textContent =
         "save Task";
         
});

searchInput.addEventListener("input", displayTask);
caseSensitive.addEventListener("change", displayTask);
sortSelect.addEventListener("change", displayTask);
document.getElementById("export-data").addEventListener("click", function() {
    const data = JSON.stringify(tasks, null, 2);
    const file = new Blob([data], { type: "application/json"});
    const link = document.createElement("a");

    link.href = URL.createObjectURL(file);
    link.download = "tasks.json";
    link.click();

    URL.revokeObjectURL(link.href);
});

document.getElementById("save-settings").addEventListener("click",function(){
    updateDashboard();
});



