$(document).ready(function(){
    $('#loginform').submit(function(e){
        e.preventDefault();        
        addData();
      })
    
})



let addData = ()=>{
    $.ajax({
      method: "POST",
      url: "http://localhost:8888/api/users/login",
      dataType: "json",
      data: {
                email: $('#email_login').val(),
                password:$('#password_login').val()
            }
    })
    .done(function(snap) {    
        console.log(snap)    
       if(snap.loginSuccess){
        localStorage.setItem('token', snap.token);        
        localStorage.setItem('username', snap.data.name);        
        localStorage.setItem('email', snap.data.email);        
        localStorage.setItem('role', snap.data.role);                
        window.location = "/home";  
       }
       else{
           $('#loginsuccess').css("visibility","visible");
       }
        

    });    
  }