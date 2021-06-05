const delButtonHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    //console.log(id)
    const response = await fetch(`../api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

const editButtonHandler = async (event) => {
   //console.log(event)
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const content = document.querySelector(`#edit${id}`).innerHTML.trim();;
   
     const response = await fetch(`../api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit post');
    }
   
  };
}


document
  .querySelector('.del-btn')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.edit-btn')
  .addEventListener('click', editButtonHandler);

