import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/pokemonLogo.png";
import oak from "../assets/Oak.gif";
import { useAuth } from "../Context/DataContext";
import "./Home.css";

const Home = () => {
  const history = useHistory();
  const { signIn, setTrainer } = useAuth();
  const [inputData, setInputData] = useState("");

  const handleClick = () => {
    signIn(() => {
      history.push("/pokedex");
    });
    setTrainer(inputData);
  };

  return (
    <div className="main-background">
      <section className="home-container">
        <figure className="puff-in-center">
          <img src={logo} alt="logo" />
        </figure>
        <article className="intro-txt-container">
          <div className="intro-txt">
            <h3>¡Welcome Trainer!</h3>
            <span>
              Hello there! Welcome to the world of pokémon! My name is Oak!
              People call me the pokémon Prof! This world is inhabited by
              creatures called pokémon! For some people, pokémon are pets.
              Others use them for fights. Myself...I study pokémon as a
              profession.
            </span>
            <p>Before begin your journey, what's your name? </p>
            <div className="input-btn">
              <input
                type="text"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              <button onClick={() => handleClick()}>Start</button>
            </div>
          </div>
          <div className="prof-oak">
            <figure>
              <img src={oak} alt="" />
            </figure>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
