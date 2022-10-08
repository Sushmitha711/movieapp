import React, { useState } from "react";
import "./Intro.css";

const Intro = ({ dataRecieved, setMovieSelected, loading, errorMsg }) => {
  const [showTitle, setShowTitle] = useState(false);
  const toggler = () => {
    showTitle ? setShowTitle(false) : setShowTitle(true);
  };

  const updateMovieSelection = (name) => {
    setMovieSelected(name);
  };

  const displayTitles = dataRecieved?.map((item) => {
    return (
      <>
      <div
        key={item.title}
        onClick={() => updateMovieSelection(item.title)} className="list" >
       {item.title}
         </div> 
      </> 
    );
  });
  console.log(displayTitles);
  return (
    <section className="mainIntro">
      <img src="/starwarBg.jpg" alt="" />
      <div className="btnSide">
        <button onClick={toggler} className="btn btn-info">
          CHOSE A STARWARS MOVIE 
          {showTitle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M12 3l12 18h-24z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24" >
              <path d="M12 21l-12-18h24z" />
            </svg>
          )}
        </button>
      </div>
      {errorMsg ? (
        <div className="loadingIntro">{errorMsg}</div>
      ) : loading ? (
        <div className="loadingIntro">
          <img src="/loading.gif" alt="" />
        </div>
      ) : (
        !loading &&
        showTitle && (
          <section className="dropDownContent">{displayTitles}</section>     
        )
      )}
    </section>
  );
};

export default Intro;