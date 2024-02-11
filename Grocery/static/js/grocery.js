// Page load function call
$(document).ready(function () {

    // url  id
    // get id from browser url using js
    var id = getIdFromBrowserUrl("id");
    if (id != null) {
        viewGroceryData(id);
    } else {
        getGroceryData();
    }
});

// GET GROCERIES
function getGroceryData() {
    var cardContainer = $('#grocery-list');

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'http://127.0.0.1:5000/api/v1/grocery/list',
        cache: false,
        success: function (data) {
            console.log('data: ', data);

            // Update the user interface with the retrieved data
            if (data.length > 0) {
                // for (var i = 0;i < data.length;i++) {

                // }
                // Card for each item
                $.each(data, function (index, item) {
                    var cardHtml = createCard(item);
                    cardContainer.append(cardHtml);
                });
            } else {
                cardContainer.html('No Item available.');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
            cardContainer.html('Error fetching data. Please try again later.');
        }
    });
}

// ADD GROCERIES
function addGroceryData() {

    var name = $('#productName').val();
    var description = $('#productDescription').val();
    var category = $('#productCategory').val();
    var quantity = $('#productQuantity').val();
    var price = $('#productPrice').val();

    if (name != "") {
        if (description != "") {
            if (category != "") {
                if (quantity != "") {
                    if (price == "") {
                        alert("please enter price")
                    } else {
                        var groceryData = {
                            name: $('#productName').val(),
                            description: $('#productDescription').val(),
                            category: $('#productCategory').val(),
                            quantity: $('#productQuantity').val(),
                            price: $('#productPrice').val(),
                        };

                        $.ajax({
                            type: 'POST',
                            url: 'http://127.0.0.1:5000/api/v1/grocery/add',
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify(groceryData),
                            cache: false,
                            success: function (data) {
                                alert("Items added Successfully");
                            },
                            error: function (xhr, status, error) {
                                console.error(xhr);
                            }
                        });
                    }
                } else {
                    alert("please enter quantity")
                }
            } else {
                alert("please enter category")
            }
        } else {
            alert("please enter product description")
        }
    } else {
        alert("please enter product name")
    }
}

// CARD OF EACH ITEMS
function createCard(item) {

    var imageUrl = '/static/image_file/' + item.name + '.jpg';

    var html = `
                    <div class="col-md-3">
                        <div class="card">
                            <img src="${imageUrl}" alt="${item.name}">
                            <div class="card-body">
                            <h3>`+ item.name + `</h3>
                            <p>`+ item.description + `</p>
                            <p><span class="price">Price</span>: Rs `+ item.price.toFixed(2) + `</p>
                            <button class="btn btn-primary btn-sm">Add to Cart</button>
                            <a href="/getview?id=`+ item.p_id + `">
                                <button class="view-btn btn btn-primary btn-sm">Quick View</button>
                            </a>
                            </div>
                        </div>
                    </div>
                `;
    return html;
}



// EXTRACT ID FROM URL
function getIdFromBrowserUrl(param) {
    var url = window.location.href;
    var queryString = url.split('?')[1];

    if (queryString) {
        var params = queryString.split('&');

        for (var i = 0; i < params.length; i++) {
            var pair = params[i].split('=');

            if (pair[0] === param) {
                return pair[1];
            }
        }
    }
    return null;
}

// GET GROCERY BY ID
function viewGroceryData(id) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://127.0.0.1:5000/api/v1/grocery/get/' + id,
        cache: false,
        success: function (data) {
            displayGroceryDetails(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again later.');
        }
    });
}

function displayGroceryDetails(data) {
    $('#product-name').html('<b>' + data.name + '</b>');
    $('#product-price').html('<b>Price: $' + data.price + '</b>');
    $('#product-description').text(data.description);
}


//Remove product from manage-grocery
function removeProduct() {
    $('tbody').on('click', '.deleteButton', function () {
        var productId = $(this).closest('tr').data('product-id');
        console.log("Product ID:", productId);
        var row = $(this).closest('tr');

        $.ajax({
            url: 'http://127.0.0.1:5000/api/v1/grocery/grocery-delete/' + productId,
            type: 'DELETE',
            success: function () {
                alert('Product removed successfully!');
                row.remove();
            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.responseJSON.error || 'Something went wrong';
                console.error(errorMessage);
            }
        });
    });
}


//edit grocery
function editGrocery() {
    var url = window.location.href;
    var parts = url.split('/');
    var id = parts[parts.length - 1];
    id = parseInt(id);

    var formData = {
        quantity: $('#quantity').val(),
        price: $('#price').val()
    };


    $.ajax({
        type: 'PUT',
        url: 'http://127.0.0.1:5000/api/v1/grocery/grocery-update/' + id,
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function() {
            alert("item updated successfully");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert("An error occurred while updating the product.");
        }
    });
}