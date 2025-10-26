document.addEventListener("DOMContentLoaded", () => {

  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const house = document.getElementById("house");
  const aiMessage = document.getElementById("aiMessage");
  const progressBar = document.getElementById("progressBar");

  let tasks = [];

  // Add task
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if(taskText === "") { alert("Enter a task!"); return; }
    tasks.push({ text: taskText, completed: false });
    displayTasks();
    taskInput.value = "";
    updateProgress();
  });

  function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if(task.completed){
        li.style.textDecoration = "line-through";
        li.style.color = "#a1ffa1";
      }
      li.addEventListener("click", () => completeTask(index));
      taskList.appendChild(li);
    });
  }

  function completeTask(index){
    if(tasks[index].completed){
      aiMessage.innerHTML = "✅ Task already completed!";
      return;
    }
    tasks[index].completed = true;
    displayTasks();
    buildFloor(tasks[index].text);
    generateAISuggestion(tasks[index].text);
    updateProgress();
  }

  function buildFloor(taskName){
    const floor = document.createElement("div");
    floor.classList.add("floor");

    // Random color
    const colors = ["#ff8c66","#66b3ff","#ffcc66","#8aff66","#ff66b3"];
    floor.style.background = colors[Math.floor(Math.random()*colors.length)];

    // Windows
    const leftWindow = document.createElement("div");
    leftWindow.classList.add("window");
    const rightWindow = document.createElement("div");
    rightWindow.classList.add("window");

    floor.appendChild(leftWindow);
    floor.appendChild(rightWindow);
    floor.title = `🏗️ ${taskName} completed`;

    // Click to remove floor
    floor.addEventListener("click", () => {
      house.removeChild(floor);
      aiMessage.innerHTML = `🛠️ You removed "${taskName}".`;
      const task = tasks.find(t => t.text === taskName);
      if(task) task.completed = false;
      displayTasks();
      updateProgress();
    });

    house.appendChild(floor);
    house.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function generateAISuggestion(taskName){
    const messages = [
      `🌟 Great job completing "${taskName}"! Your house grows taller!`,
      `💪 "${taskName}" done! Keep it up!`,
      `🏠 "${taskName}" completed! Your home is growing!`,
      `🔥 Fantastic! "${taskName}" done!`,
      `🌈 Step by step, your house of dreams grows!`
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    aiMessage.innerHTML = randomMsg;
  }

  function updateProgress(){
    const total = tasks.length;
    const completed = tasks.filter(t=>t.completed).length;
    const percent = total===0 ? 0 : Math.round((completed/total)*100);
    progressBar.style.width = percent + "%";
  }

});
