// Function to send a new deal to the database
async function addDeal() {
    const storeName = document.getElementById('store-name').value; 
    const dealDesc = document.getElementById('deal-desc').value; 

    if (storeName === '' || dealDesc === '') { 
        alert("Please fill in both fields!");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/add_deal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                store_name: storeName,
                description: dealDesc
            })
        });

        if (response.ok) {
            // Instead of just adding one card, we refresh the whole list
            // to ensure the screen matches the database exactly
            loadDeals(); 
            
            // Clear the inputs
            document.getElementById('store-name').value = ''; 
            document.getElementById('deal-desc').value = ''; 
        } else {
            alert("Server error. Could not save the deal.");
        }
    } catch (error) {
        console.error("Connection failed! Make sure app.py is running.", error);
    }
}

// Function to fetch all deals from the database and show them on screen
async function loadDeals() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_deals');
        const deals = await response.json();
        
        const dealList = document.getElementById('deals-list');
        dealList.innerHTML = ''; // Clear the list so we don't get duplicates

        deals.forEach(deal => {
            const newCard = document.createElement('div');
            newCard.classList.add('deal-card');
            newCard.innerHTML = `
                <h3>${deal.store_name}</h3>
                <p>${deal.description}</p>
            `;
            dealList.appendChild(newCard);
        });
    } catch (error) {
        console.error("Error loading deals:", error);
    }
}

// Run loadDeals automatically when the page is opened
window.onload = loadDeals;