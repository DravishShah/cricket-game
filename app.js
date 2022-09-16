"use strict";

const scoreImg = document.querySelector(".userScoreImg");
const compScoreImg = document.querySelector(".compScoreImg");
const compCurrentScore = document.querySelector(".current-comp");

const userScore = document.querySelector(".user-score");
const compScore = document.querySelector(".comp-score");

const user = document.querySelector(".player1");
const comp = document.querySelector(".player2");
const inningScore = document.querySelector(".inning-score");

//--------------------------------------
// document.querySelector(".score-btn").addEventListener("click", function () {
//   const currentScore = Number(document.querySelector(".user-current").value);
//   // console.log(currentScore);
//   if (!currentScore || currentScore >= 7 || currentScore < 1) {
//     alert("Invalid!! Enter number from the range 1 to 6");
//   } else {
//     scoreImg.src = `./Images/${currentScore}.png`;
//     let botCurrentScore = Math.trunc(Math.random() * 6) + 1;
//     compScoreImg.src = `./Images/${botCurrentScore}.png`;
//     compCurrentScore.textContent = botCurrentScore;
//     if (botCurrentScore !== currentScore) {
//       // console.log(true);
//       score = score + currentScore;
//       userScore.textContent = score;
//     } else {
//       user.classList.toggle("player-active");
//       comp.classList.toggle("player-active");
//       userScore.classList.toggle("score-hidden");
//       compScore.classList.toggle("score-hidden");
//       inningScore.textContent = `You Scored ${score} runs and now Computer needs ${
//         score + 1
//       } runs to win`;
//       compCurrentScore.textContent = 0;
//       botCurrentScore = 0;
//       console.log(botCurrentScore);
//     }
//   }
// });
//----------------------------------------

let scores, botCurrentScore, playing, currentScore, activePlayer, x;

const init = function () {
  scores = [0, 0];
  x = true;
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  compScoreImg.classList.add("hiddenImg");
  scoreImg.classList.add("hiddenImg");
  userScore.textContent = "";
  compCurrentScore.textContent = "";
};

init();
// code for Bot Batting
const switchPlayer = function (scores) {
  user.classList.toggle("player-active");
  comp.classList.toggle("player-active");
  compScore.classList.toggle("score-hidden");
  userScore.classList.toggle("score-hidden");
  userScore.textContent = "";
  compCurrentScore.textContent = "";
  activePlayer = 1;
  botCurrentScore = 0;

  document.querySelector(".score-btn").addEventListener("click", function () {
    if (playing) {
      botCurrentScore = Math.trunc(Math.random() * 6) + 1;

      currentScore = Number(document.querySelector(".user-current").value);
      if (!currentScore || currentScore >= 7 || currentScore < 0) {
        alert("Invalid!! Enter number from the range 1 to 6");
        scores[activePlayer] = scores[activePlayer] - botCurrentScore;
      }

      console.log(botCurrentScore);
      console.log(scores[activePlayer]);
      compCurrentScore.textContent = botCurrentScore;
      compScoreImg.src = `./Images/${botCurrentScore}.png`;
      scoreImg.src = `./Images/${currentScore}.png`;

      if (botCurrentScore !== currentScore) {
        if (scores[activePlayer - 1] >= scores[activePlayer]) {
          scores[activePlayer] = scores[activePlayer] + botCurrentScore;
          compScore.textContent = scores[activePlayer];
        }
      }

      if (botCurrentScore === currentScore) {
        if (scores[activePlayer - 1] > scores[activePlayer]) {
          inningScore.textContent = `You Won the Game`;
          playing = false;
        } else if (scores[activePlayer - 1] === scores[activePlayer]) {
          inningScore.textContent = `Scores are tied | Match Finished. `;
          playing = false;
        }
      }
    }
    if (scores[activePlayer] > scores[activePlayer - 1]) {
      compScore.textContent = scores[activePlayer];
      inningScore.textContent = `Computer Won the Game`;
      playing = false;
    }
  });
};
// Code for User Batting
document.querySelector(".score-btn").addEventListener("click", function () {
  if (playing && x) {
    currentScore = Number(document.querySelector(".user-current").value);
    // console.log(currentScore);
    if (!currentScore || currentScore >= 7 || currentScore < 0) {
      alert("Invalid!! Enter number from the range 1 to 6");
      scores[activePlayer] = scores[activePlayer] - currentScore;
    }

    botCurrentScore = Math.trunc(Math.random() * 6) + 1;
    // console.log(botCurrentScore);
    //display Current Score for both
    compCurrentScore.textContent = botCurrentScore;
    //display img
    compScoreImg.classList.remove("hiddenImg");
    scoreImg.classList.remove("hiddenImg");
    compScoreImg.src = `./Images/${botCurrentScore}.png`;
    scoreImg.src = `./Images/${currentScore}.png`;

    if (botCurrentScore !== currentScore) {
      scores[activePlayer] = scores[activePlayer] + currentScore;
      userScore.textContent = scores[activePlayer];
    } else {
      inningScore.textContent = `You Scored ${
        scores[activePlayer]
      } runs and now Computer needs ${scores[activePlayer] + 1} runs to win`;
      x = false;
      switchPlayer(scores);
    }
  }
});

//Code for NewGAme
document.querySelector(".btn--new").addEventListener("click", function () {
  window.location.reload();
});
