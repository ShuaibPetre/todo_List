import './style.css';
import _ from 'lodash';
import { baseDOM, rendertodos } from './Display';

let projects = [];
class toDo {
    constructor(project, title, dueDate,priority,index,completed) {
        this.project = project
        this.title = title
        this.dueDate = dueDate
        this.priority = priority
        this.index = index
        this.completed = completed
    }
}
const getTodo = () => projects;

function addtodo (project, title, dueDate, priority){  
var i = projects.length
const index = i
const completed = false
const todo = new toDo(project, title, dueDate,priority, index);
projects.push(todo);
console.log(todo)
}
function editcompleted (index,value) {
    projects[index].completed = value;
}
function editTodo (project, title, dueDate, priority, index) {
    const todo = new toDo(project, title, dueDate,priority, index);
    projects.splice(index, 1, todo);
    console.log
}
function delTodo(thisindex) {
    projects.splice(thisindex, 1)
    for (let i = 0; i < projects.length; i += 1) {
        var ind = i;  
        projects[i].index = ind
    }
}
export {addtodo, getTodo, editTodo, editcompleted, delTodo}