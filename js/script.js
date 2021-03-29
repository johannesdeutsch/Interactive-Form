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
