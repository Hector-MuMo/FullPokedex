import React, { useState } from 'react';
import pokedex from '../assets/pokedexLogo.svg';
import { useAuth } from '../Context/DataContext';
import './PokeSearcher.css';
import Settings from './Settings';
import { IoMdSettings } from 'react-icons/io';

const PokeSearcher = ({
  register,
  handleSubmit,
  onSubmit,
  setType,
  setTypeList,
  setInputData,
  setCurrentPage,
  setMaxPageLimit,
  setMinPageLimit,
  setPokePerPage,
  setColor,
  setColorList,
  setGender,
  setGenderList,
}) => {
  const { trainer } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  const handleType = (type) => {
    setType(type);
    setColor(null);
    setColorList(null);
    setGender(null);
    setGenderList(null);
    setInputData(null);
    setCurrentPage(1);
    setMaxPageLimit(10);
    setMinPageLimit(0);
    setPokePerPage(0);
  };

  const handleColor = (color) => {
    setType(null);
    setTypeList(null);
    setColor(color);
    setGender(null);
    setGenderList(null);
    setInputData(null);
    setCurrentPage(1);
    setMaxPageLimit(10);
    setMinPageLimit(0);
    setPokePerPage(0);
  };

  const handleGender = (gender) => {
    setType(null);
    setTypeList(null);
    setColor(null);
    setColorList(null);
    setGender(gender);
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
        <input type="text" {...register('pokeId')} required="text" />
        <button>Get a Pokemon!</button>
      </form>
      <br />
      <p>
        Don't Know the name or ID? <br /> Try to search by specific Type!
      </p>
      <div className="type-btns">
        <button className="type-bug" onClick={() => handleType('bug')}>
          BUG
        </button>
        <button className="type-dark" onClick={() => handleType('dark')}>
          DARK
        </button>
        <button className="type-dragon" onClick={() => handleType('dragon')}>
          DRAGON
        </button>
        <button
          className="type-electric"
          onClick={() => handleType('electric')}
        >
          ELECTRIC
        </button>
        <button className="type-fairy" onClick={() => handleType('fairy')}>
          FAIRY
        </button>
        <button
          className="type-fighting"
          onClick={() => handleType('fighting')}
        >
          FIGHTING
        </button>
        <button className="type-fire" onClick={() => handleType('fire')}>
          FIRE
        </button>
        <button className="type-flying" onClick={() => handleType('flying')}>
          FLYING
        </button>
        <button className="type-ghost" onClick={() => handleType('ghost')}>
          GHOST
        </button>
        <button className="type-grass" onClick={() => handleType('grass')}>
          GRASS
        </button>
        <button className="type-ground" onClick={() => handleType('ground')}>
          GROUND
        </button>
        <button className="type-ice" onClick={() => handleType('ice')}>
          ICE
        </button>
        <button className="type-normal" onClick={() => handleType('normal')}>
          NORMAL
        </button>
        <button className="type-poison" onClick={() => handleType('poison')}>
          POISON
        </button>
        <button className="type-psychic" onClick={() => handleType('psychic')}>
          PSYCHIC
        </button>
        <button className="type-rock" onClick={() => handleType('rock')}>
          ROCK
        </button>
        <button className="type-steel" onClick={() => handleType('steel')}>
          STEEL
        </button>
        <button className="type-water" onClick={() => handleType('water')}>
          WATER
        </button>
      </div>
      <br />
      <p>Try to search by specific Color!</p>
      <div className="color-btns">
        <button className="color-black" onClick={() => handleColor('black')}>
          BLACK
        </button>
        <button className="color-blue" onClick={() => handleColor('blue')}>
          BLUE
        </button>
        <button className="color-brown" onClick={() => handleColor('brown')}>
          BROWN
        </button>
        <button className="color-gray" onClick={() => handleColor('gray')}>
          GRAY
        </button>
        <button className="color-green" onClick={() => handleColor('green')}>
          GREEN
        </button>
        <button className="color-pink" onClick={() => handleColor('pink')}>
          PINK
        </button>
        <button className="color-purple" onClick={() => handleColor('purple')}>
          PURPLE
        </button>
        <button className="color-red" onClick={() => handleColor('red')}>
          RED
        </button>
        <button className="color-white" onClick={() => handleColor('white')}>
          WHITE
        </button>
        <button className="color-yellow" onClick={() => handleColor('yellow')}>
          YELLOW
        </button>
      </div>
      <br />
      <p>Try to search by specific Gender!</p>
      <div className="gender-btns">
        <button className="gender-male" onClick={() => handleGender('male')}>
          MALE
        </button>
        <button
          className="gender-female"
          onClick={() => handleGender('female')}
        >
          FEMALE
        </button>
        <button
          className="gender-undefined"
          onClick={() => handleGender('genderless')}
        >
          UNDEFINED
        </button>
      </div>
    </div>
  );
};

export default PokeSearcher;
