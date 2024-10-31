const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-items");
const addUpdateClick = document.getElementById("AddUpdateClick");
const todoAlert = document.getElementById("Alert")
 let updateText;
let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
    todo = [];
} 

todoValue.addEventListener("keypress", function (e) {
  if (e.key === "Enter"){
    addUpdateClick.click();
  }
});

function CreateToDoItems() {
  if (todoValue.value === "") {
    todoAlert.innerText = "Please enter your todo text!";
    todoValue.focus();
  } else {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });

    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }

    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="image/pencli.png" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="image/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if (!todo) {
      todo = [];
    }
    let itemList = { item: todoValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
  }
  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully!");
}

function ReadToDoItems() {
    todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<img class="todo-controls" src="image/Check mark.png" />'
    }</div><div>
    ${
        style===""
        ?'<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="image/pencli.png" /> '
        : ""
    }
    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="image/delete.png />`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    todoValue.value
    });
}

    
function UpdateToDoItems(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdateClick.setAttribute("src", "image/refresh.png");
    updateText = e.parentElement.parentElement.querySelector("div");
    todoValue.focus();
  }
}

function UpdateOnSelectionItems() {
  let IsPresent = false
todo.forEach((element) => {
    if (element.item === todoValue.value && element !== updateText) {
      IsPresent = true
  }
})

if (IsPresent){
  setAlertMessage("This item already present in the list!");
  return;
}  

todo.forEach((element) => {
  if (element.item.trim === updateText.innerText.trim()) {
    element.item = todoValue.value;
  }
});
setLocalStorage();

updateText.innerText = todoValue.value;
addUpdateClick.setAttribute("onclick", "CreateToDoItems()");
addUpdateClick.setAttribute("src", "image/plus.png");
todoValue.value = "";
setAlertMessage("Todo item Updated Successfully!");
}

function DeleteToDoItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
    
    if (confirm(`Are you sure?. Do you want to delete this ${deleteValue}!`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      todoValue.focus();

      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
            todo.splice(element, 1);
        }
      });

      setTimeout(() => {
        e.parentElement.parentElement.remove();
      },1000);

      setLocalStorage();
    }
}

function CompletedToDoItems(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "image/check mark.png";
    img.className = "todo-controls";
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    e.parentElement.querySelector("div").appendChild(img);
    e.parentElement.querySelector("img.edit").remove();

    todo.forEach((element) => {
      if (
        e.parentElement.querySelector("div").innerText.trim() == element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));  
} 

function setAlertMessage(message) {
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;

  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}