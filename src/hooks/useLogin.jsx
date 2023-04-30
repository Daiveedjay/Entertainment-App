import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        console.log("user logged up", res.user);
        return true; // Return true on successful login
      })
      .catch((err) => {
        let customErrorMessage;
        switch (err.code) {
          case "auth/wrong-password":
            customErrorMessage = "The password you entered is incorrect.";
            break;
          case "auth/user-not-found":
            customErrorMessage =
              "There is no user associated with this email address.";
            break;
          default:
            customErrorMessage = err.message;
        }
        setError(customErrorMessage);
        return false; // Return false on failed login
      });
  };

  return { error, login };
};
