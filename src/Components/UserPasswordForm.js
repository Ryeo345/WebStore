import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/users";
import { TextField, Button } from "@mui/material";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const UserPasswordForm = () => {
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(auth.username);
  }, [auth]);

  const updateForm = async (ev) => {
    ev.preventDefault();
    const { id } = auth;
    const hash = auth.password;
    const isMatch = bcrypt.compareSync(currentPassword, hash);
    try {
      if (!isMatch) {
        setErrorMessage("Current password is incorrect");
        return;
      } else if (newPassword !== confirmPassword) {
        setErrorMessage("New password and confirm password do not match");
        return;
      } else {
        const password = newPassword;
        await dispatch(updateUser({ id, username, password }));
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("Password change successful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="update-form-container">
      <div id="updateForm">
        <div className="admin-title" style={{ marginBottom: "1em" }}>
          Edit Username & Password
        </div>
        <form onSubmit={updateForm}>
          <TextField
            required
            label="Username"
            variant="outlined"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <TextField
            type="password"
            required
            label="Current Password"
            variant="outlined"
            value={currentPassword}
            onChange={(ev) => setCurrentPassword(ev.target.value)}
          />
          <TextField
            type="password"
            required
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={(ev) => setNewPassword(ev.target.value)}
          />
          <TextField
            type="password"
            required
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
          />
          {errorMessage && <div>{errorMessage}</div>}
          <Button
            type="submit"
            variant="contained"
            disabled={
              !username || !currentPassword || !newPassword || !confirmPassword
            }
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserPasswordForm;
