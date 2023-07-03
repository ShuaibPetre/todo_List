import { addtodo, delTodo, editcompleted, editTodo, getTodo, sortAsc, sortDesc } from "./Gameboard";
import { createForm } from "./forms"
import _ from 'lodash';
import './style.css';
var sortstyle = 'asc';
const todos = getTodo();
let lastProject = '';

function baseDOM() {
document.body.replaceChildren();
const header = document.createElement('div')
header.classList.add('header');
header.textContent = 'TO-DO List'
document.body.appendChild(header)

const container = document.createElement('div');
container.classList.add('container')
document.body.appendChild(container);

const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');
container.appendChild(sidebar);

const maincontent = document.createElement('div');
maincontent.classList.add('maincontent');
container.appendChild(maincontent);
renderprojects();
};

function renderprojects() {
    var sidebar = document.querySelector('.sidebar')
    sidebar.replaceChildren();

    const HOMEdiv = document.createElement('BUTTON');
    HOMEdiv.textContent = "HOME"
    HOMEdiv.classList.add('HOME')
    HOMEdiv.setAttribute("id", "HOME");
    HOMEdiv.addEventListener('click', timesort, false)
    HOMEdiv.value = 'HOME';
    HOMEdiv.id = 'HOME'
    sidebar.appendChild(HOMEdiv);

    const todaydiv = document.createElement('BUTTON');
    todaydiv.textContent = "TODAY"
    todaydiv.classList.add('todaydiv')
    todaydiv.setAttribute("id", "todaydiv");
    todaydiv.addEventListener('click', timesort, false)
    todaydiv.value = 'TODAY';
    todaydiv.id = 'TODAY'
    sidebar.appendChild(todaydiv);

    const weekdiv = document.createElement('BUTTON');
    weekdiv.textContent = "WEEK"
    weekdiv.classList.add('weekdiv')
    weekdiv.setAttribute("id", "weekdiv");
    weekdiv.addEventListener('click', timesort, false)
    weekdiv.value = 'WEEK';
    weekdiv.id = 'WEEK'
    sidebar.appendChild(weekdiv);

    // const addProject = document.createElement('BUTTON');
    // addProject.textContent = "addProject"
    // addProject.setAttribute("id", "addProject");
    // addProject.addEventListener('click', addproject, false)
    // sidebar.appendChild(addProject);

    var out = todos.reduce(function (p, c) {
    if (!p.some(function (el) { return el.project === c.project; })) p.push(c);
    return p;
  }, []);
    out.sort(function(a, b) {
 
    if (textA === undefined || textB === undefined) return
    var textA = a.project.toUpperCase();
    var textB = b.project.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
for (let i = 0; i < out.length; i += 1) {
    const projectdiv = document.createElement('BUTTON');
    projectdiv.textContent = out[i].project
    projectdiv.classList.add('projectdiv')
    projectdiv.addEventListener('click', rendertodos, false)
    projectdiv.value = out[i].project;
    projectdiv.id = out[i].project
    sidebar.appendChild(projectdiv);
};
}

function rendertodos() {
    const maincontent = document.querySelector('.maincontent')
    maincontent.replaceChildren();
    sortfunc(); 

    const heading = document.createElement('h1');
    if (heading.value !== "") {
        heading.textContent = this.value.toUpperCase();
        lastProject = this.value 
    }

    const sortbtn = document.createElement('BUTTON');
    if (sortstyle === 'asc') sortbtn.textContent = 'ASCENDING';
    if (sortstyle === 'desc') sortbtn.textContent = 'DESCENDING';
    sortbtn.classList.add('sortbtn');
    sortbtn.addEventListener('click', sortswap, false);
    heading.appendChild(sortbtn);

    maincontent.replaceChildren(heading)
    for (let i = 0; i < todos.length; i += 1) {

        if (todos[i].project === lastProject) {
        const tododiv = document.createElement('div');
        tododiv.classList.add('tododiv');
        tododiv.setAttribute("id", todos[i].index);

        const checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", "checkbox");
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click',changecompleted);
        tododiv.appendChild(checkbox)

        const titlediv = document.createElement('div');
        titlediv.textContent = todos[i].title;
        titlediv.classList.add('titlediv')
        tododiv.appendChild(titlediv);

        const timeTodo = document.createElement('div');
        timeTodo.textContent = todos[i].date
        timeTodo.classList.add('dueDate')
        tododiv.appendChild(timeTodo);

        const now = new Date();
        if (now < todos[i].dueDate) tododiv.classList.add('.timeout')

        const prio = todos[i].priority
        if (prio === "Low") timeTodo.classList.add('lowprio');
        if (prio === "Medium") timeTodo.classList.add('mediumprio');
        if (prio === "High") timeTodo.classList.add('highprio');
            
        const editTodo = document.createElement('BUTTON');
        editTodo.classList.add('editbtn');
        editTodo.addEventListener('click', editform, false)
        tododiv.appendChild(editTodo);

        const delTodo = document.createElement('BUTTON');
        delTodo.classList.add('delbtn');
        delTodo.addEventListener('click',submitdel , false)
        tododiv.appendChild(delTodo);

        maincontent.appendChild(tododiv);

        }   
    }
    const addbtn = document.createElement('BUTTON');
    addbtn.textContent = 'ADD TASK';
    addbtn.classList.add('addbtn');
    addbtn.addEventListener('click', addform, false);
    maincontent.appendChild(addbtn);
}
function addform() {
    var currentForm = document.querySelector('#currentform')
    if ( currentForm !== null) return alert('Please close other form.');
    const form = createForm()
    const value = this.parentNode;
    value.replaceChild(form,this);
    document.getElementById("formTitle").defaultValue = lastProject;
}
let editindex = ""
function editform() { 
    var currentForm = document.querySelector('#currentform');
    if ( currentForm !== null) return alert('Please close other form.');
    const form = createForm()
    const value = this.parentNode;
    value.replaceChildren(form);
    value.classList.add('form');

    var submitbtn = document.querySelector('.submit');
    submitbtn.removeEventListener('click', submit);
    submitbtn.addEventListener('click', submitedit);

    const objID = value.id
    editindex = objID

    document.getElementById("formTitle").defaultValue = todos[objID].project;
    document.getElementById("formDetails").defaultValue = todos[objID].title;
    document.getElementById("formDate").defaultValue = todos[objID].dueDate;
    document.getElementById("formPriority").defaultValue = todos[objID].priority;
}
function cancel(event) {
    event.preventDefault();
    var pagebutton = document.getElementById(lastProject);
    pagebutton.click();
}
function submit(event) {
    event.preventDefault();
    const project = document.querySelector('#formTitle')
    const detail = document.querySelector('#formDetails');
    const date = document.querySelector('#formDate');
    const priority = document.querySelector('#formPriority');
    const form = document.querySelector('form');
    if (detail.value.length === 0 || project.value.length === 0) {
        alert("OOPS You forgot to add a project or task");
        return;
    }
    addtodo(project.value, detail.value, date.value, priority.value);
    baseDOM();
    var pagebutton = document.getElementById(project.value);
    sortfunc();
    pagebutton.click();
    form.reset();
    
}
function submitedit(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    const project = document.querySelector('#formTitle')
    const detail = document.querySelector('#formDetails');
    const date = document.querySelector('#formDate');
    const priority = document.querySelector('#formPriority');
    lastProject = editindex
    editTodo(project.value, detail.value, date.value, priority.value, editindex);
    baseDOM();
    sortfunc();
    var pagebutton = document.getElementById(project.value);
    pagebutton.click();
    form.reset();    
}
function changecompleted() {
    const checked = this.checked
    const value = this.parentNode;
    const objID = value.id
    editcompleted(objID, checked)
    if(checked === true) value.classList.add('completed')
    if(checked === false) value.classList.remove('completed')
}
function submitdel() {
    const value = this.parentNode;
    const thisindex = value.id
    delTodo(thisindex);
    baseDOM();
    var pagebutton = document.getElementById(lastProject);
    if (pagebutton === null) {
        pagebutton = document.getElementById('HOME')
    };
    console.log(pagebutton)
    pagebutton.click(); 
}

function sortswap() {
    const button = document.querySelector('.sortbtn');
    console.log(sortstyle)

    if (sortstyle === 'asc') {
        sortfunc();
        sortstyle = 'desc';
        button.textContent = 'DESCENDING'  
        console.log(sortstyle)
    }
    else {
        sortfunc();
        sortstyle = 'asc';
        button.textContent = 'ASCENDING';
    }
    var pagebutton = document.getElementById(lastProject);
    pagebutton.click();
    console.log(sortstyle)
}
function sortfunc() {
    if(sortstyle === 'asc') {
    sortAsc();
    
    }
    if(sortstyle === 'desc') {
    sortDesc();
    
    }
}
function timesort() {
    const sorted = []

    const maincontent = document.querySelector('.maincontent')
    maincontent.replaceChildren();
    sortfunc(); 

    const heading = document.createElement('h1');
    if (heading.value !== "") {
        heading.textContent = this.value.toUpperCase();
        lastProject = this.value 
    }

    const sortbtn = document.createElement('BUTTON');
    if (sortstyle === 'asc') sortbtn.textContent = 'ASCENDING';
    if (sortstyle === 'desc') sortbtn.textContent = 'DESCENDING';
    sortbtn.classList.add('sortbtn');
    sortbtn.addEventListener('click', sortswap, false);
    heading.appendChild(sortbtn);

    maincontent.replaceChildren(heading)

    if ( lastProject === 'TODAY') {
        for (let i = 0; i < todos.length; i += 1) {
            if(todos[i].daysleft < 1) sorted.push(todos[i])
        }
    }
    if ( lastProject === 'WEEK') {
        for (let i = 0; i < todos.length; i += 1) {
            if(todos[i].daysleft < 7) sorted.push(todos[i])
        }
    }
    if ( lastProject === 'HOME') {
        for (let i = 0; i < todos.length; i += 1) {
            if (todos[i].project !== '') sorted.push(todos[i])
        }
    }
    for (let i = 0; i < sorted.length; i += 1) {

        const tododiv = document.createElement('div');
        tododiv.classList.add('tododiv');
        tododiv.setAttribute("id", sorted[i].index);

        const checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", "checkbox");
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click',changecompleted);
        tododiv.appendChild(checkbox)

        const titlediv = document.createElement('div');
        titlediv.textContent = sorted[i].title;
        titlediv.classList.add('titlediv')
        tododiv.appendChild(titlediv);

        const timeTodo = document.createElement('div');
        timeTodo.textContent = sorted[i].date
        timeTodo.classList.add('dueDate')
        tododiv.appendChild(timeTodo);

        const now = new Date();
        if (now < sorted[i].dueDate) tododiv.classList.add('.timeout')

        const prio = sorted[i].priority
        if (prio === "Low") timeTodo.classList.add('lowprio');
        if (prio === "Medium") timeTodo.classList.add('mediumprio');
        if (prio === "High") timeTodo.classList.add('highprio');
            
        const editTodo = document.createElement('BUTTON');
        editTodo.classList.add('editbtn');
        editTodo.addEventListener('click', editform, false)
        tododiv.appendChild(editTodo);

        const delTodo = document.createElement('BUTTON');
        delTodo.classList.add('delbtn');
        delTodo.addEventListener('click',submitdel , false)
        tododiv.appendChild(delTodo);

        maincontent.appendChild(tododiv);
    }

    console.log(lastProject)
}
// function addproject() {
//     const main = document.querySelector('maincontainer');
//     var currentForm = document.querySelector('#currentform')
//     if ( currentForm !== null) return alert('Please close other form.');
//     const form = createForm()
//     main.appendChild(form)
// }
export {baseDOM, rendertodos, cancel, submit}