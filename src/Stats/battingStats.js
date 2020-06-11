import balls from "./data/balls.json";
import matches from "./data/matches.json";
import { getYearString } from "./commonStats";

async function runsScoredAtDeath(year) {
  let runsScored = new Map();
  if (year === "allTime") {
    year = getYearString();
  }
  balls.forEach((ball) => {
    matches.forEach((match) => {
      if (year.includes(match.Match_Date.split("-")[2])) {
        if (
          ball.Match_Id === match.Match_Id &&
          ball.Over_Id >= 16 &&
          typeof ball.Batsman_Scored === "number"
        ) {
          if (runsScored.has(ball.Striker_Id)) {
            let currentScore = runsScored.get(ball.Striker_Id);
            currentScore = currentScore + ball.Batsman_Scored;
            runsScored.set(ball.Striker_Id, currentScore);
          } else {
            runsScored.set(ball.Striker_Id, ball.Batsman_Scored);
          }
        }
      }
    });
  });
  console.log(runsScored);
}

export { runsScoredAtDeath };
