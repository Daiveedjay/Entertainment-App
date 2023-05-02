// import { useState } from "react";

// import { auth } from "../firebase/config";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useAuthContext } from "./useAuthContext";
// export const useSignup = () => {
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false); // Add isPending state

//   const { dispatch } = useAuthContext();

//   const signup = async (email, password) => {
//     setError(null);

//     return createUserWithEmailAndPassword(auth, email, password)
//       .then((res) => {
//         dispatch({ type: "LOGIN", payload: res.user });
//         console.log("user signed up", res.user);
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   };

//   return { error, signup };
// };

// import { useEffect, useState } from "react";
// import { auth } from "../firebase/config";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, storage } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    console.log("User thumbnail in useSignUp", thumbnail); // Set isPending to true before the asynchronous call

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) throw new Error("Could not sign in user, try again");

      // Upload user thumbnail
      const uploadPath = `userAvatars/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(storage, uploadPath);
      await uploadBytes(storageRef, thumbnail);
      const thumbnailURL = await getDownloadURL(storageRef);

      // await res.user.updateProfile({ displayName });

      // Add display name to user
      // Add display name and thumbnail URL to user
      await updateProfile(res.user, { displayName, photoURL: thumbnailURL });

      dispatch({ type: "LOGIN", payload: res.user });

      console.log("user signed up", res.user);

      if (!isCancelled) {
        setIsPending(false); // Set isPending to false after the asynchronous call completes
        setError(null);
      }
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

  return { error, isPending, signup }; // Return the isPending state
};

// TODO---
// import { useState } from "react";

// import { auth } from "../firebase/config";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useAuthContext } from "./useAuthContext";
// export const useSignup = () => {
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false); // Add isPending state

//   const { dispatch } = useAuthContext();

//   const signup = async (email, password) => {
//     setError(null);

//     return createUserWithEmailAndPassword(auth, email, password)
//       .then((res) => {
//         dispatch({ type: "LOGIN", payload: res.user });
//         console.log("user signed up", res.user);
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   };

//   return { error, signup };
// };

// import { useEffect, useState } from "react";
// import { auth, storage } from "../firebase/config";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { useAuthContext } from "./useAuthContext";

// export const useSignup = () => {
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [isCancelled, setIsCancelled] = useState(false);

//   const { dispatch } = useAuthContext();

//   const signup = async (email, password, displayName, thumbnail) => {
//     setError(null);
//     setIsPending(true);
//     // console.log(thumbnail); // Set isPending to true before the asynchronous call

//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       if (!res) throw new Error("Could not sign in user, try again");

//       //  upload user avatars
//       const uploadPath = `userAvatars/${res.user.uid}/${thumbnail.name}`;

//       const avatarImg = await storage.ref(uploadPath).put(thumbnail);

//       const avatarUrl = await avatarImg.ref.getDownloadURL();

//       // Add display name to user
//       await updateProfile(res.user, { displayName, photoURL: avatarUrl });

//       dispatch({ type: "LOGIN", payload: res.user });

//       console.log("user signed up", res.user);

//       if (!isCancelled) {
//         setIsPending(false); // Set isPending to false after the asynchronous call completes
//         setError(null);
//       }
//     } catch (err) {
//       if (!isCancelled) {
//         console.log(err.message);
//         setError(err.message);
//         setIsPending(false);
//       }
//     }
//   };

//   useEffect(() => {
//     return () => setIsCancelled(true);
//   }, []);

//   return { error, isPending, signup }; // Return the isPending state
// };
