class Task {
    constructor(year, month, day, type, description){
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.description = description;
    }

    validateData(){
        for (let i in this){
            if(this[i] === undefined || this[i] === ""){
                return false;
            }
        }
        return true;
    }
}

class Database {
    constructor(){
        const id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id', 0);
        }
    }

    getTask(id) { 
        const task = JSON.parse(localStorage.getItem(id));        

        task['id']=id;  
        localStorage.setItem('idTask',JSON.stringify(task));    
        return task;
    }

    loadTasks() {
        const tasks = Array();
        
        const id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++){
            const task = JSON.parse(localStorage.getItem(i));

            if(task === null){
                continue;
            }

            task.id = i;
            tasks.push(task);
        }
        return tasks;
    }

    updateTaskEdit(task) { 
        const { id }  = JSON.parse(localStorage.getItem('idTask'));     
        localStorage.setItem(id, JSON.stringify(task));
    }

    createTask(task) {
        const id = getNextId();
        localStorage.setItem(id, JSON.stringify(task));
        localStorage.setItem('id', id);
    }

    removeTask(id) {
        localStorage.removeItem(id);
    }

    searchTasks(task) {
        let filteredTasks = Array();

        filteredTasks = this.loadTasks();

        if(task.year !== '') {
            filteredTasks = filteredTasks.filter(t => t.year === task.year);
        }

        if(task.month !== '') {
            filteredTasks = filteredTasks.filter(t => t.month === task.month);
        }

        if(task.day !== '') {
            filteredTasks = filteredTasks.filter(t => t.day === task.day);
        }

        if(task.type !== '') {
            filteredTasks = filteredTasks.filter(t => t.type === task.type);
        }

        if(task.description !== '') {
            filteredTasks = filteredTasks.filter(t => t.description === task.description);
        }

        return filteredTasks;
    }
}

const database = new Database();


function getNextId() {
    const nextId = localStorage.getItem('id');
    return parseInt(nextId) + 1;
}

function registerTask() {

    const task = fillValueTask();   

    if(task.validateData()){
        database.createTask(task);
    }
}

function updateTask() {

    const task = fillValueTask();      

    if(task.validateData()){       
        database.updateTaskEdit(task);
    } 
    localStorage.removeItem('idTask');   
    loadTasks();
}

function chargeTask(task) { 
    if (task===null) {        
        return;       
    }

    document.getElementById('year').value = task.year;
    document.getElementById('month').value = task.month;
    document.getElementById('day').value = task.day;
    document.getElementById('type').value = task.type;
    document.getElementById('description').value = task.description;
}

function clearInputs() { 
    document.getElementById('year').value = '';
    document.getElementById('month').value = '';
    document.getElementById('day').value = '';
    document.getElementById('type').value = '';
    document.getElementById('description').value = '';
    localStorage.removeItem('idTask');  
}

function loadTasks(tasks) {

    if(tasks === undefined){
        tasks = database.loadTasks();
    }  

    const  listTasks = (document.getElementById('listTasks') !== null) ? document.getElementById('listTasks') : document.getElementById('editTasks');
    listTasks.innerHTML = '';

    tasks.forEach((t) => {
        const row = listTasks.insertRow();

        row.insertCell(0).innerHTML = `${t.day}/${t.month}/${t.year}`;

        switch(t.type) {
            case '1': t.type = 'Studies';
                break
            case '2': t.type = 'Work';
                break
            case '3': t.type = 'Home';
                break
            case '4': t.type = 'Health';
                break
            case '5': t.type = 'Family';
                break
        }

        row.insertCell(1).innerHTML  = t.type;
        row.insertCell(2).innerHTML = t.description;       

        const btn = document.createElement('button') ;    
       
        const btnEdit = document.createElement('button');        

        btn.className = 'btn btn-danger';
        btn.id = t.id;
        btn.innerHTML = 'Delete';
        btn.onclick = () => {
            const id = t.id;
            database.removeTask(id);
            window.location.reload();
        }
        row.insertCell(3).append(btn) ;       

        btnEdit.className = 'btn btn-warning';
        btnEdit.id = t.id;
        btnEdit.innerHTML = 'Edit';

        row.insertCell(4).append(btnEdit);

        btnEdit.onclick = () => { 
            const id = t.id;                  
            database.getTask(id);                     
            document.location='editTask.html';            
        }  
    })
}

function searchTasks() {

    const task = fillValueTask(); 
        
    const tasks = database.searchTasks(task);

    loadTasks(tasks);
}

function fillValueTask() { 
    const year        = document.getElementById('year').value;
    const month       = document.getElementById('month').value;
    const day         = document.getElementById('day').value;
    const type        = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    const task = new Task(year, month, day, type, description);
    return task;
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.body.contains(document.getElementById('listTasks'))){
        //loadTasks();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    if(document.body.contains(document.getElementById('editTasks'))){
        
        loadTasks();
        const task  = JSON.parse(localStorage.getItem('idTask')) || null;  
               
        chargeTask(task);        
    }
})
