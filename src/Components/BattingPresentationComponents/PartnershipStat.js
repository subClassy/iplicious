import React from "react";
import { ResponsiveChord } from "@nivo/chord";

function getChartParameters(bestPartnerships) {
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

  let parcel = [];
  parcel.push(playerList);
  parcel.push(statMatrix);
  return parcel;
}

class PartnershipStat extends React.Component {
  render() {
    const parcel = getChartParameters(this.props.bestPartnerships);
    return (
      <div className="partnership-chart-container">
        <ResponsiveChord
          matrix={parcel[1]}
          keys={[...parcel[0]]}
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
}

export default PartnershipStat;
