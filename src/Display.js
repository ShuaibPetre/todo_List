
import { addtodo, delTodo, editcompleted, editTodo, getTodo, sortAsc, sortDesc } from "./Gameboard";
import { createForm } from "./forms"
import _ from 'lodash';
import './style.css';

let sortstyle = 'asc';
const todos = getTodo();
let lastProject = '';

function baseDOM() {
  document.body.replaceChildren();

  const header = document.createElement('div');
  header.classList.add('header');
  header.textContent = 'TO-DO List';
  document.body.appendChild(header);

  const container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');
  container.appendChild(sidebar);

  const taskGroup = document.createElement('div');
  taskGroup.classList.add('task-group');
  sidebar.appendChild(taskGroup);

  const maincontent = document.createElement('div');
  maincontent.classList.add('maincontent');
  container.appendChild(maincontent);

  renderprojects();
}

function renderprojects() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.replaceChildren();

  const taskGroup = document.createElement('div');
  taskGroup.classList.add('task-group');
  sidebar.appendChild(taskGroup);

  const home = document.createElement('button');
  home.textContent = 'Home';
  home.classList.add('tab-btn');
  home.id = 'HOME';
  home.value = 'HOME';
  home.addEventListener('click', timesort);
  taskGroup.appendChild(home);

  const today = document.createElement('button');
  today.textContent = 'Today';
  today.classList.add('tab-btn');
  today.id = 'TODAY';
  today.value = 'TODAY';
  today.addEventListener('click', timesort);
  taskGroup.appendChild(today);

  const week = document.createElement('button');
  week.textContent = 'Week';
  week.classList.add('tab-btn');
  week.id = 'WEEK';
  week.value = 'WEEK';
  week.addEventListener('click', timesort);
  taskGroup.appendChild(week);

  const addProject = document.createElement('button');
  addProject.textContent = '+ Add Project';
  addProject.id = 'addProject';
  addProject.classList.add('add-project-btn');
  addProject.addEventListener('click', addproject);
  sidebar.appendChild(addProject);
  

  const categories = todos.reduce((acc, todo) => {
    if (!acc.some(el => el.project === todo.project)) acc.push(todo);
    return acc;
  }, []);

  categories.sort((a, b) => a.project.localeCompare(b.project));

  categories.forEach(category => {
    const projectBtn = document.createElement('button');
    projectBtn.textContent = category.project;
    projectBtn.classList.add('category-btn');
    projectBtn.value = category.project;
    projectBtn.id = category.project;
    projectBtn.addEventListener('click', rendertodos);
    sidebar.appendChild(projectBtn);
  });
}

function rendertodos() {
  const maincontent = document.querySelector('.maincontent');
  maincontent.replaceChildren();
  sortfunc();

  const heading = document.createElement('h1');
  if (heading.value !== '') {
    heading.textContent = this.value.toUpperCase();
    lastProject = this.value;
  }

  const sortbtn = document.createElement('button');
  sortbtn.textContent = sortstyle === 'asc' ? 'Ascending' : 'Descending';
  sortbtn.classList.add('sortbtn');
  sortbtn.addEventListener('click', sortswap);
  heading.appendChild(sortbtn);

  maincontent.replaceChildren(heading);

  todos.forEach(todo => {
    if (todo.project === lastProject) {
      const tododiv = document.createElement('div');
      tododiv.classList.add('tododiv');
      tododiv.id = todo.index;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('click', changecompleted);
      tododiv.appendChild(checkbox);

      const titlediv = document.createElement('div');
      titlediv.textContent = todo.title;
      titlediv.classList.add('titlediv');
      tododiv.appendChild(titlediv);

      const timeTodo = document.createElement('div');
      timeTodo.textContent = todo.date;
      timeTodo.classList.add('dueDate');

      const prio = todo.priority;
      if (prio === 'Low') timeTodo.classList.add('lowprio');
      if (prio === 'Medium') timeTodo.classList.add('mediumprio');
      if (prio === 'High') timeTodo.classList.add('highprio');
      tododiv.appendChild(timeTodo);

      const editBtn = document.createElement('button');
      editBtn.classList.add('editbtn');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', editform);
      tododiv.appendChild(editBtn);

      const delBtn = document.createElement('button');
      delBtn.classList.add('delbtn');
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', submitdel);
      tododiv.appendChild(delBtn);

      maincontent.appendChild(tododiv);
    }
  });

  const addbtn = document.createElement('button');
  addbtn.textContent = 'Add Task';
  addbtn.classList.add('addbtn');
  addbtn.addEventListener('click', addform);
  maincontent.appendChild(addbtn);
}

function addform() {
  const currentForm = document.querySelector('#currentform');
  if (currentForm) return alert('Please close other form.');
  const form = createForm();
  this.parentNode.replaceChild(form, this);
  document.getElementById('formTitle').defaultValue = lastProject;
  document.getElementById('formDetails').placeholder = 'Task';
  document.getElementById('formTitle').placeholder = 'Category';
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
function addproject() {
    // Append form to sidebar where the button is
    const sidebar = document.querySelector('.sidebar');
    var currentForm = document.querySelector('#currentform');
    if (currentForm !== null) return alert('Please close other form.');
    const form = createForm();
    sidebar.appendChild(form);
}

export {baseDOM, rendertodos, cancel, submit}