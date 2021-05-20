const commentFormHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const post_id = event.target.getAttribute('data-id');

  const comtent = document.querySelector('#comment').value.trim();

  if (comtent) {
    console.log( req.session)
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comtent, post_id  }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/api/post/${post_id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};
}
document
  .querySelector('.commment-form')
  .addEventListener('submit', commentFormHandler);