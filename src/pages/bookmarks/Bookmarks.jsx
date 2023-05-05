import Search from "../../components/Search";
import "./Bookmarks.css";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import bookmarkData from "../../data.json";
import movieIcon from "../../assests/icon-nav-movies-light.svg";
import seriesIcon from "../../assests/icon-nav-tv-series-light.svg";
import playIcon from "../../assests/icon-play.svg";
import bookmarkIcon from "../../assests/icon-bookmark-full.svg";

export default function Bookmarks() {
  const { deleteBookmark } = useFirestore("bookmarks");
  const { documents, error } = useCollection("bookmarks");
  const tvSeriesData = bookmarkData.filter(
    (media) => media.category === "TV Series"
  );

  const movieData = bookmarkData.filter((media) => media.category === "Movie");

  const hasTVSeries =
    documents &&
    documents.some((doc) => {
      const media = bookmarkData.find((m) => m.id == doc.dataID);
      return media && media.category === "TV Series";
    });
  const hasMovie =
    documents &&
    documents.some((doc) => {
      const media = bookmarkData.find((m) => m.id == doc.dataID);
      return media && media.category === "Movie";
    });

  return (
    <div>
      <Search />

      {error && <div>{error}</div>}
      {/* TODO */}
      {!hasMovie && !hasTVSeries && (
        <div className="large--text header--spacing">No Bookmarks yet...</div>
      )}
      {hasMovie && <div className="large--text header--spacing">Movies</div>}
      <div className="bookmarks__items--container">
        {documents &&
          documents.map((document) => {
            const foundDocument = movieData.find(
              (media) => media.id == document.dataID
            );

            if (!foundDocument) {
              return null;
            }

            document = foundDocument;

            return (
              <div className="utility__item" key={document.title}>
                <div className="utility__image--container">
                  <img
                    className="utility__image"
                    src={document.thumbnail[1]}
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
                  onClick={() => deleteBookmark(document.id)}
                  className="bookmark__icon--container"
                >
                  <img className="bookmark__icon" src={bookmarkIcon} alt="" />
                </div>
              </div>
            );
          })}
      </div>
      {hasTVSeries && (
        <div className="large--text header--spacing">TV Series</div>
      )}

      <div className="bookmarks__items--container">
        {documents &&
          documents.map((document) => {
            const foundDocument = tvSeriesData.find(
              (media) => media.id == document.dataID
            );

            if (!foundDocument) {
              return null;
            }

            document = foundDocument;

            return (
              <div className="utility__item" key={document.title}>
                <div className="utility__image--container">
                  <img
                    className="utility__image"
                    src={document.thumbnail[1]}
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
                  onClick={() => deleteBookmark(document.id)}
                  className="bookmark__icon--container"
                >
                  <img className="bookmark__icon" src={bookmarkIcon} alt="" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
