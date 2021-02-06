import { useState } from 'react';
import 'milligram';

import './App.css';


function generateSecret() {

  var sec = [];

  // ensure each randomly generated digit is not repeated
  while (sec.length < 4) {
    var digit = Math.floor(Math.random() * 10); // random digit from 0-9
    if (!sec.includes(digit)) {
      sec.push(digit);
    }
  }
  return sec.join("");

}

function App() {
  const [secret, setSecret] = useState(generateSecret());
  const [guesses, setGuesses] = useState([]);
  const [text, setText] = useState("");
  const [badFlag, setBadFlag] = useState(false);
  const [bullreports, setBullReports] = useState([]);
  const [cowreports, setCowReports] = useState([]);
  const [winFlag, setWinFlag] = useState(false);

  let warning = null;
  if (badFlag) {
    warning = <p> Input must be four unique digits! </p>;
  }
  else if (winFlag) {
    warning = <p> You won! Secret was: {secret} Reset to play again. </p>
  }
  else if (guesses.length === 8) {
    warning = <p>Game over! Secret was: {secret}</p>;
  }

  function reset() {
    setSecret(generateSecret());
    setGuesses([]);
    setText("");
    setBadFlag(false);
    setBullReports([]);
    setCowReports([]);
    setWinFlag(false);
  }

  // this function is attributed to Nat Tuck's lecture 4 class code
  function updateText(ev) {
    let vv = ev.target.value;
    setText(vv);
  }

  function guess() {

    var textArr = text.split('');
    // if the text is not 4 numbers long, is not a number, or contains duplicate
    // digits, we display a message and discard the text
    if (winFlag || guesses.length === 8) {
      return;
    }

    if (text.length != 4 || isNaN(text)
    || new Set(textArr).size !== text.length) {
          setBadFlag(true);
          setText("");
    }
    else {
          setBadFlag(false);
          setGuesses(guesses.concat(text));

          let reps = getReport(textArr);

          setBullReports(bullreports.concat(reps[0]));
          setCowReports(cowreports.concat(reps[1]));

          if (reps[0] === 4) {
            setWinFlag(true);
          }

          setText("");

    }

  }

  function getReport(textArr) {
    let secArray = secret.split('');
    let bulls = 0;
    let cows = 0;
    for (var i = 0; i < 4; i++) {
      if (textArr[i] === secArray[i]) {
        bulls++;
      }
      else if (secArray.includes(textArr[i])) {
        cows++;
      }
    }
    return [bulls, cows];
  }

  // this function is attributed to Nat Tuck's lecture 4 class code
  function keyPress(ev) {
    if (ev.key === "Enter") {
      guess();
    }

  }


  return (
    <div className="App">
      <h1>Bulls and Cows</h1>
      <p>
        <input type="text" value={text} onChange={updateText}
                                        onKeyPress={keyPress}/>
        <button onClick={guess}>Guess</button>
        <button onClick={reset}>Reset</button>
      </p>
        {warning}
      <p>Guess 1: {guesses[0]}  Bulls: {bullreports[0]}
      Cows: {cowreports[0]} </p>
      <p>Guess 2: {guesses[1]}  Bulls: {bullreports[1]}
      Cows: {cowreports[1]} </p>
      <p>Guess 3: {guesses[2]}  Bulls: {bullreports[2]}
      Cows: {cowreports[2]} </p>
      <p>Guess 4: {guesses[3]}  Bulls: {bullreports[3]}
      Cows: {cowreports[3]} </p>
      <p>Guess 5: {guesses[4]}  Bulls: {bullreports[4]}
      Cows: {cowreports[4]} </p>
      <p>Guess 6: {guesses[5]}  Bulls: {bullreports[5]}
      Cows: {cowreports[5]} </p>
      <p>Guess 7: {guesses[6]}  Bulls: {bullreports[6]}
      Cows: {cowreports[6]} </p>
      <p>Guess 8: {guesses[7]}  Bulls: {bullreports[7]}
      Cows: {cowreports[7]} </p>

    </div>
  );
}


export default App;
