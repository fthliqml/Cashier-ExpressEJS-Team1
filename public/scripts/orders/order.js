async function fetchOrderDetail(orderId) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/orders/${orderId}`);
    if (response.ok) {
      const getJson = await response.json();
      const data = getJson.data;
      insertIntoModal(data);
    } else {
      throw new Error("Error fetching API, status : ", response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

function insertIntoModal(data) {
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
