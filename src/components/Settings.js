import React from "react";
import { useAuth } from "../Context/DataContext";
import "./Settings.css";

const Settings = ({ setShowSettings }) => {
  const { setnumPages } = useAuth();

  const handleSettings = (num) => {
    setnumPages(num);
    setShowSettings(false);
  };

  return (
    <div className="settings-container">
      <section className="settings">
        <button
          className="settings-close"
          onClick={() => setShowSettings(false)}
        >
          X
        </button>
        <h3>Change Settings</h3>
        <p>Choose how many Pokemons do you want to see per page...</p>
        <article className="settings-btns">
          <button onClick={() => handleSettings(4)}>4</button>
          <button onClick={() => handleSettings(8)}>8</button>
          <button onClick={() => handleSettings(12)}>12</button>
          <button onClick={() => handleSettings(16)}>16</button>
          <button onClick={() => handleSettings(20)}>20</button>
        </article>
      </section>
    </div>
  );
};

export default Settings;
