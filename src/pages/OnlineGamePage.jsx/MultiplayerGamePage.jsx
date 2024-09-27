import "./MultiplayerGamePage.scss";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { apiUrl } from "../../assets/data/Api";
import TableMultiplayer from "../../components/TableMultiplayer/TableMultiplayer";
import PlayerAreaMultiplayer from "../../components/PlayerAreaMultiplayer/PlayerAreaMultiplayer";
import handleTableCardSelection from "../../game/handleTableCardSelection";

export default function MultiplayerGamePage({ handleThemeChange, theme }) {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [player, setPlayer] = useState({ id: null, hand: [] });
  const [table, setTable] = useState([]);
  const [selectedTableCards, setSelectedTableCards] = useState([]);

  useEffect(() => {
    const newSocket = io(apiUrl);
    setSocket(newSocket);

    console.log("joinGame event emitted");
    newSocket.emit("joinGame");

    newSocket.on("connect", () => {
      console.log("Socket connected with ID:", newSocket.id);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("startGame", (data) => {
      console.log("startGame event received:", data);
      setRoomId(data.roomId);

      if (socket.id === data.player1.id) {
        setPlayer({
          id: data.player1.id,
          hand: Array.isArray(data.player1.hand) ? data.player1.hand : [],
          fishedCards: data.player1.fishedCards,
          coins: data.player1.coins,
        });
      } else if (socket.id === data.player2.id) {
        setPlayer({
          id: data.player2.id,
          hand: Array.isArray(data.player2.hand) ? data.player2.hand : [],
          fishedCards: data.player2.fishedCards,
          coins: data.player2.coins,
        });
      } else {
        console.warn("Player is not part of this game");
        setPlayer({ id: null, hand: [] });
      }
    });

    socket.on("updateGameState", (newGameState) => {
      console.log("updateGameState event received:", newGameState);
      const { playerId, hand, table } = newGameState;

      if (socket.id === playerId) {
        console.log("Updating hand for current player");
        setPlayer((prevPlayer) => ({ ...prevPlayer, hand }));
      } else {
        console.log("PlayerId mismatch: hand not updated");
      }

      setTable(table);
    });

    return () => {
      socket.off("startGame");
      socket.off("updateGameState");
    };
  }, [socket]);

  const handleHandCardSelection = (card) => {
    socket.emit("playCard", { roomId, card });
  };

  const handleRoomInput = (event) => {
    const roomIdFromInput = event.target.value;
    if (event.key === "Enter") {
      console.log(roomIdFromInput);
      socket.emit("joinRoom", { roomId: roomIdFromInput });
    }
  };

  return (
    <>
      <TableMultiplayer
        cards={table}
        handleThemeChange={handleThemeChange}
        theme={theme}
        handleTableCardSelection={(card) =>
          handleTableCardSelection({
            card,
            selectedTableCards,
            setSelectedTableCards,
          })
        }
      />
      <div className="game-page">
        <h2>Your Player ID: {socket?.id}</h2>
        <h2>Room ID: {roomId}</h2>
        <input placeholder="Enter room ID" onKeyDown={handleRoomInput} />
      </div>
      <PlayerAreaMultiplayer
        player={player}
        handleHandCardSelection={handleHandCardSelection}
        handleThemeChange={handleThemeChange}
        theme={theme}
      />
    </>
  );
}
