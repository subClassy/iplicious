import React from "react";
import { Divider, Cascader, Card, Statistic } from "antd";
import { ResponsiveChord } from "@nivo/chord";
import { getYears } from "../Stats/commonStats";
import { runsScoredAtDeath, partnershipDuo } from "../Stats/battingStats";

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

function partnershipStat(bestPartnerships) {
  let statMatrix = [];
  let playerList = bestPartnerships.map((partnership) => {
    return Object.keys(partnership);
  });

  playerList = [...new Set(playerList.flat())];

  statMatrix = playerList.map((player1) => {
    let runScored = [];
    for (let i = 0; i < playerList.length; i++) {
      const player2 = playerList[i];
      if (player1 === player2) {
        runScored.push(0);
        continue;
      }
      let partnershipExists = false;
      bestPartnerships.forEach((partnership) => {
        if (
          Object.keys(partnership).indexOf(player2) !== -1 &&
          Object.keys(partnership).indexOf(player1) !== -1
        ) {
          partnershipExists = true;
          runScored.push(partnership[player1]);
        }
      });
      if (!partnershipExists) {
        runScored.push(0);
      }
    }
    return runScored;
  });
  return (
    <div className="partnership-chart-container">
      <ResponsiveChord
        matrix={statMatrix}
        keys={playerList.map((player) => {
          return player;
        })}
        margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
        arcOpacity={0.8}
        arcBorderWidth={1}
        arcBorderColor="#000000"
        ribbonOpacity={0.6}
        ribbonBorderWidth={3}
        ribbonBorderColor="#000000"
        colors={{ scheme: "nivo" }}
        isInteractive={true}
        animate={true}
        motionStiffness={90}
        motionDamping={7}
        theme={{
          tooltip: {
            container: {
              background: "#333",
            },
          },
        }}
      />
    </div>
  );
}

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
          <div className="stats-container bestPartnership-stat">
            {partnershipStat(this.state.bestPartnerships)}
          </div>
          <Divider />
        </div>
      </div>
    );
  }
}

export default BattingStats;
