var form=document.getElementById('form_id');
console.log(1);
form.addEventListener('submit',changeData);

async function changeData(e){
    try{

        const user={
            _Email:e.target.Email.value,
            _Password:e.target.Password.value
        }

await axios.post("http://localhost:3001/reset/post",user)

alert('password change successfully');
    }

    catch(err){
        console.log(err);
    }


}