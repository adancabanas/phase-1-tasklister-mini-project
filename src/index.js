let taskList = []

document.addEventListener("DOMContentLoaded", () => {
  // your code here
  function createNewTask(description, user, duration, dateDue) {
    this.task = {}
    this.task.description = description
    this.task.user = user
    this.task.duration = duration
    this.task.dateDue = dateDue
    console.log(`New task:`)
    console.log(this.task)
    return this.task
  }

  function taskDuplication(tasks, task) {
    let filteredTasks = tasks.filter(t => {
      if (t.description === task.description) {
        return t
      }
    })

    console.log("Compares task: ", task)
    console.log("Within tasks:")
    console.table(tasks)

    return filteredTasks.length > 0 ? true : false
  }

  function addTask(tasks, task) {
    console.log("Adds task: ", task, " into:")
    console.table(tasks)
    tasks.push(task)
    console.log("Resulting in: ")
    console.table(tasks)
  }

  function renderTaskList(taskList) {
    const ul = document.getElementById("tasks")
    ul.innerHTML = "";

    taskList.forEach(task => {
      const item = document.createElement("li")
      item.id = task.description
      item.textContent = `${task.description + " " + task.user + " " + task.duration + " " + task.dateDue}`
      const button = document.createElement("button")
      button.value = task.description
      button.textContent = "X"
      button.addEventListener("click", (e) => {
        deleteTask(task)
      })
      item.append(button)
      const ul = document.getElementById("tasks")
      ul.append(item)
    });
  }

  function deleteTask(task) {
    console.log("Deletes task: ", task, " from: ")
    console.table(taskList)
    const item = document.getElementById(task.description)
    item.remove()
    let taskIndex = taskList.findIndex(t => {
      if (t.description == task.description) {
        return t
      }
    })
    if (taskIndex > -1) {
      taskList.splice(taskIndex, 1)
    }
    console.log("Resulting in: ")
    console.table(taskList)
  }

  const createTaskForm = document.getElementById("create-task-form")
  document.addEventListener("submit", (createTaskForm, (e) => {
    e.preventDefault();
    const newTaskDescription = document.getElementById("new-task-description").value
    const newTaskUser = document.getElementById("new-task-user").value
    const newTaskDuration = document.getElementById("new-task-duration").value
    const newTaskDateDue = document.getElementById("new-task-date-due").value
    const newTask = new createNewTask(newTaskDescription, newTaskUser, newTaskDuration, newTaskDateDue)
    
    let taskDuplicated = taskDuplication(taskList, newTask)
    if (taskDuplicated) {
      alert("Task already exists!")
    } else {
      addTask(taskList, newTask)
      renderTaskList(taskList)
    }
  }))

  const sortAsc = document.getElementById("ascending")
  sortAsc.addEventListener("click", (e) => {
    taskList = taskList.sort((a, b) => {
      return (a.description > b.description) ? 1 : (a.description < b.description) ? -1 : 0;
    })
    renderTaskList(taskList)
    console.log("Task List ordered ascending: ")
    console.table(taskList)
  })

  const sortDesc = document.getElementById("descending")
  sortDesc.addEventListener("click", (e) => {
    taskList = taskList.sort((a, b) => {
      return (b.description > a.description) ? 1 : (b.description < a.description) ? -1 : 0;
    })
    renderTaskList(taskList)
    console.log("Task List ordered descending: ")
    console.table(taskList)
  })
});
