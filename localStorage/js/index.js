$(document).ready(function () {
  const productItem = [
    {
      productName: "FinePix Pro2 3D Camera",
      price: "1800.00",
      photo: "camera.jpg",
    },
    {
      productName: "EXP Portable Hard Drive",
      price: "800.00",
      photo: "external-hard-drive.jpg",
    },
    {
      productName: "Luxury Ultra thin Wrist Watch",
      price: "500.00",
      photo: "laptop.jpg",
    },
    {
      productName: "XP 1155 Intel Core Laptop",
      price: "1000.00",
      photo: "watch.jpg",
    },
  ];
  showProductGallery(productItem);
  showCartTable();
});

function addToCart(element) {
  let productParent = $(element).closest("div.product-item");

  let price = $(productParent).find(".price span").text();
  let productName = $(productParent).find(".productname").text();
  let quantity = $(productParent).find(".product-quantity").val();

  let cartItem = {
    productName: productName,
    price: price,
    quantity: quantity,
  };
  let cartItemJSON = JSON.stringify(cartItem);

  let cartArray = new Array();
  if (sessionStorage.getItem("shopping-cart")) {
    cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
  }
  cartArray.push(cartItemJSON);

  let cartJSON = JSON.stringify(cartArray);
  sessionStorage.setItem("shopping-cart", cartJSON);
  showCartTable();
}

function emptyCart() {
  if (sessionStorage.getItem("shopping-cart")) {
    sessionStorage.removeItem("shopping-cart");
    showCartTable();
  }
}

function removeCartItem(index) {
  if (sessionStorage.getItem("shopping-cart")) {
    var shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));
    sessionStorage.removeItem(shoppingCart[index]);
    showCartTable();
  }
}

function showCartTable() {
  let cartRowHTML = "";
  let itemCount = 0;
  let grandTotal = 0;

  let price = 0;
  let quantity = 0;
  let subTotal = 0;

  if (sessionStorage.getItem("shopping-cart")) {
    let shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));
    itemCount = shoppingCart.length;

    //Iterate javascript shopping cart array
    shoppingCart.forEach(function (item) {
      let cartItem = JSON.parse(item);
      price = parseFloat(cartItem.price);
      quantity = parseInt(cartItem.quantity);
      subTotal = price * quantity;

      cartRowHTML +=
        "<tr>" +
        "<td>" +
        cartItem.productName +
        "</td>" +
        "<td class='text-right'>$" +
        price.toFixed(2) +
        "</td>" +
        "<td class='text-right'>" +
        quantity +
        "</td>" +
        "<td class='text-right'>$" +
        subTotal.toFixed(2) +
        "</td>" +
        "</tr>";

      grandTotal += subTotal;
    });
  }

  $("#cartTableBody").html(cartRowHTML);
  $("#itemCount").text(itemCount);
  $("#totalAmount").text("$" + grandTotal.toFixed(2));
}

function showProductGallery(product) {
  let productHTML = "";
  product.forEach(function (item) {
    productHTML +=
      '<div class="product-item">' +
      '<img src="product-images/' +
      item.photo +
      '">' +
      '<div class="productname">' +
      item.productName +
      "</div>" +
      '<div class="price">$<span>' +
      item.price +
      "</span></div>" +
      '<div class="cart-action">' +
      '<input type="text" class="product-quantity" name="quantity" value="1" size="2" />' +
      '<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />' +
      "</div>" +
      "</div>";
    ("<tr>");
  });
  $("#product-item-container").html(productHTML);
}
