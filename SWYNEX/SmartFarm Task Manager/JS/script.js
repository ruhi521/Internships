const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");
const overdueTasks = document.getElementById("overdue-tasks");

function updateDashboard() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    console.log(tasks);

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;

    overdueTasks.textContent =
        tasks.filter(task => {
            return (
                !task.completed &&
                new Date(task.dueDate) < new Date()
            );
        }).length;
}

updateDashboard();


const taskList = document.getElementById("task-list");

function renderTasks() {
    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.innerHTML = "";

    tasks.forEach(task => {
        taskList.innerHTML += `
            <div class="task-card">
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <p>
                    ${task.completed
                        ? "✅ Completed"
                        : "⏳ Pending"}
                </p>

                <div class="task-actions">
    <button onclick="completeTask(${task.id})">
        Complete
    </button>

    <button onclick="goToEditTask(${task.id})">
    Edit
</button>

    <button onclick="deleteTask(${task.id})">
        Delete
    </button>
</div>
        `;
    });
}

renderTasks();


function completeTask(id) {
    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    updateDashboard();
    renderTasks();
    renderUpcomingTasks();
}


function deleteTask(id) {
    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(task => task.id !== id);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    updateDashboard();
    renderTasks();
    renderUpcomingTasks();
}


function goToEditTask(id) {
    localStorage.setItem("editTaskId", id);
    window.location.href = "task.html";
}

window.goToEditTask = goToEditTask;


const upcomingTasksContainer =
    document.getElementById("upcoming-tasks");

function renderUpcomingTasks() {
    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    upcomingTasksContainer.innerHTML = "";

    const upcomingTasks = tasks
        .filter(task => !task.completed)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

    if (upcomingTasks.length === 0) {
        upcomingTasksContainer.innerHTML =
            "<p>No upcoming tasks.</p>";
        return;
    }

    upcomingTasks.forEach(task => {
        upcomingTasksContainer.innerHTML += `
            <div class="task-card">
                <h3>${task.name}</h3>
                <p>Due: ${task.dueDate}</p>
            </div>
        `;
    });
}
renderUpcomingTasks();