import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokeEncounters from "./pages/PokeEncounters";
import PokemonId from "./pages/PokemonId";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <ProtectedRoute exact path={"/pokedex"}>
            <Pokedex />
          </ProtectedRoute>
          <ProtectedRoute exact path={"/pokedex/pokemon/:pokeID"}>
            <PokemonId />
          </ProtectedRoute>
          <Route
            path="/pokedex/pokemon/:pokeID/encounters"
            component={PokeEncounters}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
