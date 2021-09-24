import React, { useState } from "react";
import pokedex from "../assets/pokedexLogo.svg";
import { useAuth } from "../Context/DataContext";
import "./PokeSearcher.css";
import Settings from "./Settings";
import { IoMdSettings } from "react-icons/io";

const PokeSearcher = ({
  register,
  handleSubmit,
  onSubmit,
  setType,
  setInputData,
  setCurrentPage,
  setMaxPageLimit,
  setMinPageLimit,
  setPokePerPage,
}) => {
  const { trainer } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  const handleType = (type) => {
    setType(type);
    setInputData(null);
    setCurrentPage(1);
    setMaxPageLimit(10);
    setMinPageLimit(0);
    setPokePerPage(0);
  };

  return (
    <div className="poke-searcher">
      <span className="settings-btn" onClick={() => setShowSettings(true)}>
        <IoMdSettings />
      </span>
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      <figure>
        <img src={pokedex} alt="pokedex" />
      </figure>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>{`Welcome Trainer ${trainer}!`}</h3>
        <label>Search a pokemon by name or ID</label>
        <input type="text" {...register("pokeId")} />
        <button>Get a Pokemon!</button>
      </form>
      <br />
      <p>
        Don't Know the name or ID? <br /> Try to search by specific Type!
      </p>
      <div className="type-btns">
        <button className="type-bug" onClick={() => handleType("bug")}>
          BUG
        </button>
        <button className="type-dark" onClick={() => handleType("dark")}>
          DARK
        </button>
        <button className="type-dragon" onClick={() => handleType("dragon")}>
          DRAGON
        </button>
        <button
          className="type-electric"
          onClick={() => handleType("electric")}
        >
          ELECTRIC
        </button>
        <button className="type-fairy" onClick={() => handleType("fairy")}>
          FAIRY
        </button>
        <button
          className="type-fighting"
          onClick={() => handleType("fighting")}
        >
          FIGHTING
        </button>
        <button className="type-fire" onClick={() => handleType("fire")}>
          FIRE
        </button>
        <button className="type-flying" onClick={() => handleType("flying")}>
          FLYING
        </button>
        <button className="type-ghost" onClick={() => handleType("ghost")}>
          GHOST
        </button>
        <button className="type-grass" onClick={() => handleType("grass")}>
          GRASS
        </button>
        <button className="type-ground" onClick={() => handleType("ground")}>
          GROUND
        </button>
        <button className="type-ice" onClick={() => handleType("ice")}>
          ICE
        </button>
        <button className="type-normal" onClick={() => handleType("normal")}>
          NORMAL
        </button>
        <button className="type-poison" onClick={() => handleType("poison")}>
          POISON
        </button>
        <button className="type-psychic" onClick={() => handleType("psychic")}>
          PSYCHIC
        </button>
        <button className="type-rock" onClick={() => handleType("rock")}>
          ROCK
        </button>
        <button className="type-steel" onClick={() => handleType("steel")}>
          STEEL
        </button>
        <button className="type-water" onClick={() => handleType("water")}>
          WATER
        </button>
      </div>
    </div>
  );
};

export default PokeSearcher;
