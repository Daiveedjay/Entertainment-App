import Search from "../../components/Search";
import "./Home.css";
import data from "../../data.json";
import bookmarkIcon from "../../../public/icon-bookmark-empty.svg";
import movieIcon from "../../../public/icon-nav-movies-light.svg";
import seriesIcon from "../../../public/icon-nav-tv-series-light.svg";
import playIcon from "../../../public/icon-play.svg";
import { useState } from "react";

// import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const [showMore, setShowMore] = useState(false);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const addBookmark = async (dataItem) => {
    setTitle(dataItem.title);
    setThumbnail(dataItem.thumbnail[0]);
    setCategory(dataItem.category);
    setYear(dataItem.year);
    setRating(dataItem.rating);

    console.log("Title:", title);
    console.log("Thumbnail:", thumbnail);
    console.log("Category:", category);
    console.log("Year:", year);
    console.log("Rating:", rating);
  };

  return (
    <div>
      <Search />
      <section className="trending__section section--spacing">
        <div className="header--spacing">
          <h2 className=" large--text">Trending</h2>
          <h2 className="large--text display--name">
            What&apos;s good, Daiveed ?
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
                    src={dataItem.thumbnail[0]}
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
                    <img className="bookmark__icon" src={bookmarkIcon} alt="" />
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
