
let httpCheck = `http://localhost:8888/api/users/check`
function auth() {
  $.ajax({
    url: `${httpCheck}?x_auth=${localStorage.getItem('token')}`,
    method: 'GET'    
  }).done(data => {
    
    if(!data.valid){
      window.location = '/login';
    }   
    
  })

}
function  isAuth() {
  $.ajax({
    url: `${httpCheck}?x_auth=${localStorage.getItem('token')}`,
    method: 'GET'    
  }).done(data => {    
    if(data.valid){
      window.location = '/home'
    }
  })
}