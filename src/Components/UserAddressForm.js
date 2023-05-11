import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/users";
import { TextField, Button } from "@mui/material";

const UserAddressForm = () => {
  const { auth } = useSelector((state) => state);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setStreet(auth.street === null ? "" : auth.street);
    setCity(auth.city === null ? "" : auth.city);
    setState(auth.state === null ? "" : auth.state);
    setCountry(auth.country === null ? "" : auth.country);
    setZipCode(auth.zipCode === null ? "" : auth.zipCode);
  }, [auth]);

  const updateForm = async (ev) => {
    ev.preventDefault();
    const { id } = auth;
    await dispatch(updateUser({ id, street, city, state, country, zipCode }));
    auth.street = street;
    auth.city = city;
    auth.state = state;
    auth.country = country;
    auth.zipCode = zipCode;
  };

  return (
    <div id="update-form-container">
      <div id="updateForm">
        <div className="admin-title" style={{ marginBottom: "1em" }}>
          Edit User Address
        </div>
        <form onSubmit={updateForm}>
          <TextField
            required
            label="Street Address"
            variant="outlined"
            value={street}
            onChange={(ev) => setStreet(ev.target.value)}
          />
          <TextField
            required
            label="City"
            variant="outlined"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />
          <TextField
            required
            label="State"
            variant="outlined"
            value={state}
            onChange={(ev) => setState(ev.target.value)}
          />
          <TextField
            required
            label="Country"
            variant="outlined"
            value={country}
            onChange={(ev) => setCountry(ev.target.value)}
          />
          <TextField
            required
            label="Zip Code"
            variant="outlined"
            value={zipCode}
            onChange={(ev) => setZipCode(ev.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!street || !city || !state || !country || !zipCode}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserAddressForm;
