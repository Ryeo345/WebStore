import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/users";
import { TextField, Button, Input } from "@mui/material";

const UserUpdateForm = () => {
  const { auth } = useSelector((state) => state);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(auth.firstName);
    setLastName(auth.lastName);
    setEmail(auth.email);
    setImageUrl(auth.imageUrl);
  }, [auth]);

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      console.log(ev.target.files);
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setImageUrl(reader.result);
        auth.imageUrl = reader.result;
      });
    });
  }, [ref]);

  const updateForm = async (ev) => {
    ev.preventDefault();
    const { id } = auth;
    await dispatch(
      updateUser({ id, firstName, lastName, email, imageUrl, isAdmin })
    );
  };

  return (
    <div id="update-form-container">
      <div id="updateForm">
        <img src={auth.imageUrl} className="profile_pic" />
        <div className="admin-title" style={{ marginBottom: "1em" }}>
          Edit Profile
        </div>
        <form onSubmit={updateForm}>
          <TextField
            required
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
          />
          <TextField
            required
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
          />
          <TextField
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Input type="file" ref={ref} />
          {!!imageUrl && (
            <img
              src={imageUrl}
              style={{
                width: "100px",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
              }}
            />
          )}
          {auth.isAdmin ? (
            <div>
              <label>Assign Admin Status:</label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
            </div>
          ) : null}

          <Button
            type="submit"
            variant="contained"
            disabled={!firstName || !lastName || !email}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateForm;
