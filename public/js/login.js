async function loginFormHandler(event) {
    event.preventDefault();
console.log('login form handler running')
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Email or Password is incorrect, please try again.')
        }
    }
}
document.querySelector('.login-form').addEventListener('click', loginFormHandler);
