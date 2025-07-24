import { getTodo } from "./Gameboard";
import _ from 'lodash';
import { cancel, submit } from "./Display";
const todos = getTodo();

function createForm() {
  const form = document.createElement("form");
  form.setAttribute("class", "form");
  form.setAttribute("id", "currentform");

  // --- Category Label + Input (top) ---
  const categoryLabel = document.createElement("label");
  categoryLabel.setAttribute("for", "formTitle");
  categoryLabel.textContent = "Category";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "project";
  titleInput.id = "formTitle";
  titleInput.classList.add("input-field");
  titleInput.placeholder = "e.g. Personal";

  // --- Task Label + Input (bottom) ---
  const taskLabel = document.createElement("label");
  taskLabel.setAttribute("for", "formDetails");
  taskLabel.textContent = "Task";

  const detailsInput = document.createElement("textarea");
  detailsInput.name = "details";
  detailsInput.id = "formDetails";
  detailsInput.classList.add("input-field");
  detailsInput.placeholder = "e.g. Wash the dishes";

  // --- Date and Priority ---
  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority & Due Date:";
  priorityLabel.classList.add("prioritylabel");

  const priorityInput = document.createElement("select");
  priorityInput.name = "priority";
  priorityInput.id = "formPriority";
  priorityInput.classList.add("input-field");

  ["Low", "Medium", "High"].forEach(level => {
    const opt = document.createElement("option");
    opt.textContent = level;
    priorityInput.appendChild(opt);
  });

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "date";
  dateInput.id = "formDate";
  dateInput.classList.add("input-field");

  priorityLabel.appendChild(priorityInput);
  priorityLabel.appendChild(dateInput);

  // --- Form Buttons ---
  const formbtns = document.createElement("div");
  formbtns.classList.add("formbtns");

  const submitButton = document.createElement("button");
  submitButton.classList.add("submit");
  submitButton.type = "button";
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", submit);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancelbtn");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", cancel);

  formbtns.appendChild(submitButton);
  formbtns.appendChild(cancelButton);

  // --- Append all to form ---
  form.appendChild(categoryLabel);
  form.appendChild(titleInput);
  form.appendChild(taskLabel);
  form.appendChild(detailsInput);
  form.appendChild(priorityLabel);
  form.appendChild(formbtns);

  return form;
}

export { createForm };
