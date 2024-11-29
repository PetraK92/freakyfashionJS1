async function fetchProducts() {
    //hämtar produktinfo
    const products = await fetch(
      "http://localhost:3000/admin/products/loadProducts"
    );
    const data = await products.json();

    //hämtar element som behövs
    const tableProducts = document.getElementById("tableProducts");
    tableProducts.innerHTML = "";
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th>Namn</th><th>SKU</th><th>Pris</th>`;
    tableProducts.appendChild(headerRow);

    //lägg till infon i tabellen
    data.forEach((element) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td>${element.name}</td><td>${element.sku}</td><td>${element.price}</td>`;
      tableProducts.appendChild(tableRow);
    });
  }
  const loadProductsButton = document.getElementById("loadProducts");
  loadProductsButton.addEventListener("click", fetchProducts);
