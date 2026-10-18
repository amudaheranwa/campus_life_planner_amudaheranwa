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

let tasks = [];

function displayTask() {
    tasklist.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const row = document.createElement("tr");

        row.innerHTML = `<td>${tasks[i].title}</td>
        <td>${tasks[i].date}</td>
        <td>${tasks[i].duration}</td>
        <td>${tasks[i].category}</td>
        `;
        tasklist.appendChild(row);
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

    const selectDate = new Date(date);
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

    const titlePattern = /^[a-zA-Z0-9\s.,!?'-']+$/;
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
    taskform.reset();

    document.getElementById("task-id").value = "";
    taskform.querySelector('button[type="submit"]').textcontent =
         "save Task";
         
});

searchInput.addEventListener("input", displayTask);
caseSensitive.addEventListnener("change", displayTask);
sortSelect.addEventListener("change", displayTask);


