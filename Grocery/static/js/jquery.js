// for REGISTER
function validatePassword() {
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;

    if (password1 !== password2) {
        alert("Passwords do not match. Please enter matching passwords.");
        return false;
    }
    else {
        alert("Registration Successfull !")
    }
    return true;
}

// for CONTACT 
function validateContact() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Please fill in all the required fields.")
        return false;
    }
    else{
        alert("Thanks you for Submitting.")
    }
    return true;
}

function showAlert() {
    alert('Product added successfully!');
};


// GROCERY LIST


