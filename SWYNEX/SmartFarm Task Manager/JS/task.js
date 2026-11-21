let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

const editTaskId =
    localStorage.getItem("editTaskId");


const nameInput =
    document.getElementById("task-name");

const descriptionInput =
    document.getElementById("task-description");

const dateInput =
    document.getElementById("task-date");
    

if (editTaskId) {
    const task = tasks.find(
        task => task.id == editTaskId
    );

    if (task) {
        nameInput.value = task.name;
        descriptionInput.value = task.description;
        dateInput.value = task.dueDate;
    }
}


const form = document.getElementById("task-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name =
        document.getElementById("task-name").value.trim();

    const description =
        document.getElementById("task-description").value.trim();

    const dueDate =
        document.getElementById("task-date").value;

    if (!name || !description || !dueDate) {
        alert("Please fill all fields");
        return;
    }

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    const editTaskId =
        localStorage.getItem("editTaskId");

    if (editTaskId) {

        tasks = tasks.map(task => {
            if (task.id == editTaskId) {
                return {
                    ...task,
                    name,
                    description,
                    dueDate
                };
            }
            return task;
        });

        localStorage.removeItem("editTaskId");

    } else {

        const task = {
            id: Date.now(),
            name,
            description,
            dueDate,
            completed: false
        };

        tasks.push(task);
    }

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    window.location.href = "index.html";
});


    