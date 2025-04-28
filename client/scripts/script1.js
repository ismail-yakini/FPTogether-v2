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
            <form id="form">
                <div class="">
                    <label for="email"></label>
                    <input type="email" id="email" placeholder="Enter your email" required>
                </div>
                
                <div class="">
                    <label for="password"></label>
                    <input type="password" id="password" placeholder="Enter your password" required>   
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
});
    
    let currentIndex = 0;
    const imgElement = document.getElementById('change-image');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
    }, 10000);