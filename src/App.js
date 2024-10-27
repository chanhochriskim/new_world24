import React, { useState } from 'react';
import './App.css';
import backgroundMusic from './background.mp3'; // Import audio file


//future: API, add account so can save progress on who's been unlocked, who's at what percentage, also battles, also leaderboards, 
//add pokemon to win screen, beginning screen make them all grayed out changing saturation
//add xxx lvl yyy instead of just level at the top so people can discover pokemon, maybe ??? at the beginning
//future: add even more pokemon, more rare pokemon that people don't know about, also animations for upgrading and winning, animation for transforming
//add pokemon sound for tips, problem solved, and sound for upgrade (longer sound), choose your pokemoon packground texture of slightly worn page in book
//if you are top of leaderboard or top of something your top pokemon or last pokemon trained with becomes hollo/shiny, tip animation of size bopping

// Evolution chains with level thresholds
const evolutionChains = {
  Pichu: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/pichu.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/pikachu.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/raichu.png" },
  ],
  Squirtle: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/squirtle.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/wartortle.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/blastoise.png" },
  ],
  Charmander: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/charmander.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/charmeleon.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/charizard.png" },
  ],
  Bublasaur: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/bulbasaur.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/ivysaur.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/venusaur.png" },
  ],
  Caterpie: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/caterpie.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/metapod.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/butterfree.png" },
  ],
  Magnemite: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/magnemite.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/magneton.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/magnezone.png" },
  ],
  Pidgey: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/pidgey.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/pidgeotto.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/pidgeot.png" },
  ],
  Cleffa: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/cleffa.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/clefairy.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/clefable.png" },
  ],
  Zubat: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/zubat.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/golbat.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/crobat.png" },
  ],
  Mankey: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/mankey.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/primeape.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/scarlet-violet/normal/annihilape.png" },
  ],
  Poliwag: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/poliwag.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/poliwhirl.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/poliwrath.png" },
  ],
  Abra: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/abra.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/kadabra.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/alakazam.png" },
  ],
  Machop: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/machop.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/machoke.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/machamp.png" },
  ],
  Geodude: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/geodude.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/graveler.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/golem.png" },
  ],
  Gastly: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/gastly.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/haunter.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/gengar.png" },
  ],
  Porygon: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/porygon.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/porygon2.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/porygon-z.png" },
  ],
  Dratini: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/dratini.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/dragonair.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/dragonite.png" },
  ],
  Cyndaquil: [
    { level: 0, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/cyndaquil.png" },
    { level: 20, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/quilava.png" },
    { level: 75, image: "https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/typhlosion.png" },
  ]
};

function App() {
  var tipsList = [
    "Take care of your mental health in this major. Find some healthy coping mechanisms like working out or going for walks.",
    "Have personal projects. Work on things in your free time to further your skills.",
    "Take a shower. Please. Do not make the CS major allegations true.",
    "Explore different tracks and find what works for you. SWE/ML may not be for you and that's okay.",
    "Take some fun classes. ",
    "Comparison is the thief of joy. It's easy to feel discouraged with so many smart people around. Focus on your own goals and know you'll get there too.",
    "Apply to internships early. Do not wait until spring semester to look for summer opportunities.",
    "Try to find at least one internship before your senior year.",
    "If you don't like having to learn an adapt, CS may not be for you.",
    "Don't trust/use Chat-GPT 100%. It will bite you in the butt. You're going to Purdue for CS, not GPT.",
    "Have 2 friend groups. You don't want a falling out with friends to cause you to spiral.",
    "Don't hold back from things because you're not confident enough. You got this.",
    "Talk to people in your CS classes. Try to make friends because it's a lot less painful to suffer through CS classes together.",
    "Try to tailor your resume towards the position and company your are applying to.",
    "Chat-GPT is a great tool for explaining things. Do not get reliant on it.",
    "It's not the end of the world if you have to retake a class. Just get that Purdue Grit and you'll be good.",
    "Procrastination will ruin your college experience. Build good time-management habits.",
    "Plan your schedule carefully. Balance hard and easy classes each semester.",
    "Attend career fairs, even as a freshman. It’s great practice and you’ll make valuable connections.",
    "Learn to use Git/GitHub early. Version control is essential for coding projects.",
    "Start building your LinkedIn profile. Connect with peers, professors, and recruiters.",
    "Use Purdue’s free resources, like the writing lab or counseling services. They’re there to help you.",
    "Don't ignore your gen-ed courses. They’re a good way to explore interests outside CS.",
    "Form study groups for hard classes. Two minds are often better than one.",
    "Don’t be afraid to ask questions in class. Professors appreciate engaged students.",
    "Get familiar with Purdue’s Brightspace and myPurdue systems. It’ll save you time and stress.",
    "Experiment with different programming languages. Java, Python, and C++ are just the start.",
    "Practice coding on LeetCode or HackerRank. It’s great prep for technical interviews.",
    "Take notes by hand during lectures. It can help with retention and focus.",
    "Learn to manage stress during exams. Use breathing exercises or take short breaks.",
    "Office hours aren't just for help. Use them to build relationships with professors.",
    "Don’t overload your schedule with too many extracurriculars. Leave time for yourself.",
    "Use the Purdue CoRec to stay active. Physical fitness boosts mental performance.",
    "Stay up-to-date with the syllabus. Professors won’t remind you about every deadline.",
    "Don’t expect to understand everything immediately. CS concepts take time to sink in.",
    "Learn the basics of UNIX and command-line tools. You’ll use them throughout your degree.",
    "Celebrate small wins. Finishing an assignment or understanding a tough concept is worth acknowledging."
  ];

  function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  var tipsList = randomizeArray(tipsList);
  var tipIndex = 0;

  const [level, setLevel] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [cookiesEaten, setCookiesEaten] = useState(0);
  const [steakEaten, setSteakEaten] = useState(0);
  const [gapplesEaten, setGapplesEaten] = useState(0);
  const [showTextBox, setShowTextBox] = useState(false);

  const handleClick = () => {
    setShowTextBox(!showTextBox); // Toggle the text box visibility
    if (showTextBox) {
      tipIndex++;
    }
  };

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
          width: '18vw',
          margin: '0 auto',
          border: '1px solid #ccc',
          padding: '20px',
          height: '90vh',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          boxShadow: 'inset 0 0 0 5px #e0e0e0',
          textAlign: 'center',
          backgroundColor: '#f8f8f8'
        }}
      >
        <img src={"BOILERMON.png"} style = {{width: "8vw", margin: "0 auto"}}></img>
        <h2 style = {{margin: "0vh", marginTop: "3vh"}}>Choose Your Pokémon!</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '0vh' }}>
          {Object.keys(evolutionChains).map((pokemonName) => (
            <div key={pokemonName} style={{ textAlign: 'center' }}>
              <img
                src={evolutionChains[pokemonName][0].image}
                alt={pokemonName}
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={() => setSelectedPokemon({ name: pokemonName })}
              />
              <p style={{margin:"0vh"}}>{pokemonName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container"
      style={{
        width: '50vh',
        margin: '0 auto',
        border: '1px solid #ccc',
        padding: '20px',
        height: '95vh',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      {/* Background Music */}
      <audio src={backgroundMusic} autoPlay loop />

      {/* Main Content */}
      {level < 100 ? (
        <>
          <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '95vh',
              flexDirection: 'column', // Stack elements vertically
            }}>
            {/* Level display */}
            <h2 style={{color: 'white', marginTop: '56vh', marginBottom: '-2vh'}}>
              {displayedImage.match(/\/([^\/]+)\.png$/)[1].charAt(0).toUpperCase() + displayedImage.match(/\/([^\/]+)\.png$/)[1].slice(1)} lvl. {level}
            </h2>
            <img src={displayedImage} alt="Pokemon" style={{ width: '18vw', height: 'auto', padding: '0px'}} className="bouncy" onClick = {handleClick}/>
            {showTextBox && (
              <div style={{
                marginTop: '-4vh',
                marginBottom: '5vh', // Position the text box above the image
                padding: '10px',
                border: '1px solid gray',
                borderRadius: '5px',
                backgroundColor: '#f8f8f8',
                width: '80%',
                textAlign: 'center'
              }}>
                {tipsList[tipIndex]}
              </div>
            )}
          </div>

          {/* Food Buttons */}
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
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
            height: '120vh',
            textAlign: 'center',
          }}>
          <p style={{ fontSize: '19px', color: "white", fontWeight: 'bold', backgroundColor: "#333333"}}>Congradulations on fully evolving your Pokemon!</p>
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
            }}>Continue</button>
        </div>
      )}
    </div>
  );
}

export default App;
