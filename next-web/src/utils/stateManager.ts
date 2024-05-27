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
    const luckyNumbers: BigInt[] = gameStat ? await getLuckyNumbers() : [];
    const IntLuckyNumbers: number[] = luckyNumbers
      ? luckyNumbers.map((num) => Number(num))
      : [0, 0, 0];
    const fianlNumbers: BigInt[] = !gameStat ? await getFinalNumbers() : [];
    const IntFinalNumbers: number[] = fianlNumbers
      ? fianlNumbers.map((num) => Number(num))
      : [0, 0, 0, 0, 0, 0];
    return { gameStat, IntLuckyNumbers, IntFinalNumbers, isSuccess };
  }

  return {
    gameStat: false,
    luckyNumbers: [0, 0, 0],
    fianlNumbers: [0, 0, 0, 0, 0, 0],
    isSuccess: false,
  };
}

export async function startGame_rootin() {
  const luckyNumbers: BigInt[] = await getLuckyNumbers();
  const IntLuckyNumbers: number[] = luckyNumbers
    ? luckyNumbers.map((num) => Number(num))
    : [0, 0, 0];
  return { IntLuckyNumbers };
}

export async function endGame_rootin() {
  const finalNumbers: BigInt[] = await getFinalNumbers();
  const IntFinalNumbers: number[] = finalNumbers
    ? finalNumbers.map((num) => Number(num))
    : [0, 0, 0, 0, 0, 0];
  const answer: boolean[] = await gameAnswer_events();
  const topFive = await getTopPayouts();

  return { IntFinalNumbers, answer };
}
