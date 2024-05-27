import {
  endGame,
  gameAnswer_events,
  getFinalNumbers,
  getGameState,
  getLuckyNumbers,
  getTopPayouts,
  initLocalWallet,
  initUserMetaWallet,
  startGame,
} from "./lotteryWeb3";

export async function initGame() {
  const isSuccess = await initUserMetaWallet();
  const isSuccessLocal = await initLocalWallet();
  if (isSuccess && isSuccessLocal) {
    const gameStat = await getGameState();
    const luckyNumbers: number[] = gameStat ? await getLuckyNumbers() : [];
    const fianlNumbers: number[] = !gameStat ? await getFinalNumbers() : [];
    return { gameStat, luckyNumbers, fianlNumbers, isSuccess };
  }

  return {
    gameStat: false,
    luckyNumbers: [0, 0, 0],
    fianlNumbers: [0, 0, 0, 0, 0, 0],
    isSuccess: false,
  };
}

export async function startGame_rootin() {
  const luckyNumbers: number[] = await getLuckyNumbers();
  return { luckyNumbers };
}

export async function endGame_rootin() {
  const finalNumbers: number[] = await getFinalNumbers();
  const answer = await gameAnswer_events();
  const topFive = await getTopPayouts();

  return { finalNumbers, answer, topFive };
}
