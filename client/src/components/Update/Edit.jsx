import React, { useState, useEffect } from "react";
import "./Edit.css";
import { Link, useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Edit = () => {
  const {id} = useParams();
  const users = {
    fname  : "",
    lname : "",
    email : ""
  }

  const inputChangeHandler = (e)=>{
    const {name, value} = e.target;
    setUser({...user,[name]:value});
    console.log(user)
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
        setUser(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[id]);
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  const submitForm = async(e)=>{
    e.preventDefault();
   await axios.put(`http://localhost:8000/api/update/${id}`,user)
   .then((response)=>{
    toast.success(response.data.msg, {position:"top-right"})
    navigate("/");
   }).catch((error)=>{
    console.log(error)
   })

  }
  return (
    <div>
      <div className="addUser">
        <Link to={"/"}> Back to Home </Link>
        <h3> Update User</h3>
        <form className="addUserForm" action="" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"  value={user.fname}
              id="fname"
              name="fname" onChange={inputChangeHandler}
              placeholder="first name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text" value={user.lname}
              id="lname" onChange={inputChangeHandler}
              name="lname"
              placeholder="Last name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">First Name</label>
            <input type="email"  value={user.email}onChange={inputChangeHandler} id="email" name="email" placeholder="email" />
          </div>
         

          <div className="inputGroup">
            <button type="submit">UPDATE USER</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
