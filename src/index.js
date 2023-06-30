import _ from 'lodash';
import './style.css';
import { baseDOM, rendertodos } from './Display';
import { createForm } from './forms';
import { addtodo, getTodo } from './Gameboard';


addtodo('project', 'title', 'dueDate','priority');
addtodo('project', 'title1', 'dueDate1','priority1');
addtodo('project1', 'title', 'dueDate','priority',);
addtodo('project3', 'title', 'dueDate','priority');
addtodo('project5')
baseDOM();
//rendertodos();
createForm();
console.log(getTodo())

