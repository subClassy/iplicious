import React from "react";
import { Divider, Cascader } from "antd";
import { getVenues } from "../Stats/commonStats";
import { homeWinsRatio } from "../Stats/venueStats";

import "../App.scss";

let venueOptions = getVenues().map((venue) => {
  const obj = { value: venue, label: venue };
  return obj;
});

venueOptions.push({ value: "all", label: "All" });

class VenueStats extends React.Component {
  state = {
    venueOptions: venueOptions,
    homeAdvantageFilter: "all",
    homeAdvantageStats: [],
  };

  onHomeAdvantageFilterChange = (value) => {
    if (value.length === 0) {
      value.push("allTime");
    }
    this.setState({ homeAdvantageFilter: value[0] }, () => {
      const homeAdvantage = homeWinsRatio(this.state.homeAdvantageFilter);
      homeAdvantage.then((val) => {
        this.setState({
          homeAdvantageStats: val,
        });
      });
    });
  };

  filter = (inputValue, path) => {
    console.log(inputValue.toLowerCase());
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  async componentDidMount() {
    const homeAdvantageStats = await homeWinsRatio(
      this.state.homeAdvantageFilter
    );
    this.setState({
      homeAdvantageStats,
    });
  }

  render() {
    return (
      <div>
        <h2 className="stat-heading">Venue Stats</h2>
        <Divider />
        <div className="stat-subdiv">
          <div className="heading">
            <h2 className="stat-subheading">Home Advantage</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.venueOptions}
                onChange={this.onHomeAdvantageFilterChange}
                defaultValue={["all"]}
                showSearch={this.filter}
              />
            </div>
          </div>
          <div className="stats-container highestRunGetter-stat">
            {/* <DeathRuns highestRunGetters={this.state.highestRunGetters} /> */}
          </div>
          <Divider />
        </div>
      </div>
    );
  }
}

export default VenueStats;
