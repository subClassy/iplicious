import React from "react";
import { ResponsiveBar } from "@nivo/bar";

function getChartParameters(winRatio) {
  let statData = [];
  for (const [key, value] of winRatio) {
    let statObj = {};
    if (key === "Wins") {
      statObj["Innings"] = "Home";
      statObj["batting1"] = value;
      statObj["batting2"] = 0;
      statObj["NR"] = 0;
    } else if (key === "Loses") {
      statObj["Innings"] = "Away";
      statObj["batting1"] = 0;
      statObj["batting2"] = value;
      statObj["NR"] = 0;
    } else if (key === "No Result") {
      statObj["Innings"] = "No Result";
      statObj["batting1"] = 0;
      statObj["batting2"] = 0;
      statObj["NR"] = value;
    }
    statData.push(statObj);
  }

  return statData;
}

class HomeWinRatio extends React.Component {
  render() {
    const data = getChartParameters(this.props.homeAdvantageStats);
    return (
      <div className="partnership-chart-container">
        {this.props.homeAdvantageStats.length !== 0 ? (
          <div>
            <h3>
              Home Team(s): {this.props.homeAdvantageStats.get("Home Team")}
            </h3>
          </div>
        ) : (
          <div />
        )}
        <ResponsiveBar
          data={[...data]}
          keys={["batting1", "batting2", "NR"]}
          indexBy="Innings"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: "category10" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Innings",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "No. of Wins",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltip={({ indexValue, value }) => (
            <strong>
              {indexValue}: {value}
            </strong>
          )}
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
}

export default HomeWinRatio;
