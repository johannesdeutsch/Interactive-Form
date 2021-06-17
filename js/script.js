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

getFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    
    function validationPass(element) {
        element.parentElement.classList.add('valid');
        element.parentElement.classList.remove('not-valid');
        element.parentElement.lastElementChild.style.display = 'none';
    }
      
    function validationFail(element) {
        element.parentElement.classList.add('not-valid');
        element.parentElement.classList.remove('valid');
        element.parentElement.lastElementChild.style.display = 'inherit';
    }

    
    //helper function to validate name input
    
    function nameValidator() {
        let nameElementValue = getNameField.value;     
        let testNameValue = /^[a-zA-Z]+ [a-zA-Z]+?$/.test(nameElementValue);
        if (!testNameValue) {
            event.preventDefault();
            validationFail(getNameField);
        } else {
            validationPass(getNameField);
        }   
        
        return testNameValue;
    };

    nameValidator();

    
    //helper function to validate email address input

    function emailValidator() {
        let emailElementValue = getEmailField.value;
        let testEmailValue = /^[a-z]+@[a-z]+.com$/i.test(emailElementValue);
        
        if (!testEmailValue) {
            event.preventDefault();
            validationFail(getEmailField);
        } else {
            validationPass(getEmailField);
        }
        
        return testEmailValue;
    };

    emailValidator();


    //     helper function to validate that at least one activity is selected

    function activitiesValidator() {
        let activitiesSectionIsValid = totalCost > 0;
        if (!activitiesSectionIsValid) {
            event.preventDefault();
            validationFail(referenceFieldset);
        } else {
            validationPass(referenceFieldset);
        }
        return activitiesSectionIsValid;
    };

    activitiesValidator();
    

    //helper function to validate credit card input if this payment method is selected

    function cardNumberValidator() {
        let cardNumberFieldValue = getCardNumberField.value;
        const testCardNumberField = /^\d{13,16}$/.test(cardNumberFieldValue);
            
        if(!testCardNumberField) {
            event.preventDefault();
            validationFail(getCardNumberField);
        } else {
            validationPass(getCardNumberField);
        }
            
        return testCardNumberField;
    }
            
    // helper function to validate zip number input
    
    function zipCodeValidator() {        
        let getZipCodeFieldValue = getZipCodeField.value;
        const testZipCodeField = /^\d{5}$/.test(getZipCodeFieldValue);

        if(!testZipCodeField) {
            event.preventDefault();
            validationFail(getZipCodeField);
        } else {
            validationPass(getZipCodeField);
        }
        return testZipCodeField;

    }


    // helper function to validate CVV field input

    function CVVFieldValidator() {        
        let getCVVFieldValue = getCVVField.value;
        const testCVVField = /^\d{3}$/.test(getCVVFieldValue);

        if(!testCVVField) {
            event.preventDefault();
            validationFail(getCVVField);
        } else {
            validationPass(getCVVField);
        }

        return testCVVField;
        
    }

    cardNumberValidator();
    zipCodeValidator();
    CVVFieldValidator();

});

// Accessibility

// Select the input elements with the type 'checkbox'
const selectInputElement = document.querySelectorAll('input[type=checkbox]');

// Loop over the activities' checkboxes
for (let i = 0; i < selectInputElement.length; i++) {
    selectInputElement[i].addEventListener('focus', e => {
    selectInputElement[i].parentElement.classList.add('focus');
    })

    selectInputElement[i].addEventListener('blur', e => {
    selectInputElement[i].parentElement.classList.remove('focus');
    })
}
     