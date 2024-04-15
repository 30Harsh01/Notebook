import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login(props) {

  let navigate=useNavigate();

  const [Passimg, setPassimg] = useState({
    type: "password",
    img: "showpass.png"
  })

   const [Credentials,setCredentials]=useState({
    email:"",
    password:""
})

  const handlePassword = () => {
    console.log("handlepass clicked")
    if (Passimg.type === "password" && Passimg.img === "showpass.png") {
      setPassimg({
        type: "text",
        img: "hidepass.png"
      })
    }
    if (Passimg.type === "text" && Passimg.img === "hidepass.png") {
      setPassimg({
        type: "password",
        img: "showpass.png"
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
      const url = "http://localhost:5000/api/auth/login"
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({email:Credentials.email,password:Credentials.password})
      })
      const data = await response.json()
      console.log(data)
    if(data.authtoken){
      console.log("hello")
      localStorage.setItem('token',data.authtoken)
      props.showAlert("welcome","success")
      navigate('/');
    }
    else{
      props.showAlert("wrong password or email","danger")
      // console.log("getlosat")
    }
  }
  const onchange=(e)=>{
    setCredentials({...Credentials,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="card my-3">
        <h5 className="card-header h4 pb-2 mb-4 text-primary border-bottom border-primary">Login</h5>
        <div className="card-body">
          <div className='container justify-content-center'>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" value={Credentials.email} onChange={onchange} className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                <div className="input-group mb-3">
                  <input name='password' id='password' value={Credentials.password} onChange={onchange} type={Passimg.type} className="form-control" placeholder="Enter your password" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <button className="btn btn-outline-secondary" onClick={handlePassword} type="button" id="button-addon2">
                    <img height={25} src={Passimg.img} alt='img not found'></img>
                  </button>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button className="btn btn-primary me-md-2" type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
