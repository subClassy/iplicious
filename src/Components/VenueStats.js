import React from "react";
import { Divider, Cascader } from "antd";
import { getYears } from "../Stats/commonStats";

import "../App.scss";

let yearOptions = getYears().map((year) => {
  const obj = { value: year, label: year };
  return obj;
});

yearOptions.push({ value: "allTime", label: "All Time" });

class VenueStats extends React.Component {
  state = {
    yearOptions: yearOptions,
    dotBallsFilter: "allTime",
    extrasConcededFilter: "allTime",
    dismissalTypeFilter: "allTime",
    mostDotBalls: [],
    mostExtrasConceded: [],
    dismissalType: [],
  };

  filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  render() {
    return (
      <div>
        <h2 className="stat-heading">Batting Stats</h2>
        <Divider />
        <div className="stat-subdiv">
          <div className="heading">
            <h2 className="stat-subheading">Most Dot Bowls</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.yearOptions}
                onChange={this.onDotBallsFilterChange}
                defaultValue={["allTime"]}
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
            <h2 className="stat-subheading">Most Extras Conceded</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.yearOptions}
                onChange={this.onExtrasConcededFilterChange}
                defaultValue={["allTime"]}
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
            <h2 className="stat-subheading">Dismissals Type</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.yearOptions}
                onChange={this.onDismissalTypeFilterChange}
                defaultValue={["allTime"]}
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
