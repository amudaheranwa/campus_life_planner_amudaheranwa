export function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function saveSettings() {
    localStorage.setItem("weeklyTarget", document.getElementById("weekly-target").value);
    localStorage.setItem("timeFormat", document.getElementById("time-format").value);
}

export function exportTasks(tasks) {
    const data = JSON.stringify(tasks, null, 2);
    const file = new Blob([data], { type: "application/json"});
    const link = document.createElement("a");

    link.href = URL.createObjectURL(file);
    link.download = "tasks.json";
    link.click();

    URL.revokeObjectURL(link.href);
}

export function importTasks(onLoaded) {
    const file = document.getElementById("import-file").files[0];

    if (!file) {
        alert("Please select a JSON file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function() {
        try {
            const importedTasks = JSON.parse(reader.result);

            if (!Array.isArray(importedTasks)) {
                alert("Invalid task file.");
                return;
            }
            for (let i = 0; i < importedTasks.length; i++){
                const task = importedTasks[i];
                if (!task.title || !task.category || !task.date || !task.duration) {
                    alert("A task is missing requirred information");
                    return;
                }
            }

            onLoaded(importedTasks);

            alert("Tasks imported successfully");
        } catch (error) {
            alert("Invalid JSON file");
        }
    };

    reader.readAsText(file);
}