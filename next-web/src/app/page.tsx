"use client";
import { useEffect, useState } from "react";
import BetNum from "@/components/BetNum";
import {
  endGame_rootin,
  initGame,
  startGame_rootin,
} from "@/utils/stateManager";
import Head from "@/components/Head";
import WinningNum from "@/components/WinningNum";
import LearderBoard from "@/components/LearderBoard";
import { GameState } from "@/types/games";
import { GAME_ENDED, GAME_IN_PROGRES } from "@/utils/val/time_val";
import { endGame, startGame } from "@/utils/lotteryWeb3";

export default function Main() {
  const [init, setInit] = useState<boolean>(false);
  const [state, setState] = useState<GameState>("불러오는 중");
  const [time, setTime] = useState<number>(0);
  const [luckNumbers, setLuckyNumbers] = useState<number[]>([0, 0, 0]);
  const [finalNumbers, setFinalNumbers] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);
  const [topFive, setTopFive] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [answer, setAnswer] = useState<number[]>([]);

  async function fetchGameState() {
    try {
      const { gameStat, luckyNumbers, fianlNumbers, isSuccess } =
        await initGame();
      console.log(
        "fetchGameState",
        gameStat,
        luckyNumbers,
        fianlNumbers,
        isSuccess
      );
      if (isSuccess) {
        setLuckyNumbers(luckyNumbers);
        setFinalNumbers(fianlNumbers);
        setState(gameStat ? "게임 시작" : "게임 종료");
      } else {
        setState("불러오는 중");
        console.log("불러오기 실패 재시도...");
      }
    } catch (error) {
      setState("불러오는 중");
      console.log("에러났쪄염ㅠ: ", error);
    } finally {
      setInit(true);
    }
  }

  useEffect(() => {
    fetchGameState();
  }, []);

  useEffect(() => {
    if (!init) return;
    if (state === "게임 시작") {
      console.log("startGame_rootin 시작!");
      startGame_rootin().then(({ luckyNumbers }: any) => {
        console.log("startGame_rootin", luckyNumbers);
        setLuckyNumbers(luckyNumbers);
        let tmp_time: number = 0;
        const interval = setInterval(() => {
          tmp_time = tmp_time + 1;
          setTime(tmp_time);
          console.log(tmp_time);
          if (tmp_time > GAME_IN_PROGRES) {
            clearInterval(interval);
            setTime(0);
            setLuckyNumbers([0, 0, 0]);
            setState("게임 종료");
          }
        }, 1000);

        return () => clearInterval(interval);
      });
    } else if (state === "게임 종료") {
      console.log("endGame_rootin 시작!");
      endGame_rootin().then(({ finalNumbers, answer, topFive }) => {
        setFinalNumbers(finalNumbers);
        setAnswer(answer);
        setTopFive(topFive);

        let tmp_time: number = 0;
        const interval = setInterval(() => {
          tmp_time = tmp_time + 1;
          setTime(tmp_time);
          console.log(tmp_time, time, GAME_ENDED);
          if (tmp_time > GAME_ENDED) {
            console.log("---- 게임 시작합니데이 ----");
            clearInterval(interval);
            setTime(0);
            setState("게임 시작");
            startGame();
          }
        }, 1000);
        return () => clearInterval(interval);
      });
    } else {
      fetchGameState();
    }
  }, [state]);

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-950">
      <div className="relative flex flex-row min-h-screen gap-10 p-4 overflow-x-scroll">
        <div className="min-w-[700px] max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <Head />
          <BetNum state={state} luckNumbers={luckNumbers} time={time} />
          <WinningNum finalNumbers={finalNumbers} />
          <LearderBoard />
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
