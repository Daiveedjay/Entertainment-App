import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  where,
  query,
  getDocs,
} from "firebase/firestore";

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

  const bookmarkMedia = async (dataID, uid) => {
    dispatch({ type: "IS_PENDING" });
    try {
      // Check for existing bookmark
      const existingBookmarkQuery = query(
        ref,
        where("uid", "==", uid),
        where("dataID", "==", dataID)
      );
      const existingBookmarkSnapshot = await getDocs(existingBookmarkQuery);

      if (existingBookmarkSnapshot.empty) {
        // Add document if the bookmark doesn't exist
        const addedDocument = await addDoc(ref, { dataID, uid });
        dispatchIfNotCancelled({
          type: "ADDED_DOCUMENT",
          payload: addedDocument,
        });
      } else {
        dispatchIfNotCancelled({
          type: "ERROR",
          payload: "Bookmark already exists",
        });
      }
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

  return { addDocument, deleteDocument, bookmarkMedia, response };
};
