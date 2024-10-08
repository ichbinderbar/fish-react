import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import Hand from "../Hand/Hand";
import "./PlayerArea.scss";
import { useState, useEffect } from "react";

export default function PlayerArea({
  player,
  handleHandCardSelection,
  fishedCards,
  coins,
  theme,
}) {
  return (
    <div className={`player-area player-area--${theme}`}>
      <div className="player-area__stat-container">
        <CardsCollectedCounter
          fishedCards={fishedCards}
        ></CardsCollectedCounter>
        <CoinsEarnedCounter coins={coins}></CoinsEarnedCounter>
      </div>
      <Hand player={player} handleHandCardSelection={handleHandCardSelection} />
    </div>
  );
}
