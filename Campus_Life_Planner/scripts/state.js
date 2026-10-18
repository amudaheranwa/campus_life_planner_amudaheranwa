import { loadTasks } from "./storage.js";

export const tasks = loadTasks();

export function setTasks(newTasks) {
    tasks.length = 0;
    tasks.push(...newTasks);
}

export function addOrUpdateTask(task, taskId) {
    if (taskId === "") {
        tasks.push(task);
    } else {
        tasks[Number(taskId)] = task;
    }
}