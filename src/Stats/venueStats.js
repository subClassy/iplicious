import matches from "./data/matches.json";
import teams from "./data/teams.json";
import balls from "./data/balls.json";
import { getVenueString } from "./commonStats";

async function homeWinsRatio(venue) {
  let homeWins = new Map();
  homeWins.set("Wins", 0);
  homeWins.set("Loses", 0);
  homeWins.set("No Result", 0);

  let associatedTeams = [];
  if (venue === "all") {
    venue = getVenueString();
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (venue.includes(match.Venue_Name)) {
      associatedTeams.push(match.Team_Name_Id);

      let currentTotal = 0;
      if (match.Team_Name_Id === match.Match_Winner_Id) {
        currentTotal = homeWins.get("Wins") + 1;
        homeWins.set("Wins", currentTotal);
      } else if (match.Opponent_Team_Id === match.Match_Winner_Id) {
        currentTotal = homeWins.get("Loses") + 1;
        homeWins.set("Loses", currentTotal);
      } else if (match.IS_Result === 0) {
        currentTotal = homeWins.get("No Result") + 1;
        homeWins.set("No Result", currentTotal);
      }
    }
  }
  associatedTeams = associatedTeams.filter(
    (item, i, ar) => ar.indexOf(item) === i
  );

  if (associatedTeams.length <= 6) {
    const teamNames = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      if (associatedTeams.indexOf(team.Team_Id) !== -1) {
        teamNames.push(team.Team_Short_Code);
      }
    }
    homeWins.set("Home Team", teamNames.join(" / "));
  } else {
    homeWins.set("Home Team", "Multiple Teams");
  }

  return homeWins;
}

async function battingFirstWinsRatio(venue) {
  let battingFirst = new Map();
  battingFirst.set("Wins", 0);
  battingFirst.set("Loses", 0);
  battingFirst.set("No Result", 0);

  let associatedTeams = [];
  if (venue === "all") {
    venue = getVenueString();
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (venue.includes(match.Venue_Name)) {
      associatedTeams.push(match.Team_Name_Id);

      let currentTotal = 0;
      if (match.IS_Result === 0) {
        currentTotal = battingFirst.get("No Result") + 1;
        battingFirst.set("No Result", currentTotal);
      } else if (
        (match.Toss_Winner_Id === match.Match_Winner_Id &&
          match.Toss_Decision === "bat") ||
        (match.Toss_Winner_Id !== match.Match_Winner_Id &&
          match.Toss_Decision === "field")
      ) {
        currentTotal = battingFirst.get("Wins") + 1;
        battingFirst.set("Wins", currentTotal);
      } else {
        currentTotal = battingFirst.get("Loses") + 1;
        battingFirst.set("Loses", currentTotal);
      }
    }
  }

  return battingFirst;
}

async function overProgression(venue) {
  let oversMap_battingFirst = new Map();
  let oversMap_battingSecond = new Map();
  if (venue === "all") {
    venue = getVenueString();
  }

  let jStarting = 0;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    for (let j = jStarting; j < matches.length; j++) {
      const match = matches[j];
      if (
        ball.Match_Id === match.Match_Id &&
        venue.includes(match.Venue_Name)
      ) {
        jStarting = j;
        if (
          (match.Toss_Decision === "bat" &&
            match.Toss_Winner_Id === ball.Team_Batting_Id) ||
          (match.Toss_Decision === "field" &&
            match.Toss_Winner_Id === ball.Team_Bowling_Id)
        ) {
          let currentTotal = 0;
          if (oversMap_battingFirst.has(ball.Over_Id)) {
            currentTotal = oversMap_battingFirst.get(ball.Over_Id);
          }
          if (typeof ball.Batsman_Scored === "number") {
            currentTotal += ball.Batsman_Scored;
          }
          if (typeof ball.Extra_Runs === "number") {
            currentTotal += ball.Extra_Runs;
          }
          oversMap_battingFirst.set(ball.Over_Id, currentTotal);
        } else {
          let currentTotal = 0;
          if (oversMap_battingSecond.has(ball.Over_Id)) {
            currentTotal = oversMap_battingSecond.get(ball.Over_Id);
          }
          if (typeof ball.Batsman_Scored === "number") {
            currentTotal += ball.Batsman_Scored;
          }
          if (typeof ball.Extra_Runs === "number") {
            currentTotal += ball.Extra_Runs;
          }
          oversMap_battingSecond.set(ball.Over_Id, currentTotal);
        }
      }
    }
  }

  return [oversMap_battingFirst, oversMap_battingSecond];
}

export { homeWinsRatio, battingFirstWinsRatio, overProgression };
