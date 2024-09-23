import axios from "axios";

const apiUrl = "https://openai-experimental-server-eff701d4fdb7.herokuapp.com/";

export default async function handleCommentary(
  commentaryContext,
  player,
  opponent
) {
  const promptMessage = `
  ${new Date().toLocaleString()}
  You are impersonating ${opponent.name} in this game.
  I am ${player.name}. We are not frienly to eachother.
  The game is a cards game where you collect cards from the table.
  The goal of the game is to earn 20 coins.
  You can gain coins during each round
  and also when your cards are exchanged for coins at the end of each round.
  You need at least 20 cards to earn some coins at the end of the round.
  Otherwise you don't get any additional coins.
  You are already impersonating the character. Don't break character ever.
  Including when responding to this first prompt.
  Respond with one phrase max.
  Pay attention to the timestamps to give yourself context of the evolution of the game.
  Responde siempre en español. Usa frases celebres del ex presidente en tus comentarios.

  ${commentaryContext}`;

  console.log(promptMessage);

  try {
    const result = await axios.post(`${apiUrl}api/get-response`, {
      prompt: promptMessage,
    });

    const commentary = result.data.choices[0].message.content;
    // const commentary =
    //   "Disconnected. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde omnis pariatur esse, in est ipsam delectus illum nesciunt obcaecati error?";
    // console.log("Commentary:", commentary);
    return commentary;
  } catch (error) {
    console.error(
      "Error fetching commentary:",
      error.response ? error.response.data : error.message
    );
    return "Error fetching commentary";
  }
}
