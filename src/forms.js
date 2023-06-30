import { getTodo } from "./Gameboard";
import _ from 'lodash';
import { cancel, submit } from "./Display";
const todos = getTodo();

function createForm() {
    // Create form element
    var form = document.createElement("form");
    form.setAttribute("class", "form");
    form.setAttribute("id", "currentform");

  
    // Create title input
    var titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "project");
    titleInput.setAttribute("id", "formTitle");
    titleInput.setAttribute("class", "input-field");
  
    // Create details input
 
    var detailsInput = document.createElement("textarea");
    detailsInput.placeholder = 'Task: eg; do dishes.';
    detailsInput.setAttribute("name", "details");
    detailsInput.setAttribute("id", "formDetails");
    detailsInput.setAttribute("class", "input-field");
  
    // Create date input
    
    var dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("id", "formDate");
    dateInput.setAttribute("class", "input-field");
  
    // Create priority input
    var priorityLabel = document.createElement("label");
    priorityLabel.classList.add('prioritylabel')
    priorityLabel.textContent = "Priority: ";
    var priorityInput = document.createElement("select");
    priorityInput.setAttribute("name", "priority");
    priorityInput.setAttribute("id", "formPriority");
    priorityInput.setAttribute("class", "input-field");
    
    // Add priority options
    var option1 = document.createElement("option");
    option1.textContent = "Low";
    priorityInput.appendChild(option1);
  
    var option2 = document.createElement("option");
    option2.textContent = "Medium";
    priorityInput.appendChild(option2);
  
    var option3 = document.createElement("option");
    option3.textContent = "High";
    priorityInput.appendChild(option3);
  
    priorityLabel.appendChild(priorityInput);
    priorityLabel.appendChild(dateInput);
    // Create submit button
    var formbtns = document.createElement('div');
    formbtns.classList.add('formbtns');
    var submitButton = document.createElement("input");
    submitButton.setAttribute("class", "submit");
    submitButton.setAttribute("type", "submit");
    submitButton.addEventListener('click', submit)

    var cancelButton = document.createElement("BUTTON");
    cancelButton.setAttribute("class", "cancelbtn");
    cancelButton.setAttribute("type", "cancel");

    //cancelButton.classList.add('cancelbtn');
    cancelButton.addEventListener('click', cancel)
    formbtns.appendChild(submitButton);
    formbtns.appendChild(cancelButton);
    // Append all elements to the form
    form.appendChild(titleInput);
    form.appendChild(detailsInput);
    form.appendChild(priorityLabel);
    form.appendChild(formbtns);
  
    // Append form to the document body
    return form
  }
  
  // Call the function to create the form
  export {createForm}