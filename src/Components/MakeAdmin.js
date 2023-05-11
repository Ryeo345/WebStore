import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/users";
import { TextField, Button, Input } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { updateAuth } from "../store";

const MakeAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, auth } = useSelector((state) => state);
  const user = users.find((user) => id === user.id);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [users]);

  const updateAdmin = async (ev) => {
    ev.preventDefault();
    await dispatch(updateUser({ id, isAdmin }));
    //await dispatch(updateUser({id:auth.id,isAdmin:false}))
    navigate("/");
  };

  return (
    <div id="adminForm">
      <form onSubmit={updateAdmin}>
        <TextField
          required
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={firstName}
        />
        <TextField
          required
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={lastName}
        />
        {auth.isAdmin ? (
          <div>
            <label>Make the user admin:</label>
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
          disabled={!firstName || !lastName}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default MakeAdmin;
