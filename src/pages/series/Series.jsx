/* eslint-disable react-refresh/only-export-components */
import Search from "../../components/Search";

import data from "../../data.json";
import bookmarkIcon from "../../assests/icon-bookmark-empty.svg";
import movieIcon from "../../assests/icon-nav-movies-light-theme.svg";
import seriesIcon from "../../assests/icon-nav-tv-series-light-theme.svg";
import bookmarkDone from "../../assests/icon-bookmark-full.svg";
import playIcon from "../../assests/icon-play.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { NavLink } from "react-router-dom";
import withPageTransition from "../../context/withPageTransitions";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSearch } from "../../hooks/useSearch";

import AnimationContainer from "../../components/AnimationContainer";
import AnimationItem from "../../components/AnimationItem";

function Series() {
  const [clearError, setClearError] = useState(false);
  const { searchFunc, filteredData, error } = useSearch();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = async (results) => {
    setSearchResults(results);
    searchFunc(results);

    setTimeout(() => {
      setClearError(true);
    }, 2000);

    if (error) {
      setClearError(false);
    }
  };
  const { bookmarkMedia, deleteBookmark } = useFirestore("bookmarks");

  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  const [textBoxMessage, setTextBoxMessage] = useState("");
  const [textBoxVisible, setTextBoxVisible] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchBookmarks = async () => {
        const bookmarksQuery = query(
          collection(db, "bookmarks"),
          where("uid", "==", user.uid)
        );

        const bookmarksSnapshot = await getDocs(bookmarksQuery);

        const existingBookmarks = bookmarksSnapshot.docs.map((doc) => {
          return { ...doc.data() };
        });

        setBookmarkedItems(
          existingBookmarks.map((bookmark) => bookmark.dataID)
        );
      };

      fetchBookmarks();
    }
  }, [user]);

  const addBookmark = async (dataItem) => {
    if (!bookmarkedItems.includes(dataItem.id)) {
      const dataID = dataItem.id;
      const dataCategory = dataItem.category;

      await bookmarkMedia(dataID, dataCategory, user.uid);
      setBookmarkedItems([...bookmarkedItems, dataItem.id]);

      setBookmarkedItems((prevBookmark) => [...prevBookmark, bookmarkedItems]);

      setTextBoxMessage(`${dataItem.title} was added to your bookmarks.`);
      setTextBoxVisible(true);
      setTimeout(() => {
        setTextBoxVisible(false);
      }, 3000);
    }
  };

  const removeBookmark = async (dataID) => {
    const dataItem = data.find((item) => item.id === dataID);
    await deleteBookmark(dataID);
    setBookmarkedItems(bookmarkedItems.filter((id) => id !== dataID));

    if (dataItem) {
      setTextBoxMessage(`${dataItem.title} was removed from your bookmarks.`);
      setTextBoxVisible(true);
      setTimeout(() => {
        setTextBoxVisible(false);
      }, 4000);
    }
  };
  return (
    <div>
      <Search onSearchResults={handleSearchResults} />
      {textBoxVisible && (
        <div className="bookmark--message">{textBoxMessage}</div>
      )}
      {searchResults.length > 0 && !error && (
        <div className="search--results">
          Your search for <span>{searchResults}</span> came back with{" "}
          <span>
            {
              filteredData.filter((data) => data.category === "TV Series")
                .length
            }{" "}
          </span>
          {""}
          Series
        </div>
      )}

      {filteredData.length === 0 && error && !clearError && (
        <div className="search--error">{error.message}</div>
      )}
      {filteredData.length > 0 && (
        <NavLink className="search--home" to="/movies">
          Go back
        </NavLink>
      )}
      {filteredData && filteredData.length > 0 ? (
        <AnimationContainer>
          <div className="utility__items--container">
            {filteredData
              .filter((data) => data.category === "TV Series")
              .map((data, index) => (
                <AnimationItem key={index}>
                  <div className="utility__item" key={data.id}>
                    <div className="utility__image--container">
                      <img
                        className="utility__image"
                        src={data.thumbnail[1]}
                        alt={data.title}
                      />
                      <div className="play__icon--container">
                        <img className="play__icon" src={playIcon} alt="" />
                        <span>Play</span>
                      </div>
                    </div>
                    <div className="utility__item--details">
                      <span>{data.year}</span>
                      <span>
                        <img src={movieIcon} alt="" />
                        {data.category}
                      </span>
                      <span>{data.rating}</span>
                    </div>
                    <div className="utility__item--title small--text">
                      {data.title}
                    </div>

                    <div
                      className="bookmark__icon--container"
                      onClick={() => {
                        if (bookmarkedItems.includes(data.id)) {
                          removeBookmark(data.id);
                        } else {
                          addBookmark(data);
                        }
                      }}
                    >
                      <img
                        className="bookmark__icon"
                        src={
                          bookmarkedItems.includes(data.id)
                            ? bookmarkDone
                            : bookmarkIcon
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </AnimationItem>
              ))}
          </div>
        </AnimationContainer>
      ) : (
        <section className="series__section section--spacing">
          <div className=" header--spacing header--alignment">
            <h2 className=" large--text">Tv Series</h2>
            <div className="display__info--container">
              <h2 className="display--name">
                What&apos;s good, {user.displayName} ?
              </h2>
              <div className="account__image--home">
                <img src={user.photoURL} alt="" />
              </div>
            </div>
          </div>
          <AnimationContainer>
            <div className="utility__items--container">
              {data &&
                data
                  .filter((dataItem) => dataItem.category !== "Movie")

                  .map((dataItem, index) => (
                    <AnimationItem key={index}>
                      <div className="utility__item" key={index}>
                        <div className="utility__image--container">
                          <img
                            className="utility__image"
                            src={dataItem.thumbnail[0]}
                            alt={dataItem.title}
                          />
                          <div className="play__icon--container">
                            <img className="play__icon" src={playIcon} alt="" />
                            <span>Play</span>
                          </div>
                        </div>
                        <div className="utility__item--details">
                          <span>{dataItem.year}</span>
                          <span>
                            <img
                              src={
                                dataItem.category === "Movie"
                                  ? movieIcon
                                  : seriesIcon
                              }
                              alt=""
                            />
                            {dataItem.category}
                          </span>
                          <span>{dataItem.rating}</span>
                        </div>
                        <div className="utility__item--title small--text">
                          {dataItem.title}
                        </div>
                        <div
                          className="bookmark__icon--container"
                          onClick={() => {
                            if (bookmarkedItems.includes(dataItem.id)) {
                              removeBookmark(dataItem.id);
                            } else {
                              addBookmark(dataItem);
                            }
                          }}
                        >
                          <img
                            className="bookmark__icon"
                            src={
                              bookmarkedItems.includes(dataItem.id)
                                ? bookmarkDone
                                : bookmarkIcon
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </AnimationItem>
                  ))}
            </div>
          </AnimationContainer>
        </section>
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withPageTransition(Series);
