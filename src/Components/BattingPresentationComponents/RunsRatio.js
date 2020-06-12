import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

function getChartParameters(runsRatio) {
  let statData = [];
  for (const [key, value] of runsRatio) {
    if (key === "Extras") {
      continue;
    }
    statData.push({
      category: [`${key}'s`],
      runs: value,
    });
  }
  if (runsRatio.length !== 0) {
    statData.push({
      category: "Extras",
      runs: runsRatio.get("Extras"),
    });
  }

  return statData;
}

class RunsRatio extends React.Component {
  render() {
    const data = getChartParameters(this.props.runsRatio);
    return (
      <div className="partnership-chart-container">
        <ResponsiveRadar
          data={data.map((obj) => {
            return obj;
          })}
          keys={["runs"]}
          indexBy="category"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={1}
          borderColor={{ from: "color" }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          dotBorderColor={{ from: "color" }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-12}
          colors={{ scheme: "nivo" }}
          fillOpacity={1}
          blendMode="normal"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={true}
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
