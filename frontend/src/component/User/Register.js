import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layout/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { IoMdMail } from "react-icons/io";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./Register.css"
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const styled = {
  margin: 0,
  fontSize: "small",
  color: "red",
};

const Register = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const registerTab = useRef(null);

  const [user, setUser] = useState({
    first_name: "",
    last_name:"",
    email: "",
    password: "",
  });
  const { first_name,last_name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

   const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("first_name", first_name);
    myForm.set("last_name",last_name);
    myForm.set("email", email);
    myForm.set("password", password);
    
    myForm.set("avatar", avatar);
   
    console.log("signup form submitted")
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/all";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const [showpassword, setShowPassword] = useState(false);

  const [errors, seterrors] = useState({
    errFirstname: "", errLastname: "", errEmail: "", errPassword: "",
    errConfirm_password: "", pass: null, submit_error: ''
});
const [data, setdata] = useState({
    first_name: "", last_name: "", email: "", password: "", confirm_password: "", 
    showpassword: false, showconfirmpassword: false,profile:""
});
// For Validation
const handler = (event) => {
  const { name, value } = event.target;
  let error = ''
  switch (name) {
    case "first_name":
      error = regForName.test(value) ? "" : "Invalid first Name";
      seterrors({ ...errors, errFirstname: error });
      break;

    case "last_name":
      error = regForName.test(value) ? "" : "Invalid last Name";
      seterrors({ ...errors, errLastname: error });
      break;

    case "email":
      error = regForEmail.test(value) ? "" : "Invalid Email";
      seterrors({ ...errors, errEmail: error });
      break;

    case "password":
      error = regForpassword.test(value) ? "" : "Enter Strong Password";
      seterrors({ ...errors, errPassword: error, pass: value });
      break;

    case "confirm_password":
      error = value === errors.pass ? "" : "Password does not match";
      seterrors({ ...errors, errConfirm_password: error });
      break;
  }
  console.log(errors);
  setdata({ ...data, [name]: value })
}
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <div className="registerpa" style={{width:"100vw",height:"100vh",maxWidth:"100%",backgroundColor:"white",position:"fixed",top:"0%"}}>
          <Container style={{backgroundColor:"white"}}>
            <Form
              className="registration"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <hr />
              <h3>Register to Project Management</h3>
              {errors.submit_error.length != 0 &&
            <alert severity="error">{errors.submit_error}</alert>}
              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="first_name"
                    required
                    name="first_name"
                    value={first_name}
                    onChange={registerDataChange}
                    onBlur={handler}
                    style={{marginTop:"10px"}}
                  />
                 
                </InputGroup>
                <p style={styled}>{errors.errFirstname}</p>
              </Form.Group>
             

              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="last_name"
                    required
                    name="last_name"
                    value={last_name}
                    onChange={registerDataChange}
                    onBlur={handler}
                    style={{marginTop:"10px"}}
                  />
                 
                </InputGroup>
                <p style={styled}>{errors.errLastname}</p>
              </Form.Group>
              

              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    onBlur={handler}
                    style={{marginTop:"10px"}}
                  />
                  <IoMdMail className="iconlogin" />

                </InputGroup>
                <p style={styled}>{errors.errEmail}</p>
              </Form.Group>
              <Form.Group>
                <InputGroup>
                  <FormControl
                    placeholder="Password"
                    type={showpassword ? "text" : "password"}
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    onBlur={handler}
                    style={{marginTop:"10px"}}
                  />
                  {showpassword ? (
                    <BsEyeFill
                      className="iconlogin"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <BsEyeSlashFill
                      className="iconlogin"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </InputGroup>
                <p style={styled}>
              {errors.errPassword}
            </p>
              </Form.Group>

          <Form.Group>
            <InputGroup>
              <FormControl
                type={data.showconfirmpassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirm_password"
                onBlur={handler}
                style={{marginTop:"10px"}}
              />
              {data.showconfirmpassword ? (
                <BsEyeFill
                  className="iconlogin"
                  onClick={() => setdata({ ...data, showconfirmpassword: false })}
                />
              ) : (
                <BsEyeSlashFill
                  className="iconlogin"
                  onClick={() => setdata({ ...data, showconfirmpassword: true })}
                />
              )}
            </InputGroup>
            <p style={styled}> {errors.errConfirm_password}</p>
          </Form.Group>


             
             

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview"  style={{marginTop:"10px",height:"200px"}}/>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                  onBlur={handler}
                  style={{marginTop:"10px"}}
                />
              </div>

              <Button type="submit">Register</Button>
            </Form>
            <p className="w-100 text-start">
                <span style={{ cursor: "pointer" }}>
                  <Link to="/login">Login</Link>
                </span>
            </p>
          </Container>
        </div>
        </>
      )}
    </>
  );
};

export default Register;
