import {
  getLocalWalletInfo,
  initLocalWallet,
  startGame,
} from "@/utils/lotteryWeb3";
import Image from "next/image";
import React from "react";
import { ConnectWallet } from "./connect-wallet";

export default function Head() {
  return (
    <>
      <div className="flex justify-center gap-4 ">
        <div className="text-center ">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Lucky-Vicky Lottery Game
          </h1>
          <div className="flex gap-[10px]">
            <button
              className="bg-red-400 w-[100px] h-[100px]"
              onClick={initLocalWallet}
            >
              로컬 web3 연결
            </button>
            <button
              className="bg-red-400 w-[100px] h-[100px]"
              onClick={getLocalWalletInfo}
            >
              로컬 지갑 연결된 확인
            </button>
            <button
              className=" bg-red-400 w-[100px] h-[100px]"
              onClick={startGame}
            >
              게임 시작
            </button>
          </div>
          <div className="w-[200px] m-auto mt-10">
            {/* 사진 출처: https://www.youtube.com/shorts/lNSY-lrHQ10 */}
            <Image src="/lucky.png" width={200} height={200} alt="lucky" />
          </div>
          <p className="mt-4 mb-10 text-gray-500 dark:text-gray-400">
            3개의 숫자에 베팅하고 잭팟을 터뜨릴 수 있다니 완전 럭키비키잖아?
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            How to Play
          </h2>
          <div className="space-y-2 text-gray-500 dark:text-gray-400">
            <p>1. 게임이 시작되면, 1~45 숫자 중 3개의 숫자가 선택됩니다.</p>
            <p>
              2. 각 숫자에 대해서 &lsquo; 나온다 &rsquo; or &lsquo; 안 나온다
              &rsquo; 로 베팅합니다.
            </p>
            <p>3. 게임이 종료되면, 1 ~ 45 숫자 중 6개의 숫자가 선택됩니다.</p>
            <p>
              4. 1에서 뽑은 숫자가 3에서 뽑은 숫자에 포함 유무에 따라 승자가
              결정됩니다.
            </p>
          </div>
        </div>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </>
  );
}
