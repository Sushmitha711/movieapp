import Intro from "./components/Intro";
 import "./App.css";
import Layout from "./components/Layout";
import Headers from './components/Header/Header'
import useApiCalls from "./Hooks/useApiCalls";
import { useState, useEffect } from "react";
import { CharactersProvider } from "./contexts/casts";
import { Container } from "@material-ui/core";

function App() {
  // setting up neccessary states
  // calling the custom hook to load up dropdown contents
  const { dataRecieved, loading, errorMsg } = useApiCalls();
  const [movieSelected, setMovieSelected] = useState("");

  return (
    <>
        <Headers/>
    <CharactersProvider>
      <section className="app">
        <Container>
        <Intro
        errorMsg={errorMsg}
        loading={loading}
          setMovieSelected={setMovieSelected}
          dataRecieved={dataRecieved}
        />
        <Layout dataRecieved={dataRecieved} movieSelected={movieSelected} />
        </Container>
       
      </section>
    </CharactersProvider>
    </>
  );
}

export default App;