import balls from "./data/balls.json";
import matches from "./data/matches.json";
import players from "./data/players.json";
import { getYearString } from "./commonStats";

async function dotBalls(year) {
  let dotBalls = new Map();
  if (year === "allTime") {
    year = getYearString();
  }

  let jStarting = 0;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (
      (ball.Batsman_Scored === 0 || ball.Batsman_Scored === "") &&
      ["wides", "noballs"].indexOf(ball.Extra_Type) === -1
    ) {
      //   if (["byes", "legbyes", "penalty"].indexOf(ball.Extra_Type) !== -1) {
      for (let j = jStarting; j < matches.length; j++) {
        const match = matches[j];
        if (
          ball.Match_Id === match.Match_Id &&
          year.includes(match.Match_Date.split("-")[2])
        ) {
          jStarting = j;
          let currentTotal = 0;
          if (dotBalls.has(ball.Bowler_Id)) {
            currentTotal = dotBalls.get(ball.Bowler_Id);
          }
          currentTotal += 1;
          dotBalls.set(ball.Bowler_Id, currentTotal);
        }
      }
      //   }
    }
  }

  dotBalls = new Map([...dotBalls.entries()].sort((a, b) => b[1] - a[1]));

  let count = 0;
  let mostDotBalls = new Map();
  for (const [key, value] of dotBalls) {
    count += 1;
    if (count === 4) {
      break;
    }
    mostDotBalls.set(players[key - 1].Player_Name, value);
  }

  return mostDotBalls;
}

async function extrasConceded(year) {
  let extras = new Map();
  if (year === "allTime") {
    year = getYearString();
  }

  let jStarting = 0;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (typeof ball.Extra_Runs === "number") {
      for (let j = jStarting; j < matches.length; j++) {
        const match = matches[j];
        if (
          ball.Match_Id === match.Match_Id &&
          year.includes(match.Match_Date.split("-")[2])
        ) {
          jStarting = j;
          let currentTotal = 0;
          if (extras.has(ball.Bowler_Id)) {
            currentTotal = extras.get(ball.Bowler_Id);
          }
          currentTotal += ball.Extra_Runs;
          extras.set(ball.Bowler_Id, currentTotal);
        }
      }
    }
  }

  extras = new Map([...extras.entries()].sort((a, b) => b[1] - a[1]));

  let count = 0;
  let mostExtras = new Map();
  for (const [key, value] of extras) {
    count += 1;
    if (count === 4) {
      break;
    }
    mostExtras.set(players[key - 1].Player_Name, value);
  }

  return mostExtras;
}

async function typeOfDismissals(year) {
  let dismissals = new Map();
  if (year === "allTime") {
    year = getYearString();
  }

  let jStarting = 0;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (typeof ball.Player_dissimal_Id === "number") {
      for (let j = jStarting; j < matches.length; j++) {
        const match = matches[j];
        if (
          ball.Match_Id === match.Match_Id &&
          year.includes(match.Match_Date.split("-")[2])
        ) {
          jStarting = j;
          let currentScore = 0;
          if (dismissals.has(ball.Dissimal_Type)) {
            currentScore = dismissals.get(ball.Dissimal_Type);
          }
          currentScore += 1;
          dismissals.set(ball.Dissimal_Type, currentScore);
        }
      }
    }
  }
  dismissals = new Map([...dismissals.entries()].sort((a, b) => a[0] - b[0]));

  return dismissals;
}

export { dotBalls, extrasConceded, typeOfDismissals };
