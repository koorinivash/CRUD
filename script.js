let groceries = [];

function addGrocery() {
    const item = document.getElementById("groceryItem").value.trim();
    const quantity = document.getElementById("groceryQuantity").value;
    const category = document.getElementById("groceryCategory").value;
    const expiry = document.getElementById("expiryDate").value;

    if (item === "" || quantity === "") {
        alert("Please enter an item and quantity.");
        return;
    }

    groceries.push({ item, quantity, category, expiry });
    displayGroceries();
    clearInputs();
}

function displayGroceries() {
    const table = document.getElementById("groceryTable");
    table.innerHTML = "";

    groceries.forEach((g, index) => {
        const row = `<tr>
            <td>${g.item}</td>
            <td>${g.quantity}</td>
            <td>${g.category}</td>
            <td>${g.expiry || "N/A"}</td>
            <td>
                <button onclick="editGrocery(${index})">✏️ Update</button>
                <button onclick="deleteGrocery(${index})">❌ Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

function editGrocery(index) {
    const item = groceries[index];
    document.getElementById("groceryItem").value = item.item;
    document.getElementById("groceryQuantity").value = item.quantity;
    document.getElementById("groceryCategory").value = item.category;
    document.getElementById("expiryDate").value = item.expiry;
    deleteGrocery(index);
}

function deleteGrocery(index) {
    groceries.splice(index, 1);
    displayGroceries();
}

function clearInputs() {
    document.getElementById("groceryItem").value = "";
    document.getElementById("groceryQuantity").value = "";
    document.getElementById("groceryCategory").value = "Fruits & Vegetables";
    document.getElementById("expiryDate").value = "";
}

function clearList() {
    groceries = [];
    displayGroceries();
}

function sortList() {
    const sortOption = document.getElementById("sortOptions").value;
    if (sortOption === "name") {
        groceries.sort((a, b) => a.item.localeCompare(b.item));
    } else if (sortOption === "quantity") {
        groceries.sort((a, b) => a.quantity - b.quantity);
    } else if (sortOption === "expiry") {
        groceries.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    }
    displayGroceries();
}

function saveList() {
    localStorage.setItem("groceryList", JSON.stringify(groceries));
    alert("List saved successfully!");
}

function loadList() {
    const savedGroceries = localStorage.getItem("groceryList");
    if (savedGroceries) {
        groceries = JSON.parse(savedGroceries);
        displayGroceries();
    } else {
        alert("No saved list found.");
    }
}

function filterGroceryList() {
    const filter = document.getElementById("filterCategory").value;
    const table = document.getElementById("groceryTable");
    table.innerHTML = "";
    
    let filteredGroceries = filter === "All" ? groceries : groceries.filter(g => g.category === filter);
    
    filteredGroceries.forEach((g, index) => {
        const row = `<tr>
            <td>${g.item}</td>
            <td>${g.quantity}</td>
            <td>${g.category}</td>
            <td>${g.expiry || "N/A"}</td>
            <td>
                <button onclick="editGrocery(${index})">✏️ Edit</button>
                <button onclick="deleteGrocery(${index})">❌ Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}
