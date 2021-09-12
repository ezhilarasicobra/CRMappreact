import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = () => {
  const [username_emailid, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotpasswordhandler= async(e)=>
  {
    e.preventDefault();
    const config={header:{
      "Content-Type":"application/json",  
    }}

try {
  const {data}= await axios.post("/api/auth/forgotpassword",{username_emailid},config);
  setSuccess(data.data)
} catch (error) {
  setError(error.response.data.error);
  setEmail("");
  setTimeout(()=>{
setError("")
  },5000)
}
  }
  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotpasswordhandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the Email address you register your account with. We
            will sent you reset password confirmation to this email
          </p>   
          <label htmlFor="email">Email_username</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter your username"
            value={username_emailid}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary"> Send Email</button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
