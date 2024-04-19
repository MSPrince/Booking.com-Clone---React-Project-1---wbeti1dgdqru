import React, { useContext, useRef, useState } from "react";
import "./RegisterForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";

export const RegisterForm = ({ state }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigateTo = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const createUser = async (user) => {
    const config = {
      headers: {
        projectID: "f104bi07c490",
      },
    };
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        user,
        config
      );
      console.log(res);
      const token = res.data.token;
      console.log(token);
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem(
          "loginUserDetails",
          JSON.stringify(res.data.data.user)
        );
        setIsLoggedIn(true);

        navigateTo("/");
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.response.data.message);
    }
  };

  function handleRegisterForm(e) {
    e.preventDefault();

    // ALL FIELD MUST BE FILLED
    for (let key in userInfo) {
      if (userInfo[key] === "") {
        setErrorMessage("All fields must be filled");
        return; // it will return to handleRegisteration form
      }
    }

    const userDetails = {
      name: userInfo.firstname.toUpperCase(),
      email: userInfo.email,
      password: userInfo.password,
      appType: "bookingportals",
    };
    console.log("userDetails", userDetails);
    createUser(userDetails);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;
    if (name == "firstname" || name == "lastname") {
      if (regex.test(value)) {
        return;
      }
    }
    setUserInfo({ ...userInfo, [name]: value });
    setErrorMessage(null);
  }

  return (
    <div className="parent-container">
      <div className="child-container register-form-content">
        <form action="" className="register-form" onSubmit={handleRegisterForm}>
          <h2>Sign in or create an account</h2>

          {errorMessage && (
            <div>
              <p className="error-message">{errorMessage}</p>
            </div>
          )}
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={userInfo.firstname}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={userInfo.lastname}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <input type="submit" value="Sign Up" />
          </div>

          <div>
            <p>
              Already have an account? <NavLink to="/login">Login now</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
