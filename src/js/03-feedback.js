import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const email = feedbackForm.querySelector('[name="email"]');
const message = feedbackForm.querySelector('[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';

feedbackForm.addEventListener('input', throttle(handlerForm, 500));
feedbackForm.addEventListener('submit', submitForm);

function handlerForm() {
    const user = {
        email: email.value,
        message: message.value,
    };

    saveFormObject(user);
}

restoreFormObject();

function restoreFormObject() {
    try {
        const currentFormObject = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        if (currentFormObject) {
            email.value = currentFormObject.email;
            message.value = currentFormObject.message;
        }
    } catch (error) {
        console.log(error);
    }
}

function submitForm(event) {
    event.preventDefault();

    const user = {
        email: email.value,
        message: message.value,
    };

    if(!user.email || !user.message) {
        alert("Please fill in the fields of the form");
        return;
    }
    
    console.log(user);
    
    removeFormObject();

    feedbackForm.reset();
}

function saveFormObject(user) {
    try {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
}

function removeFormObject() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
}
