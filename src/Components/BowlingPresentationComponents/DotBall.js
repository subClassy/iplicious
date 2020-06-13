import React from "react";
import { Card, Statistic } from "antd";

function mostDotBallsStat(mostDotBallsMap) {
  let cards = [];
  for (const [key, value] of mostDotBallsMap) {
    cards.push(
      <Card key={key} className="stat-card">
        <Statistic title={key} value={value} suffix="Dot Balls" />
      </Card>
    );
  }
  return cards;
}

class DotBalls extends React.Component {
  render() {
    return mostDotBallsStat(this.props.mostDotBalls);
  }
}

export default DotBalls;
