import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "../components/Pagination";
import PokeCard from "../components/PokeCard";
import PokeSearcher from "../components/PokeSearcher";
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
  const [loader, setLoader] = useState(false);

  console.log(loader);

  //First Fetch of Pokemon Data
  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        if (type) {
          const data = await fetch(`https://pokeapi.co/api/v2/type/${type}`),
            dataJson = await data.json();
          setTypeList(dataJson.pokemon);
          setPokeList(null);
        } else {
          const data = await fetch(
              `https://pokeapi.co/api/v2/pokemon?offset=0&limit=4`
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
    setLoader(false);
  }, [type]);

  //Submit input data
  const onSubmit = (data) => {
    setInputData(data);
    setPokeList(null);
    setTypeList(null);
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
  const typePag = () => {
    return typeList.slice(pokePerPage, pokePerPage + 4);
  };

  const nextPage = (url) => {
    setisBtnUse(false);

    let length = typeList ? typeList.length : 0;

    if (typeList && pokePerPage < length - 4) {
      setPokePerPage(pokePerPage + 4);
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPageLimit) {
        setMaxPageLimit(maxPageLimit + pageNumLimit);
        setMinPageLimit(minPageLimit + pageNumLimit);
      }
    } else if (pokeList) {
      const getData = async () => {
        const data = await fetch(url),
          dataJson = await data.json();
        setPokeList(dataJson.results);
        setNextPag(dataJson.next);
        setPrevPag(dataJson.previous);
        setCurrentPage(currentPage + 1);
      };

      getData();
    }
  };

  const prevPage = (url) => {
    setisBtnUse(false);

    if (typeList && pokePerPage > 0) {
      setPokePerPage(pokePerPage - 4);
      setCurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumLimit === 0) {
        setMaxPageLimit(maxPageLimit - pageNumLimit);
        setMinPageLimit(minPageLimit - pageNumLimit);
      }
    } else if (pokeList) {
      const getData = async () => {
        const data = await fetch(url),
          dataJson = await data.json();
        setPokeList(dataJson.results);
        setNextPag(dataJson.next);
        setPrevPag(dataJson.previous);
        setCurrentPage(currentPage + 1);
      };

      getData();
    }
  };

  const lastPoke = currentPage * 4;
  const firstPoke = lastPoke - 4;
  const currentPoke = typeList && typeList.slice(firstPoke, lastPoke);

  const page = (num) => {
    setCurrentPage(num);
    setisBtnUse(true);
  };

  //Create list of PokeCards
  const printPokemons = () => {
    if (isBtnUse) {
      return currentPoke.map((u, index) => (
        <PokeCard key={"0" + index} pokeUrl={u.pokemon.url} />
      ));
    } else if (typeList)
      return typePag().map((u, index) => (
        <PokeCard key={"0" + index} pokeUrl={u.pokemon.url} />
      ));
    else if (pokeList)
      return pokeList.map((u, index) => (
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
