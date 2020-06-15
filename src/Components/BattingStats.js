import React, { lazy, Suspense } from "react";
import { Divider, Cascader, Spin } from "antd";
import { getYears } from "../Stats/commonStats";
import {
  runsScoredAtDeath,
  partnershipDuo,
  typeOfRunsScored,
} from "../Stats/battingStats";
import "../Style/Stats.scss";

const PartnershipStat = lazy(() =>
  import("./BattingPresentationComponents/PartnershipStat")
);
const DeathRuns = lazy(() =>
  import("./BattingPresentationComponents/DeathRuns")
);
const RunsRatio = lazy(() =>
  import("./BattingPresentationComponents/RunsRatio")
);

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
    runsRatioFilter: "allTime",
    highestRunGetters: [],
    bestPartnerships: [],
    runsRatio: [],
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

  onRunsRatioFilterChange = (value) => {
    if (value.length === 0) {
      value.push("allTime");
    }
    this.setState({ runsRatioFilter: value[0] }, () => {
      const runsRatio = typeOfRunsScored(this.state.runsRatioFilter);
      runsRatio.then((val) => {
        this.setState({
          runsRatio: val,
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
    const runsRatio = await typeOfRunsScored(this.state.runsRatioFilter);
    this.setState({
      runsRatio,
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
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2em",
                }}
              >
                <Spin tip="Loading ..." />
              </div>
            }
          >
            <div className="stats-container highestRunGetter-stat">
              <DeathRuns highestRunGetters={this.state.highestRunGetters} />
            </div>
          </Suspense>
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
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2em",
                }}
              >
                <Spin tip="Loading ..." />
              </div>
            }
          >
            <div className="stats-container bestPartnership-stat">
              <PartnershipStat bestPartnerships={this.state.bestPartnerships} />
            </div>
          </Suspense>
          <Divider />
        </div>
        <div className="stat-subdiv">
          <div className="heading">
            <h2 className="stat-subheading">
              Number of Runs Scored of each type
            </h2>
            <div className="filter">
              <label>Filter: </label>
              <Cascader
                options={this.state.yearOptions}
                onChange={this.onRunsRatioFilterChange}
                defaultValue={["allTime"]}
                showSearch={this.filter}
              />
            </div>
          </div>
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2em",
                }}
              >
                <Spin tip="Loading ..." />
              </div>
            }
          >
            <div className="stats-container runsRatio-stat">
              <RunsRatio runsRatio={this.state.runsRatio} />
            </div>
          </Suspense>
          <Divider />
        </div>
      </div>
    );
  }
}

export default BattingStats;
