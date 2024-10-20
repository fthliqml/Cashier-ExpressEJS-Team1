const productElement = document.getElementById("product");
const quantityElement = document.getElementById("quantity");
const priceElement = document.getElementById("price");

function updateTotalPrice() {
  const price = parseInt(
    productElement.options[productElement.selectedIndex].getAttribute("data-price")
  );
  const quantity = parseInt(quantityElement.value, 10);

  if (!isNaN(price) && !isNaN(quantity)) {
    const totalPrice = price * quantity;
    priceElement.textContent = `Rp. ${totalPrice.toLocaleString()}`;
  } else {
    priceElement.textContent = "Rp. 0";
  }
}

productElement.addEventListener("change", updateTotalPrice);
quantityElement.addEventListener("input", updateTotalPrice);
