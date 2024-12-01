async function fetchProducts() {
  
  const data = await fetch(
    "http://localhost:3000/admin/products/loadProducts"
  );
  const products = await data.json();

 
  const tableProducts = document.getElementById("tableProducts");
  tableProducts.innerHTML = "";
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Namn</th><th>SKU</th><th>Pris</th>`;
  tableProducts.appendChild(headerRow);

  
  products.forEach((element) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td>${element.name}</td><td>${element.sku}</td><td>${element.price}</td>`;
    tableProducts.appendChild(tableRow);
  });
}
const loadProductsButton = document.getElementById("loadProducts");
loadProductsButton.addEventListener("click", fetchProducts);
