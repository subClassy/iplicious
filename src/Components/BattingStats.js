import React from "react";
import { Divider, Cascader } from "antd";
import { getYears } from "../Stats/commonStats";
import { runsScoredAtDeath } from "../Stats/battingStats";

import "../App.scss";

let yearOptions = getYears().map((year) => {
  const obj = { value: year, label: year };
  return obj;
});

yearOptions.push({ value: "allTime", label: "All Time" });

class BattingStats extends React.Component {
  state = {
    yearOptions: yearOptions,
  };

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  render() {
    runsScoredAtDeath("allTime");
    return (
      <div>
        <h2 className="stat-heading">Batting Stats</h2>
        <Divider />
        <div className="stat-subdiv">
          <h2 className="stat-subheading">Most Runs Scored in Death Overs</h2>
          <div className="filter">
            <label>Filter: </label>
            <Cascader
              options={this.state.yearOptions}
              onChange={this.onChange}
              defaultValue={["allTime"]}
              showSearch={this.filter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BattingStats;
