import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useAuth } from "../Context/DataContext";
import capitalizeName from "../helpers/capitalizeName";
import randomIndex from "../helpers/randomIndex";
import "./PokeCard.css";

const PokeCard = ({ pokeUrl }) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { signIn } = useAuth();
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState("");

  //Styling types elements
  const handleStylish = (type) => {
    const stylesTypes = {
      bug: "#acbb20",
      dark: "#523d2f",
      dragon: "#765fe0",
      electric: "#fbb917",
      fairy: "#f6b3f6",
      fighting: "#81341d",
      fire: "#e63b0b",
      flying: "#98a9f4",
      ghost: "#5e5eaf",
      grass: "#72c235",
      ground: "#cead53",
      ice: "#90e0fa",
      normal: "#c3bdb4",
      poison: "#914492",
      psychic: "#ea447e",
      rock: "#9e863d",
      steel: "#aeaebd",
      water: "#2a8aeb",
    };
    let colorType = { backgroundColor: "", boxShadow: "'' 0px 5px 15px" };
    for (const key in stylesTypes) {
      if (type === key) {
        colorType = {
          backgroundColor: stylesTypes[key],
          boxShadow: `${stylesTypes[key]} 0px 5px 15px`,
        };
      }
    }
    return colorType;
  };

  //FetchPokemons
  useEffect(() => {
    const getPokemon = async () => {
      try {
        if (pokeUrl) {
          let data = await fetch(pokeUrl),
            pokeInfo = await data.json();
          setPokemon(pokeInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPokemon();
  }, [pokeUrl]);

  //External Image Control
  useEffect(() => {
    const addCero = (id) => {
      let string = id.toString();
      if (string.length === 1) {
        setId(`00${string}`);
      } else if (string.length === 2) {
        setId(`0${string}`);
      } else {
        setId(string);
      }
    };
    pokemon && addCero(pokemon.id);
  }, [pokemon]);

  //Stats List
  const statList =
    pokemon &&
    pokemon.stats.map((s) => (
      <div key={`div+${randomIndex().toString()}`}>
        <label key={`label+${randomIndex().toString()}`}>
          {capitalizeName(s.stat.name)}:
        </label>
        <span key={`span+${randomIndex().toString()}`}>{s.base_stat}</span>
      </div>
    ));

  //Types List
  const typeList =
    pokemon &&
    pokemon.types.map((t) => (
      <span
        style={handleStylish(t.type.name)}
        key={`t+${randomIndex().toString()}`}
      >
        {capitalizeName(t.type.name)}
      </span>
    ));

  return (
    pokemon && (
      <div className="pokecard">
        <figure>
          <img
            src={
              id < 899
                ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
                : pokemon.sprites.front_default
            }
            alt={pokemon.name}
          />
        </figure>

        <figcaption
          className="poke-name"
          onClick={() => {
            signIn(() => {
              history.push(`${url}/pokemon/${pokemon.id}`);
            });
          }}
        >
          {capitalizeName(pokemon.name)}
        </figcaption>

        <figcaption>{typeList}</figcaption>
        <div className="stats-container">{statList}</div>
      </div>
    )
  );
};

export default PokeCard;
