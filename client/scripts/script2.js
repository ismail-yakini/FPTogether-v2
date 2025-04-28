document.getElementById('create-groupe').addEventListener('click', () => {
    const form = document.getElementById('create-group-form');
    form.classList.remove('hidden'); // Show the form
});


document.getElementById('cancel-group').addEventListener('click', () => {
    const form = document.getElementById('create-group-form');
    form.classList.add('hidden'); // Hide the form
});


document.getElementById('group-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const title = document.getElementById('group-title').value;
    const description = document.getElementById('group-description').value;

    // Create a new group element
    const groupContainer = document.getElementById('groupsContainer');
    const groupElement = document.createElement('div');
    groupElement.classList.add('group', 'col-md-10', 'col-11', 'bg-light');
    groupElement.innerHTML = `
        <h2 style="font-size: 3rem;">${title}</h2>
        <p style="font-size: 1.5rem;" >${description}</p>
        <p class="text-muted">created by Zakaria Ariki at 04/27/2025</p>
        <a target="_blank" href="mailto:{{group.Contact}}" class="btn btn-primary">Contact The Leader</a>
        
    `;

    // Append the new group to the container
    groupContainer.appendChild(groupElement);

    // Reset and hide the form
    document.getElementById('group-form').reset();
    document.getElementById('create-group-form').classList.add('hidden');
});




    async function loadGroups() {
    const response = await fetch('https://your-backend-url.com/groups'); // your API endpoint
    const groups = await response.json();
    
    const container = document.getElementById('groupsContainer');
    
    groups.forEach(group => {
      const groupElement = document.createElement('div');
      groupElement.style.border = "1px solid #ccc";
      groupElement.style.borderRadius = "8px";
      groupElement.style.padding = "16px";
      groupElement.style.margin = "16px 0";
      groupElement.style.backgroundColor = "#f9f9f9";
      
      groupElement.innerHTML = `
        <img src="${group.image}" alt="Group Image" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px;">
        <h3>${group.category}</h3>
        <p><strong>By:</strong> ${group.account}</p>
        <p>${group.description}</p>
      `;
      
      container.appendChild(groupElement);
    });
  }
  
  loadGroups();