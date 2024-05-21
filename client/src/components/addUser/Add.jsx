import axios from "axios"
import React, { useState } from "react";
import "./Add.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Add = () => {
  const users = { fname: "", lname: "", email: "", password: "" };
  const [user, setUser] = useState(users);
  const navigate = useNavigate()
  const inputHandler = (e) => {
    const { name, value } = e.target;
    // ... spread operator put prev data and append with new data
    setUser({ ...user, [name]: value });
    
  };

  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create",user)
    .then((response)=>{

      toast.success(response.data.msg,{position:"top-right"})
      navigate("/");
    }).catch(error=> console.log(error));
  }
  return (
    <div>
      <div className="addUser">
        <Link to={"/"}> Back to Home </Link>
        <h3> Add New User</h3>
        <form className="addUserForm" action="" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              onChange={inputHandler}
              placeholder="first name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              onChange={inputHandler}
              placeholder="Last name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={inputHandler}
              placeholder="email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={inputHandler}
              placeholder="Password"
            />
          </div>

          <div className="inputGroup">
            <button type="submit">ADD USER</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
