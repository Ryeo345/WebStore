import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserUpdateForm from "./UserUpdateForm";
// import UserPasswordForm from "./UserPasswordForm";
import UserAddressForm from "./UserAddressForm";
import PastOrders from "./PastOrders";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const [profileIsVisible, setProfileIsVisible] = useState(true);
  // const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [addressIsVisible, setAddressIsVisible] = useState(false);
  const [pastOrderIsVisible, setPastOrderIsVisible] = useState(false);

  const forms = ["Profile", "Password", "Address", "Past Orders"];

  const toggleForm = useCallback((form) => {
    if (form === "Profile") {
      setProfileIsVisible(true);
      // setPasswordIsVisible(false);
      setAddressIsVisible(false);
      setPastOrderIsVisible(false);
    // } else if (form === "Password") {
    //   setProfileIsVisible(false);
    //   // setPasswordIsVisible(true);
    //   setAddressIsVisible(false);
    //   setPastOrderIsVisible(false);
    } else if (form === "Address") {
      setProfileIsVisible(false);
      // setPasswordIsVisible(false);
      setAddressIsVisible(true);
      setPastOrderIsVisible(false);
    } else if (form === "Past Orders") {
      setProfileIsVisible(false);
      // setPasswordIsVisible(false);
      setAddressIsVisible(false);
      setPastOrderIsVisible(true);
    }
  }, []);

  return (
    <div style={{ marginTop: "2em" }}>
      <div className="formButtons">
        {forms.map((form) => (
          <button
            onClick={() => {
              toggleForm(form);
            }}
            key={form}
          >
            {form}
          </button>
        ))}
      </div>

      {profileIsVisible && <UserUpdateForm />}
      {/*{passwordIsVisible && <UserPasswordForm />}*/}
      {addressIsVisible && <UserAddressForm />}
      {pastOrderIsVisible && <PastOrders />}
    </div>
  );
};

export default Profile;
