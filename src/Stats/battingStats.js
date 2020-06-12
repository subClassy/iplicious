import balls from "./data/balls.json";
import matches from "./data/matches.json";
import players from "./data/players.json";
import { getYearString } from "./commonStats";

async function runsScoredAtDeath(year) {
  let runsScored = new Map();
  if (year === "allTime") {
    year = getYearString();
  }

  let jStarting = 0;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (ball.Over_Id >= 16 && typeof ball.Batsman_Scored === "number") {
      for (let j = jStarting; j < matches.length; j++) {
        const match = matches[j];
        if (
          ball.Match_Id === match.Match_Id &&
          year.includes(match.Match_Date.split("-")[2])
        ) {
          jStarting = j;
          if (runsScored.has(ball.Striker_Id)) {
            let currentScore = runsScored.get(ball.Striker_Id);
            currentScore = currentScore + ball.Batsman_Scored;
            runsScored.set(ball.Striker_Id, currentScore);
          } else {
            runsScored.set(ball.Striker_Id, ball.Batsman_Scored);
          }
          break;
        }
      }
    }
  }
  const sortedRunsScored = new Map(
    [...runsScored.entries()].sort((a, b) => b[1] - a[1])
  );
  let count = 0;
  let highestRunGetters = new Map();
  for (const [key, value] of sortedRunsScored) {
    count += 1;
    if (count === 4) {
      break;
    }
    highestRunGetters.set(players[key - 1].Player_Name, value);
  }

  return highestRunGetters;
}

export { runsScoredAtDeath };
