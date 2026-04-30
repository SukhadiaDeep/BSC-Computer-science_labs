function addDeal() {
    // 1. Get the values from the input boxes
    const storeName = document.getElementById('store-name').value;
    const dealDesc = document.getElementById('deal-desc').value;

    // 2. Check if the user actually typed something
    if (storeName === '' || dealDesc === '') {
        alert("Please fill in both fields!");
        return;
    }

    // 3. Create a new "Deal Card" HTML element
    const dealList = document.getElementById('deals-list');
    const newCard = document.createElement('div');
    newCard.classList.add('deal-card');

    // 4. Put the text inside the card
    newCard.innerHTML = `
        <h3>${storeName}</h3>
        <p>${dealDesc}</p>
    `;

    // 5. Add the card to the screen
    dealList.appendChild(newCard);

    // 6. Clear the inputs for the next deal
    document.getElementById('store-name').value = '';
    document.getElementById('deal-desc').value = '';
}