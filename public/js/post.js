const commentFormHandler = async (event) => {
  event.preventDefault();


 // gets post by data-id identifier
  if (event.target.hasAttribute('data-id')) {
  const post_id = event.target.getAttribute('data-id');
  const comtent = document.querySelector('#comment').value.trim();
  // console.log(comtent)
  // console.log(post_id)
  if (comtent) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comtent, post_id  }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      
    if (response.ok) {
     // console.log("It worked")
      location.reload();
    } else {
     
      alert('Failed to create comment');
    }
  }
};
}

document.querySelector('.commentCreate').addEventListener('click', commentFormHandler);


