import React from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Car.css";

function Car({ id, year, title, summary, poster}) {
  console.log(poster)
  return (
    <div className="car">
      <div
        to={{
          pathname: `/car/${id}`,
          state: {
            year,
            title,
            summary,
            poster,
          }
        }}
      >
        <img src={poster} alt={title} title={title} />
        <div className="car__data">
          <h3 className="car__title">{title}</h3>
          <h5 className="car__year">{year}</h5>
          {/* <ul className="car__genres">
            {genres.map((genre, index) => (
              <li key={index} className="genres__genre">
                {genre}
              </li>
            ))}
          </ul> */}
          <p className="car__summary">{summary.slice(0, 180)}...</p>
        </div>
      </div>
    </div>
  );
}

Car.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Car;
