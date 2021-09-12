import { useState ,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = ({history}) => {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Type_of_user, setTypeofuser] = useState("");
  const [username_emailid, setUsernameemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);
  const [error, setError] = useState("");
  const registerHandler = async (e) => {
    e.preventDefault();
    const config = { Header: { "Content-Type": "application/json" }, };
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmpassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password does not match");
    }
    try {
      const {data}=await axios.post("/api/auth/register",{
        Firstname,Lastname,Type_of_user,username_emailid,password
      },config);
      localStorage.setItem("authToken",data.token)
    history.push("/")
    } catch (error) {
     setError(error.response.data.error) 
     setTimeout(()=>{
setError("")
     },5000)
    }
  };
  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title ">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            required
            id="firstname"
            placeholder="Enter your First Name"
            value={Firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            required
            id="lastname"
            placeholder="Enter your Last Name"
            value={Lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeofuser">Type Of user</label>
          <input
            type="text"
            required
            id="typeofuser"
            placeholder="Enter your role"
            value={Type_of_user}
            onChange={(e) => {
              setTypeofuser(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            required
            id="username"
            placeholder="Enter your username"
            value={username_emailid}
            onChange={(e) => {
              setUsernameemail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            required
            id="cpassword"
            placeholder="confirm  your password"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmpassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <span className="register-screen__subtext">
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
export default RegisterScreen;
