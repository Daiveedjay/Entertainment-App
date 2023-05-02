// import { auth } from "../firebase/config";
// import { signOut } from "firebase/auth";
// import { useAuthContext } from "./useAuthContext";
// import { useState } from "react";

// export const useLogout = () => {
//   const [isCancelled, setIsCancelled] = useState(false);
//   const { dispatch } = useAuthContext();
//   const logout = () => {
//     signOut(auth)
//       .then(() => {
//         dispatch({ type: "LOGOUT" });
//         console.log("user signed out");
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   return { logout };
// };

import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      console.log("user signed out");
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
