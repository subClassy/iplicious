import React from "react";
import { ResponsiveLine } from "@nivo/line";

const runsScale = {
  type: "linear",
  min: "auto",
  max: "auto",
  stacked: false,
  reverse: false,
};

const overScale = {
  type: "point",
};

function getChartParameters(overProgression, flip) {
  let statData = [];
  overProgression.forEach((battingType, i) => {
    let statObj = {};
    let innings = "";
    let color = "";
    if (i === 0) {
      innings = "1st Innings";
      color = "hsl(59, 70%, 50%)";
    } else if (i === 1) {
      innings = "2nd Innings";
      color = "hsl(119, 70%, 50%)";
    }
    statObj["id"] = innings;
    statObj["color"] = color;
    statObj["data"] = [];
    for (const [key, value] of battingType) {
      let coordinate = {};
      if (flip) {
        coordinate = {
          x: value,
          y: key,
        };
      } else {
        coordinate = {
          x: key,
          y: value,
        };
      }
      statObj["data"].push(coordinate);
    }
    statData.push(statObj);
  });

  return statData;
}

class OverProgressionChart extends React.Component {
  render() {
    const data = getChartParameters(
      this.props.overProgression,
      this.props.breakpointBroken
    );
    return (
      <div className="bar-graph-container line-chart-container">
        <ResponsiveLine
          data={[...data]}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={this.props.breakpointBroken ? runsScale : overScale}
          yScale={this.props.breakpointBroken ? overScale : runsScale}
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: this.props.breakpointBroken ? "Runs Scored" : "Overs",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: this.props.breakpointBroken ? "Overs" : "Runs Scored",
            legendOffset: -45,
            legendPosition: "middle",
          }}
          colors={{ scheme: "category10" }}
          pointSize={10}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor", modifiers: [] }}
          pointLabel={this.props.breakpointBroken ? "x" : "y"}
          pointLabelYOffset={-12}
          enableArea={false}
          enableGridX={this.props.breakpointBroken}
          enableGridY={!this.props.breakpointBroken}
          areaBlendMode="normal"
          enableSlices={this.props.breakpointBroken ? "y" : "x"}
          debugSlices={true}
          enableCrosshair={false}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              itemTextColor: "#fff",
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
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

export default OverProgressionChart;
