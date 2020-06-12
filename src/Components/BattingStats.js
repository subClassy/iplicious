import React from "react";
import { Divider, Cascader } from "antd";
import { getYears } from "../Stats/commonStats";
import { runsScoredAtDeath, partnershipDuo } from "../Stats/battingStats";
import PartnershipStat from "./BattingPresentationComponents/PartnershipStat";
import DeathRuns from "./BattingPresentationComponents/DeathRuns";

import "../App.scss";

let yearOptions = getYears().map((year) => {
  const obj = { value: year, label: year };
  return obj;
});

yearOptions.push({ value: "allTime", label: "All Time" });

class BattingStats extends React.Component {
  state = {
    yearOptions: yearOptions,
    runsFilter: "allTime",
    partnershipFilter: "allTime",
    highestRunGetters: [],
    bestPartnerships: [],
  };

  onRunsFilterChange = (value) => {
    if (value.length === 0) {
      value.push("allTime");
    }
    this.setState({ runsFilter: value[0] }, () => {
      const highestRunGetters = runsScoredAtDeath(this.state.runsFilter);
      highestRunGetters.then((val) => {
        this.setState({
          highestRunGetters: val,
        });
      });
    });
  };

  onPartnershipFilterChange = (value) => {
    if (value.length === 0) {
      value.push("allTime");
    }
    this.setState({ partnershipFilter: value[0] }, () => {
      const bestPartnerships = partnershipDuo(this.state.partnershipFilter);
      bestPartnerships.then((val) => {
        this.setState({
          bestPartnerships: val,
        });
      });
    });
  };

  filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  async componentDidMount() {
    const highestRunGetters = await runsScoredAtDeath(this.state.runsFilter);
    this.setState({
      highestRunGetters,
    });
    const bestPartnerships = await partnershipDuo(this.state.partnershipFilter);
    this.setState({
      bestPartnerships,
    });
  }

  render() {
    return (
      <div>
        <h2 className="stat-heading">Batting Stats</h2>
        <Divider />
        <div className="stat-subdiv">
          <div className="heading">
            <h2 className="stat-subheading">Most Runs Scored in Death Overs</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.yearOptions}
                onChange={this.onRunsFilterChange}
                defaultValue={["allTime"]}
                showSearch={this.filter}
              />
            </div>
          </div>
          <div className="stats-container highestRunGetter-stat">
            <DeathRuns highestRunGetters={this.state.highestRunGetters} />
          </div>
          <Divider />
        </div>
        <div className="stat-subdiv">
          <div className="heading">
            <h2 className="stat-subheading">Best Partnership Duo</h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.yearOptions}
                onChange={this.onPartnershipFilterChange}
                defaultValue={["allTime"]}
                showSearch={this.filter}
              />
            </div>
          </div>
          <div className="stats-container bestPartnership-stat">
            <PartnershipStat bestPartnerships={this.state.bestPartnerships} />
          </div>
          <Divider />
        </div>
      </div>
    );
  }
}

export default BattingStats;
