const elForm = document.querySelector(".form");
const elTodoInput = document.querySelector(".todo-input");
const elListul = document.querySelector(".lists")

elForm.addEventListener("submit", (evt) => {  
    evt.preventDefault();   
    let todoArr = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [] ;

    let newTodo = {
            id : todoArr[todoArr.length - 1] ? todoArr[todoArr.length - 1]?.id + 1 : 0 , 
            content: elTodoInput.value
        } 
        // console.log(newTodo);
    
        todoArr.push(newTodo);
        localStorage.setItem("todo" , JSON.stringify(todoArr)  );
   renderStorage()
});
 
const renderStorage = () => {
    const todoArrr = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
    elListul.innerHTML = '';
    todoArrr.forEach(todo => {

        const liEl = document.createElement('li');
        liEl.innerHTML = todo.content;

        const btnTodo = document.createElement('button');
        btnTodo.innerHTML = "delete";
        btnTodo.dataset.todo = todo.id;
        btnTodo.classList.add('btn-btn');

        const btnUpdate = document.createElement('button');
        btnUpdate.innerHTML = "update";
        btnUpdate.dataset.todo = todo.id;
        btnUpdate.classList.add('btnUp');

        liEl.appendChild(btnUpdate);
        liEl.appendChild(btnTodo);
        elListul.appendChild(liEl);
    });
}




elListul.addEventListener("click", (event) => {
     if (event.target.classList.contains('btn-btn')) {
        const todoArrr = JSON.parse(localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
        const findTodoIndex = todoArrr.findIndex( todo => todo.id == event.target.dataset.todo);
        todoArrr.splice(findTodoIndex, 1);
        localStorage.setItem('todo', JSON.stringify(todoArrr));
        renderStorage();
     }
     if(event.target.classList.contains('btnUp')){
        
     }
})
