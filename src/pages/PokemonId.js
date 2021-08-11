import React, { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import capitalizeName from "../helpers/capitalizeName";
import randomIndex from "../helpers/randomIndex";
import "./PokemonId.css";

const mainURL = `https://pokeapi.co/api/v2/pokemon/`;

const PokemonId = () => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const [pokeData, setPokeData] = useState(null);
  const { pokeID } = useParams();
  const [imgId, setimgId] = useState("");

  //Get Pokemon Data
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(`${mainURL}${pokeID}`),
          pokeinfo = await data.json();
        setPokeData(pokeinfo);
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

  //Abilities list
  const abilitiesList =
    pokeData &&
    pokeData.abilities.map((a, index) => (
      <span key={index}>° {a.ability.name}</span>
    ));

  //Movements list
  const moveList =
    pokeData &&
    pokeData.moves.map((m) => (
      <li key={randomIndex()}>{capitalizeName(m.move.name)}</li>
    ));

  return (
    pokeData && (
      <div className="pokemon-id">
        <h2>{capitalizeName(pokeData.name)}</h2>
        <figure>
          <img
            src={
              imgId < 899
                ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgId}.png`
                : pokeData.sprites.front_default
            }
            alt={pokeData.name}
          />
        </figure>
        <p>Stats</p>
        <article className="poke-stats">
          <label>Pokedex Num. :</label>
          <span>{pokeData.order}</span>
          <label>Height:</label>
          <span>{pokeData.height} m</span>
          <label>Weight:</label>
          <span>{pokeData.weight} hxgrs</span>
          <label>Ability(ies):</label>
          <div className="abilities">{abilitiesList}</div>
        </article>
        <p>Moves that could learn</p>
        <article className="poke-moves">
          <ul>{moveList}</ul>
        </article>
        <div className="poke-btns">
          <button onClick={() => history.goBack()}>Back</button>
          <button onClick={() => history.push(`${url}/encounters`)}>
            Encounters
          </button>
        </div>
      </div>
    )
  );
};

export default PokemonId;
