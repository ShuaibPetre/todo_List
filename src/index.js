import _ from 'lodash';
import './style.css';
import { baseDOM, rendertodos } from './Display';
import { createForm } from './forms';
import { addtodo, callstorage, getTodo } from './Gameboard';

callstorage();
baseDOM();
rendertodos();
console.log(getTodo())

