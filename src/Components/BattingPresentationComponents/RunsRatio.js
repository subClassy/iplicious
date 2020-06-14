import React from "react";
import { ResponsivePie } from "@nivo/pie";

function getChartParameters(runsRatio) {
  let statData = [];
  for (const [key, value] of runsRatio) {
    statData.push({
      id: `${key}s`,
      label: `${key}s`,
      value: value,
    });
  }

  return statData;
}

class RunsRatio extends React.Component {
  render() {
    const data = getChartParameters(this.props.runsRatio);
    return (
      <div className="partnership-chart-container">
        <ResponsivePie
          data={[...data]}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "accent" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#fff"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={2}
          radialLabelsLinkColor={{ from: "color" }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
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
}

export default RunsRatio;
