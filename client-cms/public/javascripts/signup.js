$(document).ready(function () {
    $('#signupform').submit(function (e) {
        e.preventDefault();
        addDataX()
    })

})


let addDataX = () => {
    
    $.ajax({
        method: "POST",
        url: "http://localhost:8888/api/users/register",
        dataType: "json",
        data: {
            email: $('#email_register').val(),
            name: $('#name_register').val(),
            password: $('#password_register').val(),
            retypepassword: $('#retypepassword_register').val()
        }
    })
        .done(function (snap) {
            
            if(snap.success){
                localStorage.setItem('token', snap.token);        
                localStorage.setItem('username', snap.doc.name);        
                localStorage.setItem('email', snap.doc.email);        
                localStorage.setItem('role', snap.doc.role);                
                window.location = "/home";  
            }else{
                
                $('#registersuccess').html(snap.errmsg)
            }            
        });

}