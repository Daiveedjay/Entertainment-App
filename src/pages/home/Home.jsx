import Search from "../../components/Search";
import "./Home.css";
import data from "../../data.json";
import bookmarkIcon from "../../../public/icon-bookmark-empty.svg";
import bookmarkDone from "../../../public/icon-bookmark-full.svg";
import movieIcon from "../../../public/icon-nav-movies-light.svg";
import seriesIcon from "../../../public/icon-nav-tv-series-light.svg";
import playIcon from "../../../public/icon-play.svg";
import { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function Home() {
  const { bookmarkMedia, response } = useFirestore("bookmarks");

  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  const [showMore, setShowMore] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchBookmarks = async () => {
        const bookmarksQuery = query(
          collection(db, "bookmarks"),
          where("uid", "==", user.uid)
          // where("dataID", "==", dataID)
        );

        const bookmarksSnapshot = await getDocs(bookmarksQuery);

        const existingBookmarks = bookmarksSnapshot.docs.map((doc) => {
          console.log(doc);
          return { ...doc.data() };
        });
        console.log(existingBookmarks);
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

      console.log(dataID);

      await bookmarkMedia(dataID, user.uid);
      setBookmarkedItems([...bookmarkedItems, dataItem.id]);

      setBookmarkedItems((prevBookmark) => [...prevBookmark, bookmarkedItems]);
    }
  };

  console.log(response);

  return (
    <div>
      <Search />
      <section className="trending__section section--spacing">
        <div className="header--spacing">
          <h2 className=" large--text">Trending</h2>
          <h2 className="large--text display--name">
            What&apos;s good, {user.displayName} ?
          </h2>
        </div>

        <div className="trending__slider">
          {data &&
            data
              .filter((dataItem) => dataItem.isTrending)
              .map((dataItem, index) => (
                <div className="slider__item" key={index}>
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
                  </div>
                  <div
                    className="bookmark__icon--container"
                    onClick={() => addBookmark(dataItem)}
                  >
                    <img
                      className="bookmark__icon"
                      src={
                        bookmarkedItems.includes(bookmarkedItems.dataID)
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
                </div>
              ))}
        </div>
      </section>
      <section className="recommended__section section--spacing">
        <h2 className=" large--text">Recommended for you</h2>

        <div className="utility__items--container">
          {data &&
            data
              .filter((dataItem) => dataItem.isTrending === false)
              .filter((_, index) => showMore || index < 12)
              .map((dataItem, index) => (
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
                          dataItem.category === "Movie" ? movieIcon : seriesIcon
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
                    onClick={() => addBookmark(dataItem)}
                  >
                    <img className="bookmark__icon" src={bookmarkIcon} alt="" />
                  </div>
                </div>
              ))}
          <button onClick={() => setShowMore(!showMore)} className="show--more">
            {showMore ? "See Less" : "See More"}
          </button>
        </div>
      </section>
    </div>
  );
}
