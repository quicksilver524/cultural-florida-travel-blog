async function signupFormHandler(event) {
    event.preventDefault();
        console.log("signup js is running")
    const username = document.querySelector('#username-signup').value.trim();
    const nickname = document.querySelector('#nickname-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && nickname && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                nickname,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(function(){
            document.location.replace('/dashboard');

        });

        if (response.ok) {
            console.log("signup success");
            document.location.replace('/dashboard');
        } else {
            alert('Please enter all required fields.')
        }
    }
}

document.querySelector('#signup-button').addEventListener('submit', signupFormHandler)