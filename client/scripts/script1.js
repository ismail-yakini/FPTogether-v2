    const images =["../src/group1.jpg","../src/group2.jpg","../src/group3.jpg","../src/group4.jpg","../src/group5.jpg"]

    document.getElementById('switch-to-login').addEventListener('click', function () {
    event.preventDefault();
    const body = document.getElementById('body');
    // Clear the form's inner HTML
    
    body.innerHTML = `
        <div style="background-color:#2c2638 ;" class="left-flex">
             <div class="title-bar banner">
                <h1>FP<span style="color: aqua;">T</span>ogether</h1>
            </div>
            <h1 class="large-title">log in</h1>
            <form id="loginform">
                <div class="">
                    <label for="email"></label>
                    <input type="email" id="loginEmail" placeholder="Enter your email" required>
                </div>
                
                <div class="">
                    <label for="password"></label>
                    <input type="password" id="loginPassword" placeholder="Enter your password" required>   
                </div>
                
                <p class="">i don't have an account? <a href="#" id="switch-to-create">sign in</a></p>
                 
                <button type="submit" href="HomePage.html" class="create-account-btn">log in</button>
            </form>
        </div>
        <div style="background-color:#43316aec ;" class="right-flex"><div style="color: white; text-align: center;">
  <h2>Find your interests and friends to work with</h2>
  <p>FPTogether gives you the opportunity to create or join groups with your interests</p>
  
            <div>
                <img id="change-image" src="../src/group1.jpg"  />
              </div>
</div>
</div>
    
    `;

    let currentIndex = 0;
    const imgElement = document.getElementById('change-image');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
    }, 2000);
    const switchToCreate = document.getElementById('switch-to-create');
    if (switchToCreate) {
        switchToCreate.addEventListener('click', function (event) {
            event.preventDefault();
            location.reload(); 
        });
    }








    // Now, add the event listener for the login form
    const loginForm = document.getElementById('loginform');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent page refresh

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // alert('Login successful!');
                console.log('JWT Token:', data.token);
                // Store the token
                localStorage.setItem('token', data.token); // Store the token
                // Redirect or perform actions after successful login
                // window.location.href = '/dashboard'; // Example redirect after login
                window.location.href = 'HomePage.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });


});
    
    let currentIndex = 0;
    const imgElement = document.getElementById('change-image');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
    }, 10000);






// Handle sign up
const signupForm = document.getElementById('account-form');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page refresh

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  try {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });


    const data = await response.json();
    // console.log(response);
    console.log(data);
    if (response.ok) {
        
      console.log('JWT Token:', data.token);
      // Optionally, store the token for future use
      localStorage.setItem('token', data.token); // Store the token in localStorage


      window.location.href = 'HomePage.html';
    } else {
        // console.log(data.message);
      alert(data.error);

    }
  } catch (error) {
    console.error('Sign Up Error:', error);
    alert('An error occurred. Please try again later.');
  }
});
