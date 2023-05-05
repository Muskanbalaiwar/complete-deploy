//console.log(1);

//alert('hii')
var form=document.getElementById('form_id');
form.addEventListener('submit',addData)
 function addData(e){
 e.preventDefault();
    const data={
        _email:e.target.Email.value,
    }
console.log(data._email);


   

 axios
    .post("http://localhost:3001/password/forgotpassword",data)
    .then((res)=>{
        console.log('hello world')
        alert('data sended')
    })
.catch(err=>{
    console.log(err);
})    
}





 