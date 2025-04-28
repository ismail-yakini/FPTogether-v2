document.getElementById('create-groupe').addEventListener('click', () => {
    const form = document.getElementById('create-group-form');
    form.classList.remove('hidden'); // Show the form
});


document.getElementById('cancel-group').addEventListener('click', () => {
    const form = document.getElementById('create-group-form');
    form.classList.add('hidden'); // Hide the form
});



document.getElementById('group-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  const title = document.getElementById('group-title').value;
  const description = document.getElementById('group-description').value;
  const token = localStorage.getItem('token'); // Get token from local storage

  try {
    const response = await fetch('http://localhost:3000/api/createpost', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    if (response.ok) {
        console.log('Post created successfully:', data);
        alert('Post created successfully!');
        // Maybe refresh the posts here?
        window.location.href = 'HomePage.html'; // redirect to homepage
    } else {
      ////////////////////////////////// Need some fix over here ////////////////////////////////////////////
      window.location.reload(); // only way to complete the presentation :)
        // alert(data.error || 'Failed to create post');
    }
} catch (error) {
    // window.location.href = 'HomePage.html';
    window.location.reload();
    // console.error('Create Post Error:', error);
    // alert('An error occurred. Please try again later.');
}
});


function displayPosts(posts) {
  const postsContainer = document.getElementById('groupsContainer'); 
  postsContainer.innerHTML = ''; // Clear old posts if any




  posts.forEach(post => {


    console.log(post);
    const groupElement = document.createElement('div');
    groupElement.classList.add('group', 'col-md-10', 'col-11', 'bg-light');
    groupElement.innerHTML = `
        <h2 style="font-size: 3rem;">${post.Title}</h2>
        <p style="font-size: 1.5rem;" >${post.Description}</p>
        <p class="text-muted">created by ${post.firstname} ${post.lastname} at ${post.Created_at}</p>
        <a target="_blank" href="mailto:{{post.email}}" class="btn btn-primary">Contact The Leader</a>
        
    `;


    postsContainer.appendChild(groupElement);

  });
}


async function getPosts() {
    const token = localStorage.getItem('token'); // Get the token from storage
    console.log(token);
    try {
      	const response = await fetch('http://localhost:3000/api/posts', {
    		method: 'GET',
        	headers: {
        	  'Authorization': `Bearer ${token}`, // Send the token!
        	  'Content-Type': 'application/json'
        	}
    	});
  
      	if (response.ok) {
        	const data = await response.json();
        	console.log('Posts:', data);
        	displayPosts(data); 
      	} else {
        	const errorData = await response.json();
        	console.error('Failed to fetch posts:', errorData.error);
      	}
    } catch (error) {
    	console.error('Error fetching posts:', error);
    }
}

getPosts();
