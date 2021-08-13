import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import capitalizeName from "../helpers/capitalizeName";
import clearEncounter from "../helpers/clearEncounter";
import "./PokeEncounters.css";

const mainURL = `https://pokeapi.co/api/v2/pokemon/`;

const PokeEncounters = () => {
  const history = useHistory();
  const { pokeID } = useParams();
  const [pokeData, setPokeData] = useState(null);
  const [defaultImg, setDefaultImg] = useState(null);
  const [imgId, setimgId] = useState("");
  const [pokeName, setPokeName] = useState("");

  //Get Encounters
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(`${mainURL}${pokeID}`),
          pokeinfo = await data.json();
        setPokeName(pokeinfo.name);
        setDefaultImg(pokeinfo.sprites.front_default);
        const res = await fetch(pokeinfo.location_area_encounters),
          encounters = await res.json();
        setPokeData(encounters);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [pokeID]);

  //External Image Control
  useEffect(() => {
    const addCero = (id) => {
      let string = id.toString();
      if (string.length === 1) {
        setimgId(`00${string}`);
      } else if (string.length === 2) {
        setimgId(`0${string}`);
      } else {
        setimgId(string);
      }
    };
    pokeID && addCero(pokeID);
  }, [pokeID]);

  //Print Encounter List
  const encountersList =
    pokeData && pokeData.length !== 0
      ? pokeData.map((en, index) => (
          <li key={index}>
            <label>Region:</label>
            <span>{clearEncounter(en.location_area.name).region}</span>
            <label>Route:</label>
            <span>{clearEncounter(en.location_area.name).route}</span>
          </li>
        ))
      : "Not encounters found";

  return (
    <section className="poke-encounters">
      {pokeName && <h2>{capitalizeName(pokeName)}</h2>}
      <figure>
        {defaultImg && (
          <img
            src={
              imgId < 899
                ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgId}.png`
                : defaultImg
            }
            alt="img"
          />
        )}
      </figure>
      <p>Encounters Zones</p>
      <article className="poke-stats">
        <ul>{encountersList}</ul>
      </article>
      <div className="poke-btns">
        <button onClick={() => history.goBack()}>Back</button>
      </div>
    </section>
  );
};

export default PokeEncounters;
