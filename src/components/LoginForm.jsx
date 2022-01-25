import React from "react";
import "./../assets/css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGooglePlusSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate  } from "react-router-dom";

const LoginForm = () => { 
  const navigate = useNavigate ();
  const handleClick = () => navigate('/payment');
  
  return (
    <div id="loginform">
      <FormHeader title="Sign in to your account" />
      <div>
        <FormInput
          description="Email address"
          placeholder="Enter your email"
          type="text"
        />
        <FormInput
          description="Password"
          placeholder="Enter your password"
          type="password"
        />
        <div className="row remember-me">
          <input type="checkbox" id="rememberMe" name="rememberMe"></input>
          <label htmlFor="rememberMe">Remember Me</label>
          <span className="gap"></span>
          <a href="/forgetyourpassword">Forget your password?</a>
        </div>

        <div id="button" className="row">
          <button
            onClick={handleClick}
          >
            Sign in
          </button>
        </div>
      </div>
      <OtherMethods />
    </div>
  );
};

const FormHeader = (props) => (
  <div id="headerTitle">
    <h2>{props.title}</h2>
    <p>
      Or{" "}
      <a href="www.google.com" target="_blank">
        Start your 14-day free trial
      </a>
    </p>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} />
  </div>
);

const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or continue with</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);

const Facebook = (props) => (
  <a href="/login" className="social-media">
    <FontAwesomeIcon size="2x" icon={faFacebookSquare} />
  </a>
);

const Twitter = (props) => (
  <a href="/login" className="social-media">
    <FontAwesomeIcon size="2x" icon={faTwitterSquare} />
  </a>
);

const Google = (props) => (
  <a href="/login" className="social-media">
    <FontAwesomeIcon size="2x" icon={faGooglePlusSquare} />
  </a>
);

export default LoginForm;
