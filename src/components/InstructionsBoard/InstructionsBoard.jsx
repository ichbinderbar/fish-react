import "./InstructionsBoard.scss";

export default function InstructionsBoard({ theme }) {
  return (
    <div
      className={`instructions-board__main-container instructions-board__main-container--${theme}`}
    >
      <h1 className="instructions-board__title">How To Play:</h1>
      <div
        className={`instructions-board__subcontainer instructions-board__subcontainer--${theme}`}
      >
        <div className="instructions-board__content">
          <div className="section">
            <h3>Winner:</h3>
            <p>The first player to earn 20 coins wins the game.</p>
          </div>
          <div className="section">
            <h3>Turns:</h3>
            <p>
              On each turn, a player must attempt to capture one or more cards
              from the table using a card from their hand.
              <br />
              <strong> To capture a card: </strong>
              If the played card is not a number between 3 and 7 it must match
              the value of a card on the table, or if it is it can also add up
              to the value of two cards on the table (e.g., if you have a 3 in
              your hand, you can capture a 3 from the table or add a 2 and a 1
              from the table). If the player cannot capture, they must discard a
              card onto the table. The turn then passes to the next player.
            </p>
          </div>
          <div className="section">
            <h3>Points:</h3>
            <p>
              1 coin can be earned for capturing the card discarted by the
              previous player inmediatelly after it is placed on the table with
              a card of the same value.
              <br />1 coin is awarded if the player leaves the table empty after
              capturing.
              <br />
              This two scenarios can happen on the same turn on which case 2
              points are awarded.
              <br />6 coins are awarded for every 20 captured cards. One
              additional coin is awarded for every additional captured card.
            </p>
          </div>
          <div className="section">
            <h3>End of the Round:</h3>
            <p>
              The round ends when a player runs out of cards in their hand and
              there are no more cards left to be dealt.
              <br />
              Players count their captured cards during the round and exchange
              them for coins, and the game continues to the next round if
              neither player has reached 20 points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
