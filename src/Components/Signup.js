import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { attemptLogin, createUser } from "../store";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const credentials = {
    username: username,
    password: password,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (ev) => {
    ev.preventDefault();
    await dispatch(
      createUser({ firstName, lastName, email, username, password })
    );
    dispatch(attemptLogin(credentials));
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    navigate("/menu");
  };

  return (
    <div id="detail-content">
      <div id="signup-outer-body">
        <div id="detail-inner-body">
          <div id="detail-create-account">Create New Account</div>
          <div id="signup-container">
            <div id="signup-info-container">
              <TextField
                required
                label="First Name"
                variant="outlined"
                style={{ width: "100%", marginBottom: "1em" }}
                value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)}
              />

              <TextField
                required
                label="Last Name"
                variant="outlined"
                style={{ width: "100%", marginBottom: "1em" }}
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
              />

              <TextField
                required
                label="Email"
                variant="outlined"
                style={{ width: "100%" }}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>

            <div id="signup-password-container">
              <div id="signup-password">
                <TextField
                  required
                  label="Username"
                  variant="outlined"
                  style={{ width: "100%", marginBottom: "1em" }}
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                />

                <TextField
                  type="password"
                  required
                  label="Password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
            </div>
          </div>
          <div id="submit-container">
            <Link>
              <button onClick={create} id="submit-button">
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
