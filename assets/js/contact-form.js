const messages = {
  en: { title: 'Thank you!', body: "We've received your message and will get back to you as soon as possible." },
  ru: { title: 'Спасибо!', body: 'Мы получили ваше сообщение и свяжемся с вами как можно скорее.' }
};

export function initContactForms() {
  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const category = form.elements.category;
    const message = form.elements.message;
    const submit = form.querySelector('button[type="submit"]');
    const options = form.closest('.here-for-you__grid').querySelectorAll('.here-for-you__links button');
    const language = form.dataset.language || document.documentElement.lang || 'en';

    const updateSubmit = () => {
      submit.disabled = !(form.elements['first-name'].value.trim() && form.elements.email.validity.valid && message.value.trim());
    };

    options.forEach((option, index) => {
      option.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      option.addEventListener('click', () => {
        options.forEach((item) => item.setAttribute('aria-pressed', item === option ? 'true' : 'false'));
        category.value = option.dataset.category;
        message.placeholder = option.dataset.placeholder;
        message.focus();
      });
    });

    form.addEventListener('input', updateSubmit);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (submit.disabled) return;
      const success = document.createElement('div');
      success.className = 'here-for-you__success';
      success.setAttribute('role', 'status');
      success.innerHTML = `<h3>${messages[language].title}</h3><p>${messages[language].body}</p>`;
      form.replaceWith(success);
    });
    updateSubmit();
  });
}
