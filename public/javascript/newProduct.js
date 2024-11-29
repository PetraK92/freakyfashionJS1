const newProductForm = document.getElementById("newProductForm");
newProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  const formData = new FormData(newProductForm);
  const name = formData.get("name")
  const description = formData.get("description")
  const image = formData.get("image")
  const brand = formData.get("brand")
  const sku = formData.get("sku")
  const price = formData.get("price")

  const body= {
      name,
      description,
      image,
      brand,
      sku,
      price,
    };
    async function postData() {
      try {
     await fetch("http://localhost:3000/admin/products/addProduct", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
      }
  })
  window.location.href="/admin/products"
    }catch(error){
      console.log(error);
    }

    }
    postData();
  });
