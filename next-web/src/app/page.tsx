"use client";
import { useCallback, useEffect, useState } from "react";
import BetNum from "@/components/BetNum";
import {
  T_IntTopPayout,
  endGame_rootin,
  initGame,
  startGame_rootin,
} from "@/utils/stateManager";
import Head from "@/components/Head";
import LearderBoard from "@/components/LearderBoard";
import { GameState } from "@/types/games";
import { GAME_ENDED, GAME_IN_PROGRES } from "@/utils/val/time_val";
import { endGame, startGame } from "@/utils/lotteryWeb3";

export default function Main() {
  const [init, setInit] = useState<boolean>(false);
  const [state, setState] = useState<GameState>("불러오는 중");

  const [luckNumbers, setLuckyNumbers] = useState<number[] | undefined>([
    0, 0, 0,
  ]);
  const [answer, setAnswer] = useState<boolean[]>([false, false, false]);
  const [finalNumbers, setFinalNumbers] = useState<number[] | undefined>([
    0, 0, 0, 0, 0, 0,
  ]);
  const [topFive, setTopFive] = useState<T_IntTopPayout[] | undefined>([
    { bettor: "", payout: 0 },
  ]);

  const fetchGameState = useCallback(async () => {
    try {
      const {
        gameStat,
        IntLuckyNumbers,
        IntFinalNumbers,
        isSuccessAllProcess,
        IntGetTopFive,
      } = await initGame();
      console.log("fetchGameState", isSuccessAllProcess);
      if (isSuccessAllProcess) {
        setLuckyNumbers(IntLuckyNumbers);
        setFinalNumbers(IntFinalNumbers);
        setTopFive(IntGetTopFive);
        setState(gameStat ? "게임 시작" : "게임 종료");
        setInit(true);
      } else {
        setState("불러오는 중");
        console.log("불러오기 실패 재시도...");
        setTimeout(fetchGameState, 5000);
      }
    } catch (error) {
      setState("불러오는 중");
      console.log("에러났쪄염ㅠ: ", error);
    }
  }, []);

  useEffect(() => {
    fetchGameState();
  }, []);

  useEffect(() => {
    if (!init) return;
    if (state === "게임 진행 중") return;
    if (state === "게임 시작") {
      console.log("startGame_rootin 시작!");
      startGame_rootin().then(({ IntLuckyNumbers }: any) => {
        console.log("startGame_rootin", IntLuckyNumbers);
        setLuckyNumbers(IntLuckyNumbers);
        setState("게임 진행 중");
      });
    } else if (state === "게임 종료") {
      console.log("endGame_rootin 시작!");
      endGame_rootin().then(({ IntFinalNumbers, answer }) => {
        setFinalNumbers(IntFinalNumbers);
        setAnswer(answer);
        // setTopFive(topFive);
      });
    } else {
      fetchGameState();
    }
  }, [init, state]);

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-950">
      <div className="relative flex flex-row min-h-screen gap-10 p-4 overflow-x-scroll">
        <div className="min-w-[700px] max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <Head />
          <BetNum
            state={state}
            luckNumbers={luckNumbers}
            answer={answer}
            finalNumbers={finalNumbers}
            setState={setState}
          />

          {topFive && <LearderBoard topFive={topFive} />}
        </div>
      </div>
    </div>
  );
}

// 1분 후

// 자동으로 게임 종료

// Winning Numbers 가져오기 -> Winning Numbers 변경 -> 3개의 숫자랑 비교핵서 색칠해주기
// 승자 가져오기 -> 승자 변경
// 리더보드 수정
