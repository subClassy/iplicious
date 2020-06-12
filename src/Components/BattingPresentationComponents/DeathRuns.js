import React from "react";
import { Card, Statistic } from "antd";

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

class DeathRuns extends React.Component {
  render() {
    return highestRunGetterStat(this.props.highestRunGetters);
  }
}

export default DeathRuns;
