import { getFinalNumbers, getGameState, getLuckyNumbers } from "./lotteryWeb3";

export async function initGame() {
  const gameStat = await getGameState();
  const luckyNumbers: number[] = gameStat ? await getLuckyNumbers() : [];
  const fianlNumbers: number[] = !gameStat ? await getFinalNumbers() : [];

  return { gameStat, luckyNumbers, fianlNumbers };
}
