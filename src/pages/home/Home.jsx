/* eslint-disable react-refresh/only-export-components */
import Search from "../../components/Search";
import "./Home.css";
import data from "../../data.json";
import bookmarkIcon from "../../assests/icon-bookmark-empty.svg";
import bookmarkDone from "../../assests/icon-bookmark-full.svg";
import movieIcon from "../../assests/icon-nav-movies-light-theme.svg";
import seriesIcon from "../../assests/icon-nav-tv-series-light-theme.svg";
import playIcon from "../../assests/icon-play.svg";
import { useState, useEffect } from "react";
import withPageTransition from "../../context/withPageTransitions";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import { useSearch } from "../../hooks/useSearch";
import { NavLink } from "react-router-dom";
import AnimationContainer from "../../components/AnimationContainer";
import AnimationItem from "../../components/AnimationItem";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
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

  const [showMore, setShowMore] = useState(false);

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
  const slideIn = {
    hidden: { x: 100, opacity: 0 },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div>
      <Search onSearchResults={handleSearchResults} />
      <AnimatePresence>
        {
          <motion.div
            className="bookmark--message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, bounce: 2 }}
          >
            {textBoxMessage}
          </motion.div>
        }
      </AnimatePresence>
      {searchResults.length > 0 && !error && (
        <div className="search--results">
          Your search for <span>{searchResults}</span> came back with a total of{" "}
          <span> {filteredData.length}</span> result
          {filteredData.length > 1 ? "s" : ""}:{" "}
          <span>
            {" "}
            {filteredData.filter((data) => data.category === "Movie").length}
          </span>{" "}
          Movie{filteredData.length > 1 ? "s" : ""} and{" "}
          <span>
            {
              filteredData.filter((data) => data.category === "TV Series")
                .length
            }
          </span>{" "}
          Series
        </div>
      )}

      {filteredData.length === 0 && error && !clearError && (
        <div className="search--error">{error.message}</div>
      )}
      {filteredData.length > 0 && (
        <NavLink className="search--home" to="/">
          Go back
        </NavLink>
      )}
      {filteredData && filteredData.length > 0 ? (
        <AnimationContainer>
          <div className="utility__items--container">
            {filteredData.map((data) => (
              <AnimationItem key={data.id}>
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
                      <img
                        src={data.category === "Movie" ? movieIcon : seriesIcon}
                        alt=""
                      />
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
        <>
          <section className="trending__section section--spacing">
            <div className="header--alignment header--spacing">
              <h2 className=" large--text">Trending</h2>
              <div className="display__info--container">
                <h2 className="display--name">
                  What&apos;s good, {user.displayName} ?
                </h2>
                <div className="account__image--home">
                  <img src={user.photoURL} alt="" />
                </div>
              </div>
            </div>

            <div className="trending__slider">
              {data &&
                data
                  .filter((dataItem) => dataItem.isTrending)
                  .map((dataItem, index) => (
                    <motion.div
                      className="slider__item"
                      key={index}
                      initial="hidden"
                      custom={index}
                      animate="visible"
                      variants={slideIn}
                    >
                      <img
                        className="slider--image"
                        src={dataItem.thumbnail[1]}
                        alt=""
                      />
                      <div className="slider__details__container">
                        <div className="slider__details">
                          <p className="slider__year">{dataItem.year}</p>
                          <div className="slider__category">
                            <img
                              src={
                                dataItem.category === "Movie"
                                  ? movieIcon
                                  : seriesIcon
                              }
                              alt=""
                            />
                            <p>{dataItem.category}</p>
                          </div>

                          <p className="slider__rating">{dataItem.rating}</p>
                        </div>
                        <h2 className="medium--text">{dataItem.title}</h2>
                        <p className="slider__rating tablet--rating">
                          {dataItem.rating}
                        </p>
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

                      <div className="play__icon--container">
                        <img className="play__icon" src={playIcon} alt="" />
                        <span>Play</span>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </section>
          <section className="recommended__section section--spacing">
            <h2 className=" large--text">Recommended for you</h2>

            <AnimationContainer>
              <div className="utility__items--container">
                {data &&
                  data
                    .filter((dataItem) => dataItem.isTrending === false)
                    .filter((_, index) => showMore || index < 12)
                    .map((dataItem, index) => (
                      <AnimationItem key={index}>
                        <div className="utility__item" key={index}>
                          <div className="utility__image--container">
                            <img
                              className="utility__image"
                              src={dataItem.thumbnail[1]}
                              alt={dataItem.title}
                            />
                            <div className="play__icon--container">
                              <img
                                className="play__icon"
                                src={playIcon}
                                alt=""
                              />
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
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="show--more"
                >
                  {showMore ? "See Less" : "See More"}
                </button>
              </div>
            </AnimationContainer>
          </section>
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withPageTransition(Home);
