import { useEffect, useState } from "react";
import "./otpverification.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPVerfication = () => {
    
  const [isvalidOtp, setIsValidOTP] = useState(true);
  const [isverified, setIsVerifired] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const navigate = useNavigate();

  const authenticateOTP = (emailId: String, Otp: number) => {
    const user = { email: emailId, otp: Otp };

    axios
      .post(`http://localhost:8080/user/verifyotp`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setIsVerifired(true);
          navigate("/homepage");
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          console.log(error);
          setIsValidOTP(false);
          setOtp("");
        }
      });
  };

  return (
    <>
      <div className="otp-page">
        <div className="welcome otp-form-element">
          <p className="welcome-message">Welcome to Demo</p>
        </div>
        <form>
          <div className="otp-form">
            <div className="otp-heading otp-element">
              <p className="otp-heading-text">Otp Verification</p>
            </div>
            <div className="enter-otp otp-element">
              <p className="enter-otp-text">Enter OTP:</p>
              <input
                type="number"
                className="otp-field"
                maxLength={4}
                minLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              {!isvalidOtp && (
                <p className="invalid-otp-msg">! Enter Valid OTP</p>
              )}
              <br></br>
              {isverified && (
                <p className="verified-user-msg">! Verification Successfull</p>
              )}
            </div>

            <div className="login-button otp-element">
              <Button
                className="submit-button"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  authenticateOTP(email, parseInt(otp) || 0);
                }}
                variant="secondary"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default OTPVerfication;
