// Handle form submission to google sheets
document.addEventListener('DOMContentLoaded', () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxuaCdTf_SJfGiTnM0a6G-8lLh9s_A2f6Tg7_cV4oiAB-NT4VdEu1ZU41Hrjfe_LuDW/exec';
    const form = document.forms['contact-form'];
    const modal = document.getElementById('success-modal');
    const closeButton = document.querySelector('.close-button');
    const loadingSpinner = document.getElementById('loading-spinner');

    form.addEventListener('submit', e => {
        e.preventDefault();
        loadingSpinner.style.display = 'block'; // Show loading spinner
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                loadingSpinner.style.display = 'none';
                modal.style.display = 'block';
            })
            .catch(error => {
                loadingSpinner.style.display = 'none';
                console.error('Error!', error.message);
            });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Form validation
    const validateForm = () => {
        const name = form['your-name'];
        const number = form['your-number'];
        const email = form['your-email'];
        const message = form['message'];

        if (!name.value.match(/^[A-Za-z\s]+$/)) {
            alert('Name should only contain letters and spaces.');
            return false;
        }

        if (!number.value.match(/^\d{10,15}$/)) {
            alert('Phone number should be between 10 to 15 digits.');
            return false;
        }

        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (message.value.trim() === '') {
            alert('Message cannot be empty.');
            return false;
        }

        return true;
    }

});