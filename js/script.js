console.log('Test');

//prevent default Scrolling
const getNameField = document.getElementById('name');
getNameField.focus({preventScroll:true});
console.log(getNameField);


// select Job-Role-Select Element and Ohter Job Role Field
const selectSelectElement = document.getElementById('title');
const selectOtherJobRoleField = document.getElementById('other-job-role');
console.log(selectSelectElement);
console.log(selectOtherJobRoleField);

//hide Other Job Role Field by default
selectOtherJobRoleField.style.display = 'none';

// in case of selecting the "Other Job Role" option the field will display, and if not it stays hidden
selectSelectElement.addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        console.log(event.target.value);
        selectOtherJobRoleField.style.display = 'block';
    } else {
        selectOtherJobRoleField.style.display = 'none';
    }
});


// select Design and Colour "select" elements
const selectDesignElement = document.getElementById('design');
const selectColorElement = document.getElementById('color');
const selectColorOptionElements = document.getElementById('color').children;
console.log(selectDesignElement);
console.log(selectColorElement);
console.log(selectColorOptionElements);


selectColorElement.disabled = true;
selectDesignElement.addEventListener('change', (event) => {
    selectColorElement.disabled = false;
    for (let i = 1; i < selectColorOptionElements.length; i++) {
        const eventValue = event.target.value;
        const dataThemeAttribute = selectColorOptionElements[i].getAttribute('data-theme');
        console.log(eventValue);
        console.log(dataThemeAttribute);
        if(eventValue[i] === dataThemeAttribute[i]) {
            selectColorOptionElements[i].hidden = false;
            selectColorOptionElements[i].setAttribute('selected', 'true');

        } else {
            selectColorOptionElements[i].hidden = true;
            selectColorOptionElements[i].setAttribute('selected', 'false');
        }
        console.log(selectColorOptionElements[i].hidden);
        console.log(selectColorOptionElements[i].getAttribute('selected'));
    }

});

// "Register for Activities" section
const referenceFieldset = document.getElementById('activities');
const referenceP = document.getElementById('activities-cost');
console.log(referenceFieldset);
console.log(referenceP);

let totalCost = 0;

referenceFieldset.addEventListener('change', (event) => {
    const dataCost = +(event.target.getAttribute('data-cost'));
    console.log(dataCost);
    console.log(typeof dataCost);

    if(event.target.checked) {
        totalCost += dataCost;
        referenceP.innerHTML = `Total: $${totalCost}`;
    } else {
        totalCost -= dataCost;
        referenceP.innerHTML = `Total: $${totalCost}`;
    }
    console.log(totalCost);
    console.log(event.target.checked);
});

// "Payment info" section
const selectPayment = document.getElementById('payment');
const divCreditCard = document.getElementById('credit-card');
const divPaypal = document.getElementById('paypal');
const divBitcoin = document.getElementById('bitcoin');

console.log(selectPayment);
console.log(divCreditCard);
console.log(divPaypal);
console.log(divBitcoin);

//hide bitcoin and paypal methods
divPaypal.hidden = true;
divBitcoin.hidden = true;

//target Payment select element's second child and give it the selected property
const secondSelectChild = selectPayment.children[1];
secondSelectChild.setAttribute('selected', 'selected');

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

//Form Validation
// select Elements
const getEmailField = document.getElementById('email');
const getCardNumberField = document.getElementById('cc-num');
const getZipCodeField = document.getElementById('zip');
const getCVVField = document.getElementById('cvv');
const getFormElement = document.querySelector('form');


function validationPass(element) {
    element.parentElement.className = 'valid';
    element.parentElement.className.remove('not-valid');
    element.parentElement.lastElementChild.display = 'none';
  }
  
  function validationFail(element) {
    element.parentElement.className = 'not-valid';
    element.parentElement.className.remove('valid');
    element.parentElement.display = 'lastElementChild';
  }


getFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Event was triggered');
    
    
    //helper function to validate name input
    
    function nameValidator() {
        let nameElementValue = getNameField.value;
        console.log(nameElementValue);        
        let testNameValue = /^[a-zA-Z]+ [a-zA-Z]+?$/.test(nameElementValue);
        console.log(testNameValue);
        
        if (!nameValidator()) {
            event.preventDefault();
            validationFail(getNameField);
        } else {
            validationPass(getNameField);
        }   
    };

    nameValidator();
    
    
//     //helper function to validate email address input

//     const emailValidator = () => {
//         let emailElementValue = getEmailField.value;
//         let testEmailValue = /^[a-z]+@[a-z]+.com$/i.test(emailElementValue);
//         console.log(emailElementValue);
//         console.log(testEmailValue);
//         return testEmailValue;
//     };

//     emailValidator();

//     if (!emailValidator) {
//         event.preventDefault();
//         getCardNumberField.className = 'invalid';
//         getCardNumberField.lastElementChild.textContent = 'Please type in a correct credit card number';
//         getCardNumberField.lastElementChild.className = 'error';
//     }
   

//     //helper function to validate that at least one activity is selected
//     const activitiesValidator = () => {
//         let activitiesSectionIsValid = totalCost > 0;
//         console.log(activitiesSectionIsValid);
//         return activitiesSectionIsValid;
//     };

//     activitiesValidator();

//     if (!activitiesValidator) {
//         event.preventDefault();
//         console.log(`this ${activitiesValidator} prevented submission`);
//     }


//     //helper function to validate credit card input if this payment method is selected
//     const creditCardValidator = () => {
//         if (selectPayment.value === 'credit-card') {
//             let cardNumberFieldValue = getCardNumberField.value;
//             const testCardNumberField = /^\d{13, 16}$/.test(cardNumberFieldValue);
            
//             if(!testCardNumberField) {
//                 getCardNumberField.className = 'invalid';
//                 getCardNumberField.lastElementChild.textContent = 'Please type in a correct credit card number';
//                 getCardNumberField.lastElementChild.className = 'error';
//             } else {
//                 getCardNumberField.className = 'valid';
//                 getCardNumberField.last.ElementChild.textContent = '';
//                 getCardNumberField.lastElementChild.className = 'error';

//             }
//             return testCardNumberField;
//         }

//         if (selectPayment.value === 'credit-card') {
//             let zipCodeFieldValue = getZipCodeField.value;
//             const testZipCodeField = /^\d{5}$/.test(zipCodeFieldValue);
//             if(!zipCodeFieldValue) {
//                 getZipCodeField.className = 'invalid';
//                 getZipCodeField.lastElementChild.textContent = 'Please type in a correct zip code';
//                 getZipCodeField.lastElementChild.className = 'error';
//             } else {
//                 getZipCodeField.className = 'valid';
//                 getZipCodeField.last.ElementChild.textContent = '';
//                 getZipCodeField.lastElementChild.className = 'error';
//             }
            
//             return testZipCodeField;
//         }

//         if (selectPayment.value === 'credit-card') {
//             let CVVFieldValue = getCVVField.value;
//             const testCVVField = /^\d{3}$/.test(CVVFieldValue);
//             if(!CVVFieldValue) {
//                 getCVVField.className = 'invalid';
//                 getCVVField.nextElementSibling.textContent = 'Please type in a correct cvv code';
//                 getCVVField.nextElementSibling.className = 'error';
//             } else {
//                 getCVVField.className = 'valid';
//                 getCVVField.nextElementSibling.textContent = '';
//                 getCVVField.nextElementSibling.className = 'error';
//             }
//             return testCVVField;
//         }
    
//         console.log(cardNumberFieldValue);
//         console.log(testCardNumberField);
//         console.log(zipCodeFieldValue);
//         console.log(testZipCodeField);
//         console.log(CVVFieldValue);
//         console.log(testCVVField);
//     };

//     creditCardValidator();

//     if (!creditCardValidator) {
//         event.preventDefault();
//         console.log(`this ${creditCardValidator} prevented submission`);
//     }


 });

// //select the input elements with the type 'checkbox'
// const selectInputElement = document.querySelectorAll('input[type=checkbox]');
// console.log(selectInputElement);

// //Loop over the activities'checkboxes
// for (let i = 0; i < selectInputElement.length; i++) {
//     selectInputElement[i].addEventListener('focus', e => {
//         selectInputElement.parentElement.classList.add('focus');
//     })

//     selectInputElement[i].addEventListener('blur', e => {
//         selectInputElement.parentElement.classList.remove('blur');
//     })
// }
