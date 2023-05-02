// import { useReducer, useEffect, useState } from "react";

// import { db } from "../firebase/config";

// let initialState = {
//   document: null,
//   isPending: false,
//   error: null,
//   success: null,
// };

// const firestoreReducer = (state, action) => {
//   switch (action.type) {
//     case "IS_PENDING":
//       return {
//         isPending: true,
//         document: null,
//         success: false,
//         error: null,
//       };
//     case "ADDED_DOCUMENT":
//       return {
//         isPending: false,
//         document: action.payload,
//         success: true,
//         error: null,
//       };
//     case "DELETED_DOCUMENT":
//       return {
//         isPending: false,
//         document: null,
//         success: true,
//         error: null,
//       };
//     case "ERROR":
//       return {
//         isPending: false,
//         document: null,
//         success: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const useFirestore = (collection) => {
//   const [response, dispatch] = useReducer(firestoreReducer, initialState);
//   const [isCancelled, setIsCancelled] = useState(false);
//   // collection ref
//   const ref = db.collection(collection);

//   // Only dispatch if not cancelled
//   const dispatchIfNotCancelled = (action) => {
//     if (!isCancelled) {
//       dispatch(action);
//     }
//   };

//   // Add new document
//   const addDocument = async (doc) => {
//     dispatch({ type: "IS_PENDING" });

//     try {
//       const addedDocument = await ref.add({ ...doc });
//       dispatchIfNotCancelled({
//         type: "ADDED_DOCUMENT",
//         payload: addedDocument,
//       });
//     } catch (error) {
//       dispatchIfNotCancelled({
//         type: "ERROR",
//         payload: error.message,
//       });
//     }
//   };

//   // Delete new document
//   const deleteDocument = async (id) => {
//     dispatch({ type: "IS_PENDING" });

//     try {
//       await ref.doc(id).delete();
//       dispatchIfNotCancelled({
//         type: "DELETED_DOCUMENT",
//       });
//     } catch (error) {
//       dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
//     }
//   };

//   useEffect(() => {
//     return () => {
//       setIsCancelled(true);
//     };
//   }, []);

//   return { addDocument, deleteDocument, response };
// };

// import { useReducer, useEffect, useState } from "react";
// import { db } from "../firebase/config";
// import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
// import {
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import { storage } from "../firebase/config";

// let initialState = {
//   document: null,
//   isPending: false,
//   error: null,
//   success: null,
// };

// const firestoreReducer = (state, action) => {
//   switch (action.type) {
//     case "IS_PENDING":
//       return {
//         isPending: true,
//         document: null,
//         success: false,
//         error: null,
//       };
//     case "ADDED_DOCUMENT":
//       return {
//         isPending: false,
//         document: action.payload,
//         success: true,
//         error: null,
//       };
//     case "DELETED_DOCUMENT":
//       return {
//         isPending: false,
//         document: null,
//         success: true,
//         error: null,
//       };
//     case "ERROR":
//       return {
//         isPending: false,
//         document: null,
//         success: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const useFirestore = (collectionName) => {
//   const [response, dispatch] = useReducer(firestoreReducer, initialState);
//   const [isCancelled, setIsCancelled] = useState(false);
//   // collection ref
//   const ref = collection(db, collectionName);

//   // Only dispatch if not cancelled
//   const dispatchIfNotCancelled = (action) => {
//     if (!isCancelled) {
//       dispatch(action);
//     }
//   };

//   // Add new document
//   const addDocument = async (docData) => {
//     dispatch({ type: "IS_PENDING" });

//     try {
//       const addedDocument = await addDoc(ref, { ...docData });
//       dispatchIfNotCancelled({
//         type: "ADDED_DOCUMENT",
//         payload: addedDocument,
//       });
//     } catch (error) {
//       dispatchIfNotCancelled({
//         type: "ERROR",
//         payload: error.message,
//       });
//     }
//   };

//   // Delete new document
//   const deleteDocument = async (id) => {
//     dispatch({ type: "IS_PENDING" });

//     try {
//       await deleteDoc(doc(ref, id));
//       dispatchIfNotCancelled({
//         type: "DELETED_DOCUMENT",
//       });
//     } catch (error) {
//       dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
//     }
//   };

//   useEffect(() => {
//     return () => {
//       setIsCancelled(true);
//     };
//   }, []);

//   return { addDocument, deleteDocument, response };
// };

import { useReducer, useEffect, useState } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  // collection ref
  const ref = collection(db, collectionName);

  // Only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // Add new document
  const addDocument = async (docData) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await addDoc(ref, { ...docData });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  // Delete new document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(ref, id));
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
    }
  };

  // Add new document with image
  const addDocumentWithImage = async (docData, imageFile) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // Upload image to storage
      const imageRef = storageRef(storage, `bookmarkImages/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);

      // Add document with image URL
      const addedDocument = await addDoc(ref, { ...docData, imageURL });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, addDocumentWithImage, response };
};
