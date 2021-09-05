//prevent default Scrolling and set the focus to the first text field
const getNameField = document.getElementById('name');
getNameField.focus({preventScroll:true});


// select the Job-Role-Select Element and Other-Job-Role-Field
const selectSelectElement = document.getElementById('title');
const selectOtherJobRoleField = document.getElementById('other-job-role');


//hide Other-Job-Role-Field by default
selectOtherJobRoleField.style.display = 'none';


// in case of selecting the "Other" option the field will display, and if not it stays hidden
selectSelectElement.addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        selectOtherJobRoleField.style.display = 'block';
    } else {
        selectOtherJobRoleField.style.display = 'none';
    }
});


// only showing the colors that are available for the designs, and hide the others. The colors are hidden by default.

const selectDesignElement = document.getElementById('design');
const selectColorElement = document.getElementById('color');
const selectColorOptionElements = document.getElementById('color').children;


selectColorElement.disabled = true;

selectDesignElement.addEventListener('change', (event) => {
   
    
    selectColorElement.disabled = false;

    if (selectDesignElement.value === 'js puns') {
        selectColorElement.selectedIndex = 1;
    } else if (selectDesignElement.value === 'heart js') {
        selectColorElement.selectedIndex = 4;
    }


    for (let i = 1; i < selectColorOptionElements.length; i++) {
        const eventValue = event.target.value;
        const dataThemeAttribute = selectColorOptionElements[i].getAttribute('data-theme');
    
        if(eventValue[i] === dataThemeAttribute[i]) {
            selectColorOptionElements[i].hidden = false;
            selectColorOptionElements[i].setAttribute('selected', 'true');

        } else {
            selectColorOptionElements[i].hidden = true;
            selectColorOptionElements[i].setAttribute('selected', 'false');
        }
    }


   

});

// "Register for Activities" section: Updating the total cost of the activities based on the user's selection
const referenceFieldset = document.getElementById('activities');
const referenceP = document.getElementById('activities-cost');

let totalCost = 0;

referenceFieldset.addEventListener('change', (event) => {
    const dataCost = +(event.target.getAttribute('data-cost'));

    if(event.target.checked) {
        totalCost += dataCost;
        referenceP.innerHTML = `Total: $${totalCost}`;
    } else {
        totalCost -= dataCost;
        referenceP.innerHTML = `Total: $${totalCost}`;
    }



    /* Tried to code the following for an Exceeds:
    // prevent users to choose activities which happen at the same time

    let selectSpanElement = document.getElementsByClassName('activity-cost');
    let activitiesDivChildren = document.getElementById('activities-box').children;
    let dayAndTime = event.target.getAttribute("data-day-and-time");
    console.log(dayAndTime);

    for (let i = 0; i < dayAndTime.length; i++) {
        if (dayAndTime.checked === dayAndTime.checked) {
            activitiesDivChildren[i].firstElementChild.disabled;
            selectSpanElement[i].parentElement.className = 'disabled';
        } else {
            selectSpanElement[i].parentElement.className.remove('disabled');
        }      
    }
    */
    

});

// "Payment info" section: selecting elements
const selectPayment = document.getElementById('payment');
const divCreditCard = document.getElementById('credit-card');
const divPaypal = document.getElementById('paypal');
const divBitcoin = document.getElementById('bitcoin');

//hide bitcoin and paypal methods by default
divPaypal.hidden = true;
divBitcoin.hidden = true;

//target selectPayment element's second child (Credit Card) and give it the selected property
const secondSelectChild = selectPayment.children[1];
secondSelectChild.setAttribute('selected', 'selected');

//all payment methods except the selected one are hidden
selectPayment.addEventListener('change', (event) => {
    if (event.target.value === 'credit-card') {
        divCreditCard.hidden = false;
        divPaypal.hidden = true;
        divBitcoin.hidden = true;
    } else if(event.target.value === 'paypal') {
        divCreditCard.hidden = true;
        divPaypal.hidden = false;
        divBitcoin.hidden = true;
    } else if(event.target.value === 'bitcoin') {
        divCreditCard.hidden = true;
        divPaypal.hidden = true;
        divBitcoin.hidden = false;
    }
});

// Form Validation
// select the required elements
const getEmailField = document.getElementById('email');
const getCardNumberField = document.getElementById('cc-num');
const getZipCodeField = document.getElementById('zip');
const getCVVField = document.getElementById('cvv');
const getFormElement = document.querySelector('form');


// listen for the 'submit' event, and then testing if all the fields have the required input. 
// If not, submission will be prevented 

function validationPass(element) {
    element.parentElement.className = 'valid';
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
};
      
function validationFail(element) {
    element.parentElement.className = 'not-valid';
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
};

    
//helper function to validate name input
    

function nameValidator() {
    let nameElementValue = getNameField.value;     
    let testNameValue = /^[a-zA-Z]+ *[a-zA-Z]*?$/.test(nameElementValue);
    if (!testNameValue) {
        validationFail(getNameField);
    } else {
        validationPass(getNameField);
    }   
        
    return testNameValue;
};

    

//helper function to validate email address input
    

function emailValidator() {
    let emailElementValue = getEmailField.value;
    let testEmailValue = /^[a-z]+@[a-z]+.com$/i.test(emailElementValue);
        
    if (!testEmailValue) {
         validationFail(getEmailField);
    } else {
        validationPass(getEmailField);
    }
        
    return testEmailValue;
};

    
//     helper function to validate that at least one activity is selected

function activitiesValidator() {
    let activitiesSectionIsValid = totalCost > 0;
    if (!activitiesSectionIsValid) {
        referenceFieldset.classList.remove('not-valid');
        referenceFieldset.classList.add('valid');
        referenceFieldset.lastElementChild.style.display = 'block';
    } else {
        referenceFieldset.classList.add('valid');
        referenceFieldset.classList.remove('not-valid');
        referenceFieldset.lastElementChild.style.display = 'none';
    }
    return activitiesSectionIsValid;
};

    

//helper function to validate credit card input if this payment method is selected

function cardNumberValidator() {
    let cardNumberFieldValue = getCardNumberField.value;
    const testCardNumberField = /^\d{13,16}$/.test(cardNumberFieldValue);
            
    if(!testCardNumberField) {
        validationFail(getCardNumberField);
    } else {
        validationPass(getCardNumberField);
    }
            
    return testCardNumberField;
};
  

// helper function to validate zip number input
    
function zipCodeValidator() {        
    let getZipCodeFieldValue = getZipCodeField.value;
    const testZipCodeField = /^\d{5}$/.test(getZipCodeFieldValue);

    if (!testZipCodeField) {
        validationFail(getZipCodeField);
    } else {
        validationPass(getZipCodeField);
    }
    return testZipCodeField;

};


// helper function to validate CVV field input
    
function CVVFieldValidator() {
    let getCVVFieldValue = getCVVField.value;
    const testCVVField = /^\d{3}$/.test(getCVVFieldValue);

    if (!testCVVField) {
        validationFail(getCVVField);
    } else {
        validationPass(getCVVField);
    }

    return testCVVField;

};


// Select the input elements with the type 'checkbox'
const selectInputElement = document.querySelectorAll('input[type=checkbox]');


//Event Listener listening for submission and preventing refreshing if one or more of the inputs are incorrect or missing. In the case everything is correct, the site refreshes and the value of the fields is cleared

getFormElement.addEventListener('submit', (event) => {
    
    if (nameValidator() && emailValidator() && activitiesValidator() && cardNumberValidator() && zipCodeValidator() && CVVFieldValidator()) {
        getNameField.value = '';
        getEmailField.value = '';
        selectInputElement.value = '';
        getCardNumberField.value = '';
        getZipCodeField.value = '';
        getCVVField.value = '';
    } else {
    event.preventDefault();
    nameValidator();
    emailValidator();
    activitiesValidator();
    cardNumberValidator();
    zipCodeValidator();
    CVVFieldValidator();
    }
    
});

// Accessibility

// Loop over the activities' checkboxes
for (let i = 0; i < selectInputElement.length; i++) {
    selectInputElement[i].addEventListener('focus', e => {
    selectInputElement[i].parentElement.classList.add('focus');
    })

    selectInputElement[i].addEventListener('blur', e => {
    selectInputElement[i].parentElement.classList.remove('focus');
    })
}
 