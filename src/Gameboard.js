import './style.css';
import _ from 'lodash';
import { baseDOM, rendertodos } from './Display';

let projects = [];
class toDo {
    constructor(project, title, dueDate,priority,index,completed) {
        this.project = project
        this.title = title
        this.dueDate = new Date(dueDate)
        this.priority = priority
        this.index = index
        this.completed = completed
    }
    get date() {
        const date = this.dueDate

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        return `${day}-${month}-${year}`;
    }
    get daysleft() {
        var date1 = new Date();
        var date2 = this.dueDate;
              var Difference_In_Time = date2.getTime() - date1.getTime();
              const diff = Difference_In_Time / (1000 * 3600 * 24);
              return Math.ceil(diff)
              
    }
}
const getTodo = () => projects;

function addtodo (project, title, dueDate, priority){  
var i = projects.length
const index = i
const completed = false
const todo = new toDo(project, title, dueDate,priority, index);
projects.push(todo);
}
function editcompleted (index,value) {
    projects[index].completed = value;
}
function editTodo (project, title, dueDate, priority, index) {
    const todo = new toDo(project, title, dueDate,priority, index);
    projects.splice(index, 1, todo);
}
function delTodo(thisindex) {
    projects.splice(thisindex, 1)
    for (let i = 0; i < projects.length; i += 1) {
        var ind = i;  
        projects[i].index = ind
    }
}
function sortAsc() {
    function geeks_outer() {
        projects.sort(GFG_sortFunction);
        console.log(JSON.stringify(projects));  
    }
    function GFG_sortFunction(a, b) {
        let dateA = new Date(a.dueDate).getTime();
        let dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? 1 : -1;
    };
    geeks_outer();
};
function sortDesc() {
    function geeks_outer() {
        projects.sort(GFG_sortFunction);
        console.log(JSON.stringify(projects));  
    }
    function GFG_sortFunction(a, b) {
        let dateA = new Date(a.dueDate).getTime();
        let dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? -1 : 1;
    };
    geeks_outer();
}
export {addtodo, getTodo, editTodo, editcompleted, delTodo, sortAsc, sortDesc}