import React, { useState } from 'react';
import './App.css';
import backgroundMusic from './background.mp3'; // Import audio file

// Evolution chains with level thresholds
const evolutionChains = {
  Pichu: [
    { level: 0, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/pichu.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/pikachu.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/raichu.png" },
  ],
  Squirtle: [
    { level: 0, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/squirtle.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/wartortle.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/blastoise.png" },
  ],
  Charmander: [
    { level: 0, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/charmander.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/charmeleon.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/charizard.png" },
  ]
};

function App() {
  const [level, setLevel] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [cookiesEaten, setCookiesEaten] = useState(0);
  const [steakEaten, setSteakEaten] = useState(0);
  const [gapplesEaten, setGapplesEaten] = useState(0);

  const increaseLevel = (points) => {
    setLevel(level + points);
    if (points === 1) setCookiesEaten(cookiesEaten + 1);
    if (points === 5) setSteakEaten(steakEaten + 1);
    if (points === 25) setGapplesEaten(gapplesEaten + 1);
  };

  const resetLevel = () => {
    setLevel(0);
    setSelectedPokemon(null);
  };

  // Current pokemon stage based on level
  let displayedImage = "";
  if (selectedPokemon) {
    const evolutionChain = evolutionChains[selectedPokemon.name];
    const currentStage = evolutionChain.reduce((current, stage) => {
      return level >= stage.level ? stage : current;
    }, evolutionChain[0]);
    displayedImage = currentStage.image;
  }

  // Selection screen to choose pokemon
  if (!selectedPokemon) {
    return (
      <div
        style={{
          width: '375px',
          margin: '0 auto',
          border: '1px solid #ccc',
          padding: '20px',
          height: '90vh',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h2>Choose Your Pokémon</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          {Object.keys(evolutionChains).map((pokemonName) => (
            <div key={pokemonName} style={{ textAlign: 'center' }}>
              <img
                src={evolutionChains[pokemonName][0].image}
                alt={pokemonName}
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={() => setSelectedPokemon({ name: pokemonName })}
              />
              <p>{pokemonName}</p>
            </div>
          ))}
        </div>
        <audio src={backgroundMusic} autoPlay loop />
      </div>
    );
  }

  return (
    <div className="app-container"
      style={{
        width: '375px',
        margin: '0 auto',
        border: '1px solid #ccc',
        padding: '20px',
        height: '90vh',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      {/* Background Music */}
      <audio src={backgroundMusic} autoPlay loop />

      {/* Level display */}
      <h2 style={{ position: 'absolute', top: 0, left: 30 }}>Level: {level}</h2>

      {/* Main Content */}
      {level < 100 ? (
        <>
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '110vh',
            }}>
            <img src={displayedImage} alt="Pokemon" style={{ width: '300px', height: 'auto' }} className="bouncy" />
          </div>

          {/* Food Buttons */}
          <div style={{ position: 'absolute', bottom: 490, right: 0 }}>
            <button onClick={() => increaseLevel(1)} style={{
                padding: '10px 10px',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                margin: '10px',
              }}>
              <img src="https://minecraft.wiki/images/Cookie_JE2_BE2.png?a911c&20190505051355" alt="Cookie" style={{ width: 30, height: 30, marginRight: 5 }} />
              (+1)
            </button>
            <button onClick={() => increaseLevel(5)} style={{
                padding: '10px 10px',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                margin: '10px',
              }}>
              <img src="https://minecraft.wiki/images/Steak_JE4_BE3.png?45317&20190504055306" alt="Steak" style={{ width: 30, height: 30, marginRight: 5 }} />
              (+5)
            </button>
            <button onClick={() => increaseLevel(25)} style={{
                padding: '10px 5.5px',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                margin: '10px',
              }}>
              <img src="https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png?aa827&20200521041809" alt="Golden Apple" style={{ width: 30, height: 30, marginRight: 5 }} />
              (+25)
            </button>
          </div>
        </>
      ) : (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '105vh',
            textAlign: 'center',
          }}>
          <p style={{ fontSize: '19px', color: "white", fontWeight: 'bold', backgroundColor: "#333333"}}>You've reached the final stage!</p>
          <p style={{ fontSize: '14px', color: "white", fontWeight: 'bold', backgroundColor: "#333333"}}>Total easy questions solved: {cookiesEaten}</p>
          <p style={{ fontSize: '14px', color: "white", fontWeight: 'bold', backgroundColor: "#333333"}}>Total medium questions solved: {steakEaten}</p>
          <p style={{ fontSize: '14px', color: "white", fontWeight: 'bold', backgroundColor: "#333333"}}>Total hard questions solved: {gapplesEaten}</p>
          <button onClick={resetLevel} style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#ffcc00',
              border: 'none',
              borderRadius: '5px',
              marginTop: '10px',
            }}>Retry</button>
        </div>
      )}
    </div>
  );
}

export default App;
