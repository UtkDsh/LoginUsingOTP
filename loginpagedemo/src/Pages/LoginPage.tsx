import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./loginpage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  
  const [isvalidEmail, setIsValidEmail] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const loginUser = (emailId: String) => {
    const systemUser = { email: emailId };

    axios
      .post(`http://localhost:8080/user/loginuser`, systemUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setOtpSent(true);
          if (email != "") localStorage.setItem("email", email);
          navigate("/otppage");
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          console.log(error);
          setIsValidEmail(false);
          setOtpSent(false);
          setEmail("");
        }
      });
  };

  return (
    <>
      <div className="lgpage">
        <div className="loginheading">
          <p>Welcome to Demo</p>
        </div>
        <form>
          <div className="loginBox">
            <div className="lg ">
              <h2 className="loginhead">Login</h2>
            </div>
            <div className="entermail box-element">
              <p className="email-desc">Enter Email:</p>
              <input
                className="email-box "
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email Id"
              ></input>
              {!isvalidEmail && (
                <p className="invalid-email">! Enter valid Email Id</p>
              )}

              {otpSent && (
                <p className="otp-generated-msg">! OTP Sent Successfully</p>
              )}
            </div>

            <div className="getotp box-element">
              <Button
                className="submit-button"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  loginUser(email);
                }}
                variant="secondary"
              >
                Get OTP
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
