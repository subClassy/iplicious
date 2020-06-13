import matches from "./data/matches.json";

function getYears() {
  let years = matches.map((match) => {
    let year = match.Match_Date.split("-")[2];
    year = `20${year}`;
    return year;
  });
  years = years.filter((item, i, ar) => ar.indexOf(item) === i);
  return years;
}

function getYearString() {
  const years = getYears();
  return years.join("");
}

function getVenues() {
  let venues = matches.map((match) => {
    return `${match.Venue_Name}, ${match.City_Name}`;
  });
  venues = venues.filter((item, i, ar) => ar.indexOf(item) === i);
  return venues;
}

function getVenueString() {
  const venues = getVenues();
  return venues.join("");
}

export { getYears, getYearString, getVenues, getVenueString };
