import React from "react";
import { Divider, Cascader, Card, Statistic } from "antd";
import { getYears } from "../Stats/commonStats";
import { runsScoredAtDeath } from "../Stats/battingStats";

import "../App.scss";

let yearOptions = getYears().map((year) => {
  const obj = { value: year, label: year };
  return obj;
});

yearOptions.push({ value: "allTime", label: "All Time" });

function highestRunGetterStat(highestRunGetterMap) {
  let cards = [];
  for (const [key, value] of highestRunGetterMap) {
    cards.push(
      <Card key={key} className="stat-card">
        <Statistic title={key} value={value} suffix="Runs" />
      </Card>
    );
  }
  return cards;
}

class BattingStats extends React.Component {
  state = {
    yearOptions: yearOptions,
    runsFilter: "allTime",
    partnershipFilter: "allTime",
    highestRunGetters: [],
  };

  onRunsFilterChange = (value) => {
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
    this.setState({ partnershipFilter: value[0] });
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
            {highestRunGetterStat(this.state.highestRunGetters)}
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
          <div className="stats-container highestRunGetter-stat">
            {highestRunGetterStat(this.state.highestRunGetters)}
          </div>
          <Divider />
        </div>
      </div>
    );
  }
}

export default BattingStats;
