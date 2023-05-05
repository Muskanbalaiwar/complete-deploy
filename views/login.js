var form=document.getElementById('form_id');
var email=document.getElementById('email_id');

form.addEventListener('submit',addItem);

function addItem(e){
    e.preventDefault();
    console.log(1);

    const user={
        _email:e.target.Email.value,
        _password:e.target.Password.value
    }

    axios
    .post("http://localhost:3001/sign/post/login",user)
    .then(res=>{alert('login succesfully')
        console.log('data added')
        localStorage.setItem('token',res.data.token)
        window.location.href="http://127.0.0.1:5501/expenseTracker.html"
    }
       )
    .catch(err=>{console.log(err);
    document.body.innerHTML+=(err.message)})
}

//alert('Login Successfully')