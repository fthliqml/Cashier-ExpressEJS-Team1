async function fetchOrderDetail(orderId) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/orders/${orderId}`);
    if (response.ok) {
      const getJson = await response.json();
      const data = getJson.data;
      insertIntoDetailModal(data);
    } else {
      throw new Error("Error fetching API, status : ", response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

function insertIntoDetailModal(data) {
  const modalLabel = document.getElementById("detailModalLabel");
  const tbody = document.querySelector("#detailModal tbody");

  const customerData = data.customer;
  const productData = data.product;

  tbody.innerHTML = "";
  modalLabel.innerText = "";

  const row = `
      <tr>
        <td>${customerData.firstName} ${customerData.lastName}</td>
        <td>${customerData.email}</td>
        <td>${customerData.address}</td>
        <td>${productData.name}</td>
        <td>Rp. ${productData.price.toLocaleString("id-ID")}</td>
        <td>${productData.description}</td>
      </tr>
    `;

  modalLabel.innerText = `Detail Customer & Product on Order ID : ${data.id}`;
  tbody.innerHTML = row;
}

const btnDetail = document.querySelectorAll(".btn-detail");

btnDetail.forEach((button) => {
  button.addEventListener("click", function () {
    const orderId = this.getAttribute("data-id");
    fetchOrderDetail(orderId);
  });
});

// Method update
function insertIntoUpdateModal(order, customers, products) {
  const modalLabel = document.getElementById("updateModalLabel");
  const modalBody = document.querySelector("#updateModal .modal-body");

  modalLabel.innerHTML = `Update Order ID : ${order.id}`;

  const form = `
  <form
  id="formUpdate"
  action="/orders/${order.id}?_method=PATCH"
  enctype="application/x-www-form-urlencoded"
  method="post"
        >
        <div class="mb-3">
        <label for="inputCustomer" class="form-label">Customer</label>
        <select name="customer_id" id="inputCustomer" class="form-select">
        ${customers
          .map(
            (customer) =>
              `<option value="${customer.id}" ${customer.id == order.customer_id ? "selected" : ""}>
              ${customer.firstName} ${customer.lastName}</option>`
          )
          .join("")}
        </select>
        </div>  
        <div class="mb-3">
        <label for="inputProduct" class="form-label">Product</label>
        <select name="product_id" id="inputProduct" class="form-select">
        ${products
          .map(
            (product) =>
              `<option value="${product.id}" ${
                product.id == order.product_id ? "selected" : ""
              } data-price=${product.price}>
            ${product.name}</option>`
          )
          .join("")}
        </select>
        </div>
        <div class="mb-3">
            <label for="inputQuantity" class="form-label col-12">Quantity</label>
            <input type="number" class="text-center w-25" name="quantity" id="inputQuantity" min="1" max="1000" value="${
              order.quantity
            }" />
          </div>
        <div class="mb-3">
            <label for="totalPrice" class="form-label col-12">Total Price</label>
            <input type="text" class="text-center" name="totalPrice" id="totalPrice" min="0" readonly />
          </div>
      </form>
  `;
  modalBody.innerHTML = form;

  totalPriceEvent();
}

const btnUpdate = document.querySelectorAll(".btn-update");

btnUpdate.forEach((button) => {
  button.addEventListener("click", function () {
    const order = JSON.parse(this.getAttribute("data-order"));
    const customersData = JSON.parse(this.getAttribute("data-customers"));
    const productsData = JSON.parse(this.getAttribute("data-products"));

    insertIntoUpdateModal(order, customersData, productsData);
  });
});

function totalPriceEvent() {
  const totalPrice = document.querySelector("#totalPrice");
  const inputQuantity = document.querySelector("#inputQuantity");
  const inputProduct = document.querySelector("#inputProduct");

  changeTotalPrice();

  function changeTotalPrice() {
    totalPrice.value = `Rp. ${(
      inputQuantity.value *
      inputProduct.options[inputProduct.selectedIndex].getAttribute("data-price")
    ).toLocaleString("id-ID")}`;
  }

  inputQuantity.addEventListener("change", changeTotalPrice);
  inputProduct.addEventListener("change", changeTotalPrice);
}

window.onload = function () {
  const alert = document.getElementById("live-alert");
  if (alert) {
    alert.classList.add("fade-out");

    setTimeout(function () {
      alert.classList.add("hidden");

      // Wait transition to end (1s)
      setTimeout(() => {
        alert.remove(); // delete alert element
      }, 1000);
    }, 2000);
  }
};
