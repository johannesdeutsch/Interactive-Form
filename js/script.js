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
const getFormElement = document.getElementsByTagName('form');

getFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    let nameElementValue = getNameField.value;
    let testNameValue = /^[a-zA-Z]+ [a-zA-Z]*? [a-zA-Z]+?$/.test(nameElementValue);
    
    console.log(nameElementValue);
    console.log(testNameValue);
});