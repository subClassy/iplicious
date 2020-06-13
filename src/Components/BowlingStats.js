import React from "react";
import { Divider, Cascader } from "antd";
import { getYears } from "../Stats/commonStats";
import {
  dotBalls,
  extrasConceded,
  typeOfDismissals,
} from "../Stats/bowlingStats";

import "../App.scss";

let yearOptions = getYears().map((year) => {
  const obj = { value: year, label: year };
  return obj;
});

yearOptions.push({ value: "allTime", label: "All Time" });

class BowlingStats extends React.Component {
  state = {
    yearOptions: yearOptions,
    dotBallsFilter: "allTime",
    extrasConcededFilter: "allTime",
    dismissalTypeFilter: "allTime",
    mostDotBalls: [],
    mostExtrasConceded: [],
    dismissalType: [],
  };

  onDotBallsFilterChange = (value) => {
    if (value.length === 0) {
      value.push("allTime");
    }
    this.setState({ dotBallsFilter: value[0] }, () => {
      const mostDotBalls = dotBalls(this.state.dotBallsFilter);
      mostDotBalls.then((val) => {
        this.setState({
          mostDotBalls: val,
        });
      });
    });
  };

  onExtrasConcededFilterChange = (value) => {
    if (value.length === 0) {
      value.push("allTime");
    }
    this.setState({ extrasConcededFilter: value[0] }, () => {
      const mostExtrasConceded = extrasConceded(
        this.state.extrasConcededFilter
      );
      mostExtrasConceded.then((val) => {
        this.setState({
          mostExtrasConceded: val,
        });
      });
    });
  };

  onDismissalTypeFilterChange = (value) => {
    if (value.length === 0) {
      value.push("allTime");
    }
    this.setState({ dismissalTypeFilter: value[0] }, () => {
      const dismissalType = typeOfDismissals(this.state.dismissalTypeFilter);
      dismissalType.then((val) => {
        this.setState({
          dismissalType: val,
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
    const mostDotBalls = await dotBalls(this.state.dotBallsFilter);
    this.setState({
      mostDotBalls,
    });

    const mostExtrasConceded = await extrasConceded(
      this.state.extrasConcededFilter
    );
    this.setState({
      mostExtrasConceded,
    });

    const dismissalType = await typeOfDismissals(
      this.state.dismissalTypeFilter
    );
    this.setState({
      dismissalType,
    });
  }

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

export default BowlingStats;
