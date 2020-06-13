import React from "react";
import { Divider, Cascader } from "antd";
import { getVenues } from "../Stats/commonStats";
import {
  homeWinsRatio,
  battingFirstWinsRatio,
  overProgression,
} from "../Stats/venueStats";
import OverProgressionChart from "./VenuePresentationComponents/OverProgressionChart";

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
    batFirstAdvantageFilter: "all",
    overProgFilter: "all",
    homeAdvantageStats: [],
    batFirstAdvantageStats: [],
    overProgStats: [],
  };

  onHomeAdvantageFilterChange = (value) => {
    if (value.length === 0) {
      value.push("all");
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

  onBatFirstAdvantageFilterChange = (value) => {
    if (value.length === 0) {
      value.push("all");
    }
    this.setState({ batFirstAdvantageFilter: value[0] }, () => {
      const batFirstAdvantage = battingFirstWinsRatio(
        this.state.batFirstAdvantageFilter
      );
      batFirstAdvantage.then((val) => {
        this.setState({
          batFirstAdvantageStats: val,
        });
      });
    });
  };

  onOverProgFilterChange = (value) => {
    if (value.length === 0) {
      value.push("all");
    }
    this.setState({ overProgFilter: value[0] }, () => {
      const overProgressionStats = overProgression(this.state.overProgFilter);
      overProgressionStats.then((val) => {
        this.setState({
          overProgStats: val,
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
    const batFirstAdvantageStats = await battingFirstWinsRatio(
      this.state.batFirstAdvantageFilter
    );
    this.setState({
      batFirstAdvantageStats,
    });
    const overProgStats = await overProgression(this.state.overProgFilter);
    this.setState({
      overProgStats,
    });
  }

  render() {
    overProgression("all");
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
        <div className="stat-subdiv">
          <div className="heading">
            <h2 className="stat-subheading">To Chase or Not to Chase</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.venueOptions}
                onChange={this.onBatFirstAdvantageFilterChange}
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
        <div className="stat-subdiv">
          <div className="heading">
            <h2 className="stat-subheading">When can I score?</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.venueOptions}
                onChange={this.onOverProgFilterChange}
                defaultValue={["all"]}
                showSearch={this.filter}
              />
            </div>
          </div>
          <div className="stats-container highestRunGetter-stat">
            <OverProgressionChart overProgression={this.state.overProgStats} />
          </div>
          <Divider />
        </div>
      </div>
    );
  }
}

export default VenueStats;
