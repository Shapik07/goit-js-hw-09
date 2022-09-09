import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const feedbackFormRef = document.querySelector('.feedback-form');

feedbackFormRef.addEventListener('input', throttle(onFieldsFormInput, 500));
feedbackFormRef.addEventListener('submit', onSubmitForm);

populateFieldForm();

function onFieldsFormInput(e) {
  let formData = localStorage.getItem(STORAGE_KEY);

  formData = formData ? JSON.parse(formData) : {};
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateFieldForm() {
  let formData = localStorage.getItem(STORAGE_KEY);

  if (formData) {
    formData = JSON.parse(formData);
    Object.entries(formData).forEach(
      ([name, value]) => (feedbackFormRef.elements[name].value = value)
    );
  }
}
