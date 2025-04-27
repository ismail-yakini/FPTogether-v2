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