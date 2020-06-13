import React from "react";
import { Card, Statistic } from "antd";

function mostExtrasConceded(mostExtrasConcededMap) {
  let cards = [];
  for (const [key, value] of mostExtrasConcededMap) {
    cards.push(
      <Card key={key} className="stat-card">
        <Statistic title={key} value={value} suffix="Extras" />
      </Card>
    );
  }
  return cards;
}

class DotBalls extends React.Component {
  render() {
    return mostExtrasConceded(this.props.mostExtrasConceded);
  }
}

export default DotBalls;
