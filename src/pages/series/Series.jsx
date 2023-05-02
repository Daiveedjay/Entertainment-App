import Search from "../../components/Search";
import "./Series.css";
import data from "../../data.json";
import bookmarkIcon from "../../../public/icon-bookmark-empty.svg";
import movieIcon from "../../../public/icon-nav-movies-light.svg";
import seriesIcon from "../../../public/icon-nav-tv-series-light.svg";
import playIcon from "../../../public/icon-play.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
export default function Series() {
  const { addDocumentWithImage } = useFirestore("bookmarks");

  const { user } = useAuthContext();

  const addBookmark = async (dataItem) => {
    const title = dataItem.title;
    const category = dataItem.category;
    const year = dataItem.year;
    const rating = dataItem.rating;
    const uid = user.uid;
    const bookmarkImg = dataItem.thumbnail[1];

    const response = await fetch(bookmarkImg);
    const blob = await response.blob();
    const fileType = blob.type;
    const imageFile = new File([blob], `${title}-${category}.jpg`, {
      type: fileType,
    });

    await addDocumentWithImage(
      {
        uid,
        title,
        category,
        year,
        rating,
      },
      imageFile
    );
  };
  return (
    <div>
      <Search />
      <section className="series__section section--spacing">
        <div className=" header--spacing">
          <h2 className=" large--text">Tv Series</h2>
          <h2 className="large--text display--name">
            What&apos;s good, {user.displayName} ?
          </h2>
        </div>

        <div className="utility__items--container">
          {data &&
            data
              .filter((dataItem) => dataItem.category !== "Movie")

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
                    onClick={() => addBookmark(dataItem)}
                    className="bookmark__icon--container"
                  >
                    <img className="bookmark__icon" src={bookmarkIcon} alt="" />
                  </div>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}
