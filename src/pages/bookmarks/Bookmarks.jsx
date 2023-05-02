import Search from "../../components/Search";
import "./Bookmarks.css";
// import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

import movieIcon from "../../../public/icon-nav-movies-light.svg";
import seriesIcon from "../../../public/icon-nav-tv-series-light.svg";
import playIcon from "../../../public/icon-play.svg";
import bookmarkIcon from "../../../public/icon-bookmark-full.svg";

export default function Bookmarks() {
  // const { user } = useAuthContext();
  const { deleteDocument } = useFirestore("bookmarks");
  const { documents, error } = useCollection("bookmarks");
  return (
    <div>
      <Search />
      {/* {!documents && documents.length > 0 && <div>No Bookmarks to display</div>} */}
      {documents &&
        documents.filter((document) => document.category === "Movie").length >
          0 && (
          <div className="large--text header--spacing">Bookmarked Movies</div>
        )}
      {error && <div>{error}</div>}
      <div className="bookmarks__items--container">
        {documents &&
          documents
            .filter((document) => document.category === "Movie")
            .map((document) => (
              <div className="utility__item" key={document.id}>
                <div className="utility__image--container">
                  <img
                    className="utility__image"
                    src={document.imageURL}
                    alt={""}
                  />
                  <div className="play__icon--container">
                    <img className="play__icon" src={playIcon} alt="" />
                    <span>Play</span>
                  </div>
                </div>
                <div className="utility__item--details">
                  <span>{document.year}</span>
                  <span>
                    <img
                      src={
                        document.category === "Movie" ? movieIcon : seriesIcon
                      }
                      alt=""
                    />
                    {document.category}
                  </span>
                  <span>{document.rating}</span>
                </div>
                <div className="utility__item--title small--text">
                  {document.title}
                </div>
                <div
                  onClick={() => deleteDocument(document.id)}
                  className="bookmark__icon--container"
                >
                  <img className="bookmark__icon" src={bookmarkIcon} alt="" />
                </div>
              </div>
            ))}
      </div>
      {documents &&
        documents.filter((document) => document.category === "TV Series")
          .length > 0 && (
          <div className="large--text header--spacing">
            Bookmarked TV series
          </div>
        )}

      <div className="bookmarks__items--container">
        {documents &&
          documents
            .filter((document) => document.category === "TV Series")
            .map((document) => (
              <div className="utility__item" key={document.id}>
                <div className="utility__image--container">
                  <img
                    className="utility__image"
                    src={document.imageURL}
                    alt={""}
                  />
                  <div className="play__icon--container">
                    <img className="play__icon" src={playIcon} alt="" />
                    <span>Play</span>
                  </div>
                </div>
                <div className="utility__item--details">
                  <span>{document.year}</span>
                  <span>
                    <img
                      src={
                        document.category === "Movie" ? movieIcon : seriesIcon
                      }
                      alt=""
                    />
                    {document.category}
                  </span>
                  <span>{document.rating}</span>
                </div>
                <div className="utility__item--title small--text">
                  {document.title}
                </div>
                <div
                  onClick={() => deleteDocument(document.id)}
                  className="bookmark__icon--container"
                >
                  <img className="bookmark__icon" src={bookmarkIcon} alt="" />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
