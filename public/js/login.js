async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Email or Password is incorrect, please try again')
        }
    }
}
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
