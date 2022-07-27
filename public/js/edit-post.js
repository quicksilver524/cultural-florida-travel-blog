async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const post_cover_url = document.querySelector('input[name="post_cover_url"]').value;
    const bodyHtml = $('#summernote').summernote('code');

    
    //***WOULD BELOW BE /api/posts or /dashboard?***
    const response = await fetch (`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            post_body: bodyHtml,
            cover_url: post_cover_url
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
