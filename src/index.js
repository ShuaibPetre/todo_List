import _ from 'lodash';
import './style.css';
import { baseDOM, rendertodos } from './Display';
import { createForm } from './forms';
import { addtodo, getTodo } from './Gameboard';


addtodo('project','asdsdsad', '2023-07-01', 'Low', 5);
addtodo('project','asdsdsad', '2023-07-21', 'Low', 5);
addtodo('project','asdsdsdasasad', '2023-07-11', 'Low', 5);

baseDOM();
//rendertodos();
createForm();
console.log(getTodo())

