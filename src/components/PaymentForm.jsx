import React from "react";
import "./../assets/css/payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGooglePlusSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/contractform");

  return (
    <div id="paymentform">
      <div>
        <h2>Card Details</h2>
        <FormInput placeholder="Card Number" type="text" />
        <div class="date-cvc">
            <FormInput placeholder="MM / YY" type="text" />
            <FormInput placeholder="CVC" type="text" />
        </div>
      </div>

      <div>
        <h2>Billing Address</h2>
        <FormSelect placeholder="Country" type="select" />
        <FormInput placeholder="Postal Code" type="text" />
      </div>

      

      <div id="button" className="row">
        <button onClick={handleClick}>Continue</button>
      </div>
    </div>
  );
};

const FormInput = (props) => (
    <div className="row"> 
        <input type={props.type} placeholder={props.placeholder} />
    </div>
);
const FormSelect = (props) => (
    <div className="row"> 
    
        <select placeholder={props.placeholder}>
            <option value="USA">United Stated</option>
            <option value="Canada">Canada</option>
        </select>            
    </div>
);

export default PaymentForm;
