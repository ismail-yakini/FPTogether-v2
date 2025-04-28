document.getElementById('create-groupe').addEventListener('click', () => {
    const form = document.getElementById('create-group-form');
    form.classList.remove('hidden'); // Show the form
});


document.getElementById('cancel-group').addEventListener('click', () => {
    const form = document.getElementById('create-group-form');
    form.classList.add('hidden'); // Hide the form
});


// document.getElementById('group-form').addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent form submission

//     // Get form values
//     const title = document.getElementById('group-title').value;
//     const description = document.getElementById('group-description').value;


//     try {
//       const response = await fetch('http://localhost:3000/api/createpost', {
//           method: 'POST',
//           headers: {
//               'Authorization': `Bearer ${token}`, // Send the token!
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ title, description }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//           // alert('Login successful!');
//           console.log('JWT Token:', data.token);
//           // Store the token
//           localStorage.setItem('token', data.token); // Store the token
//           // Redirect or perform actions after successful login
//           // window.location.href = '/dashboard'; // Example redirect after login
//           window.location.href = 'HomePage.html';
//       } else {
//           alert(data.message);
//       }
//   } catch (error) {
//       console.error('Login Error:', error);
//       alert('An error occurred. Please try again later.');
//   }

//     // Create a new group element
   
//     // Append the new group to the container
   

//     // Reset and hide the form
    
// });





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
      window.location.reload();
        // alert(data.error || 'Failed to create post');
    }
} catch (error) {
    // window.location.href = 'HomePage.html';
    window.location.reload();
    // console.error('Create Post Error:', error);
    // alert('An error occurred. Please try again later.');
}
});


// document.getElementById('group-form').reset();
//     document.getElementById('create-group-form').classList.add('hidden');



function displayPosts(posts) {
  const postsContainer = document.getElementById('groupsContainer'); // make sure you have a div with id="postsContainer"
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









    // const postDiv = document.createElement('div');
    // postDiv.className = 'post'; // optional for CSS
    // postDiv.innerHTML = `
    //   <h3>${post.Title}</h3>
    //   <p>${post.Description}</p>
    //   <small>Posted by user ${post.UserId} on ${post.Created_at}</small>
    // `;
    // postsContainer.appendChild(postDiv);
  });
}








  //   async function loadGroups(posts) {
  //   const response = await fetch('http://localhost:3000/api/posts'); // your API endpoint
  //   console.log(response);
  //   const groups = await response.json();
    
  //   const container = document.getElementById('groupsContainer');
    
  //   groups.forEach(group => {
  //     const groupElement = document.createElement('div');
  //     groupElement.style.border = "1px solid #ccc";
  //     groupElement.style.borderRadius = "8px";
  //     groupElement.style.padding = "16px";
  //     groupElement.style.margin = "16px 0";
  //     groupElement.style.backgroundColor = "#f9f9f9";
      
  //     groupElement.innerHTML = `
  //       <img src="${group.image}" alt="Group Image" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px;">
  //       <h3>${group.category}</h3>
  //       <p><strong>By:</strong> ${group.account}</p>
  //       <p>${group.description}</p>
  //     `;
      
  //     container.appendChild(groupElement);
  //   });
  // }






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
        // Now you can display the posts on your page
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
  
  // loadGroups();