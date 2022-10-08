/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useCharacters } from "../contexts/casts";
import CustomPagination from "./Pagination/customPagination";
import axios from 'axios'
import "./Layout.css"
import { Container } from "@material-ui/core";

const Layout = ({ dataRecieved, movieSelected }) => {
  // creating neccessary states
  const { characters_context, updateCharacters, sortPeople, sortByGender, loadingData } =
    useCharacters();
  const [direction, setDirection] = useState("descending");
  const [currentChild, setCurrentChild] = useState("all");
  const [totalHeight, setTotalHeight] = useState(0);
  const [crawler, setCrawler] = useState("");
  const [page, setpage] = useState(1);

  useEffect(() => {
   axios.get(`https://swapi.dev/api/films&page=${page}`)
  }, [page]);

  // fn to get characters of a selected movie
  const getCharacters = () => {
    dataRecieved?.filter((item) => {
      if (item.title === movieSelected) {
        updateCharacters(item.characters);
        return;
      }
    });
  };

    // fn to get opening crawler of a selected movie
  const getCrawler = () => {
    dataRecieved?.filter((item) => {
      if (item.title === movieSelected) {
        setCrawler(item.opening_crawl);
      }
    });
  };
    // fn to get all height of all characters of a selected movie
  const getAllHeight = async () => {
    const newCharacter = characters_context.filter(
      // prevent code breaking due to some height showing up as unknown
      (item) => item.height !== "unknown"
    );
    const allSum = newCharacter.reduce((a, b) => +a + +b.height, 0);
    setTotalHeight((prevState) => (prevState = allSum));
  };

  // sorting the characters after clicking the table headers
  // fn is called from context api
  const sortingCasts = () => {
    if (direction === "assending") {
      sortPeople("descending");
      setDirection("descending");
      return;
    }
    sortPeople("assending");
    setDirection("assending");
  };

  // pairing child for selected button styling
  useEffect(() => {
    currentChild === "Male Only"
      ? sortByGender("male")
      : currentChild === "Female Only"
      ? sortByGender("female")
      : sortByGender("all");
  }, [currentChild]);

  // mapping out all table items into the table data component
  const displayCharacters = characters_context.map((item, index) => {
    return (

         <tr key={index} >
        <td>{index+1}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.height}cm</td>
        <td>{item.mass}</td>
        <td>{item.skin_color}</td>
      </tr>

     
      );
  });

  useEffect(() => {
    getAllHeight();
  }, [characters_context]);

  useEffect(() => {
    const unsub = getCharacters();
    const unsub2 = getCrawler();
    setCurrentChild("all");
    // getAllHeight();
    return () => {
      unsub;
      unsub2;
    };
  }, [movieSelected]);

  // if page is still loading on api request, show loading on screen
  if(loadingData){
    return <div className='loadingDataIntro'>
      <img src="/loading.gif" alt="" />
    </div>
  }

  // else, no loading will show the main items
  return (
    <>
      <section className="maintable"><hr/>
        {movieSelected && <h1 className="moviename">Movie: {movieSelected} <i class="fa-solid fa-heart"></i></h1>}
       
        <p>
         {crawler}
        </p>
        <hr/>
        {characters_context.length > 0 && (
          <div className="selection">
            <button  
              onClick={(e) => setCurrentChild("all")}
              className={currentChild === "all" ? "selected" : "non_selected"} 
            >
              All
            </button>
            <button
              onClick={(e) => setCurrentChild("Male Only")}
              className={
                currentChild === "Male Only" ? "selected" : "non_selected"} >
              Male Only
            </button>
            <button
              onClick={(e) => setCurrentChild("Female Only")}
              className={
                currentChild === "Female Only" ? "selected" : "non_selected"} >
              Female Only
            </button>
          </div>
        )}
        {characters_context.length > 0 && (
          <div className="col-12">
          <table className="table table-hover text-center">
            <thead className="text-white">
              <tr onClick={() => sortingCasts()}>
                <th>Index No.</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Height</th>
                <th>mass</th>
                <th>skin_color</th>
                
              </tr>
            </thead>
            <tbody className="text-white">
              {displayCharacters}
              <tr>
                <td>Total Characters: {characters_context.length}</td>
                <td>
                  Total Heights: {totalHeight}cm
                 <p> {`(${Math.round(totalHeight / 30.48)}ft/${Math.round(
                    totalHeight / 2.54
                  )}in)`}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <CustomPagination setpage={setpage} />
          </div>
        )}
      </section>
    </>
  );
};

export default Layout;