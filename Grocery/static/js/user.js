//CONTACT
function saveContact() {
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    if (name != "") {
        if (email != "") {
            if (phone != "") {
                if (subject != "") {
                    if (message == "") {
                        alert("please enter message")
                    } else {
                        var contactData = {
                            name: $('#name').val(),
                            email: $('#email').val(),
                            phone: $('#phone').val(),
                            subject: $('#subject').val(),
                            message: $('#message').val()
                        };
                
                        $.ajax({
                            type: "POST",
                            url: "http://127.0.0.1:5000/api/v1/user/contact",
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify(contactData),
                            cache: false,
                            success: function (data) {
                                var c = confirm('Thanks for submitting');
                                window.location = 'http://127.0.0.1:5000/contact';
                                // location.reload();
                            },
                            error: function (xhr, status, error) {
                                console.error(xhr);
                            }
                        });
                    }
                } else {
                    alert("please enter Subject");
                }
            } else {
                alert("please enter phone number");
            }
        } else {
            alert("please enter email");
        }
    } else {
        alert("please enter name");
    }
}




// registration
function submitRegistration() {

    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var pass1 = $('#password1').val();
    var pass2 = $('#password2').val();

    if (name != ""){
        if (email != "") {
            if (phone != "") {
                if (pass1 != ""){
                    if (pass1 != pass2){
                        alert("password not match")
                    } else {
                        var userData = {
                            name: $('#name').val(),
                            email: $('#email').val(),
                            phone: $('#phone').val(),
                            password: $('#password1').val()
                        };
                
                        // ajax request
                        $.ajax({
                            type: 'POST',
                            url: 'http://127.0.0.1:5000/api/v1/user/register',
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify(userData),
                            cache: false,
                            success: function (data,) {
                                alert('Registration successfull');
                            },
                            error: function (xhr, status, error) {
                                alert(xhr['responseJSON']['message']);
                            }
                        });
                    }
                }else {
                    alert("please enter password");
                }
            } else {
                alert("please enter phone");
            }
        } else {
            alert("please enter email");
        }
    } else {
        alert("please enter name");
    }
}
