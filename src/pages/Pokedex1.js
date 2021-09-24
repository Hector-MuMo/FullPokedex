import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "../components/Pagination";
import PokeCard from "../components/PokeCard";
import PokeSearcher from "../components/PokeSearcher";
import { useAuth } from "../Context/DataContext";
import "./Pokedex.css";

const mainURL = `https://pokeapi.co/api/v2/pokemon/`;

const Pokedex = () => {
  const { register, handleSubmit, reset } = useForm();
  const [pokeList, setPokeList] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [typeList, setTypeList] = useState(null);
  const [type, setType] = useState(null);
  const [nextPag, setNextPag] = useState("");
  const [prevPag, setPrevPag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumLimit] = useState(10);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [pokePerPage, setPokePerPage] = useState(0);
  const [isBtnUse, setisBtnUse] = useState(false);
  const { numPages } = useAuth();

  //First Fetch of Pokemon Data
  useEffect(() => {
    const getData = async () => {
      try {
        if (type) {
          const data = await fetch(`https://pokeapi.co/api/v2/type/${type}`),
            dataJson = await data.json();
          setTypeList(dataJson.pokemon);
          setPokeList(null);
        } else {
          const data = await fetch(
              `https://pokeapi.co/api/v2/pokemon/?limit=1500&offset=0`
            ),
            dataJson = await data.json();
          setPokeList(dataJson.results);
          setNextPag(dataJson.next);
          setPrevPag(dataJson.previous);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [type]);

  //Submit input data
  const onSubmit = (data) => {
    setInputData(data);
    setPokeList(null);
    setTypeList(null);
    setisBtnUse(false);
    reset();
  };

  //Input data URL
  const searchPokemon = () => {
    let url;
    if (inputData) {
      url = mainURL + inputData.pokeId;
    }

    return url;
  };

  //Pagination
  const pokemonPage = () => {
    if (typeList) {
      return typeList.slice(pokePerPage, pokePerPage + numPages);
    } else if (pokeList) {
      return pokeList.slice(pokePerPage, pokePerPage + numPages);
    }
  };

  const nextPage = () => {
    setisBtnUse(false);

    if (typeList && pokePerPage < typeList.length - numPages) {
      setPokePerPage(pokePerPage + numPages);
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPageLimit) {
        setMaxPageLimit(maxPageLimit + pageNumLimit);
        setMinPageLimit(minPageLimit + pageNumLimit);
      }
    } else if (pokeList && pokePerPage < pokeList.length - numPages) {
      setPokePerPage(pokePerPage + numPages);
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPageLimit) {
        setMaxPageLimit(maxPageLimit + pageNumLimit);
        setMinPageLimit(minPageLimit + pageNumLimit);
      }
    }
  };

  const prevPage = () => {
    setisBtnUse(false);

    if (typeList && pokePerPage > 0) {
      setPokePerPage(pokePerPage - numPages);
      setCurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumLimit === 0) {
        setMaxPageLimit(maxPageLimit - pageNumLimit);
        setMinPageLimit(minPageLimit - pageNumLimit);
      }
    } else if (pokeList && pokePerPage > 0) {
      setPokePerPage(pokePerPage - numPages);
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageNumLimit === 0) {
        setMaxPageLimit(maxPageLimit - pageNumLimit);
        setMinPageLimit(minPageLimit - pageNumLimit);
      }
    }
  };

  const lastPoke = currentPage * numPages;
  const firstPoke = lastPoke - numPages;

  const switchPageBtn = () => {
    if (typeList) return typeList.slice(firstPoke, lastPoke);
    else if (pokeList) return pokeList.slice(firstPoke, lastPoke);
    else return [];
  };

  const currentPoke = switchPageBtn();

  const page = (num) => {
    setCurrentPage(num);
    setPokePerPage((num - 1) * numPages);
    setisBtnUse(true);
  };

  //Create list of PokeCards
  const printPokemons = () => {
    if (isBtnUse) {
      return currentPoke.map((u, index) => {
        return typeList ? (
          <PokeCard key={"0" + index} pokeUrl={u.pokemon.url} />
        ) : (
          <PokeCard key={"0" + index} pokeUrl={u.url} />
        );
      });
    } else if (typeList)
      return pokemonPage().map((u, index) => (
        <PokeCard key={"0" + index} pokeUrl={u.pokemon.url} />
      ));
    else if (pokeList)
      return pokemonPage().map((u, index) => (
        <PokeCard key={"0" + index} pokeUrl={u.url} />
      ));
    else return <PokeCard key={1} pokeUrl={searchPokemon()} />;
  };

  const Pokemon = printPokemons();
  return (
    <div className="pokedex-container">
      <section className="pokesearch-container">
        <PokeSearcher
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setType={setType}
          setInputData={setInputData}
          setCurrentPage={setCurrentPage}
          setMaxPageLimit={setMaxPageLimit}
          setMinPageLimit={setMinPageLimit}
          setPokePerPage={setPokePerPage}
        />
      </section>
      <section className="pokecard-container">{Pokemon}</section>
      {!inputData && (
        <Pagination
          typeList={typeList}
          pokeList={pokeList}
          nextPag={nextPag}
          prevPag={prevPag}
          funNextPage={nextPage}
          funPrevPage={prevPage}
          page={page}
          currentPage={currentPage}
          maxPageLimit={maxPageLimit}
          minPageLimit={minPageLimit}
        />
      )}
    </div>
  );
};

export default Pokedex;
