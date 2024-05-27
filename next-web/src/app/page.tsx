"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/utils/ui/avatar";
import { useEffect, useState } from "react";
import BetNum from "@/components/BetNum";
import { initGame } from "@/utils/stateManager";
import Head from "@/components/Head";
import WinningNum from "@/components/WinningNum";
import LearderBoard from "@/components/LearderBoard";
import { GameState } from "@/types/games";
import { GAME_IN_PROGRES } from "@/utils/time_val";

export default function Main() {
  const [state, setState] = useState<GameState>("불러오는 중");
  const [time, setTime] = useState<number>(0);
  const [luckNumbers, setLuckyNumbers] = useState<number[]>([0, 0, 0]);
  const [finalNumbers, setFinalNumbers] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    async function fetchGameState() {
      try {
        const { gameStat, luckyNumbers, fianlNumbers } = await initGame();
        setLuckyNumbers(luckyNumbers);
        setFinalNumbers(fianlNumbers);
        setState(gameStat ? "게임 시작" : "게임 종료");
      } catch (error) {
        setState("블록체인 네트워크 연결 안됨");
        fetchGameState();
      }
    }

    fetchGameState();
  }, []);

  useEffect(() => {
    if (state === "게임 시작") {
      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, GAME_IN_PROGRES);

      return () => clearInterval(timer);
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
