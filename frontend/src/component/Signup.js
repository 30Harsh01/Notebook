import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {

  let navigate = useNavigate();

  const [Passimg, setPassimg] = useState({
    type: "password",
    img: "showpass.png"
  })

  const [Credentials, setCredentials] = useState({
    name:"",
    email: "",
    password: "",
    cpassword:""
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
    
    const url = "http://localhost:5000/api/auth/createuser"
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name:Credentials.name, email: Credentials.email, password: Credentials.password })
    })
    const data = await response.json()
    console.log(data)
    if (data.authtoken) {
      console.log("hello")
      localStorage.setItem('token', data.authtoken)
      navigate('/');
      props.showAlert("Succesfully signed","success")
    }else{
      props.showAlert("Invalid Credentials","danger")
    }
  }
  const onchange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="card my-3">
        <h5 className="card-header h4 pb-2 mb-4 text-primary border-bottom border-primary">Signup</h5>
        <div className="card-body">
          <div className='container justify-content-center'>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input minLength={5} type="name" name="name" value={Credentials.name} onChange={onchange} className="form-control" id="name" placeholder="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" value={Credentials.email} onChange={onchange} className="form-control" id="email" placeholder="name@example.com" required/>
                </div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                <div className="input-group mb-3">
                  <input name='password' id='password' value={Credentials.password} minLength={5} onChange={onchange} type={Passimg.type} className="form-control" placeholder="Enter your password" aria-label="Recipient's username" aria-describedby="button-addon2"  required/>
                  <button className="btn btn-outline-secondary" onClick={handlePassword} type="button" id="button-addon2">
                    <img height={25} src={Passimg.img} alt='img not found'></img>
                  </button>
                </div>
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Conform Password</label>
                <div className="input-group mb-3">
                  <input name='cpassword' id='cpassword' value={Credentials.cpassword} minLength={5} onChange={onchange} type='password' className="form-control" placeholder="Enter your password again" aria-label="Recipient's username" aria-describedby="button-addon2" required/>
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


export default Signup
