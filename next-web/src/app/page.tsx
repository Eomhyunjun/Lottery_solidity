import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { StatusBar } from "@/components/status-bar";
import { NumberCard } from "@/components/number-card";
import { ConnectWallet } from "@/components/connect-wallet";
import Image from "next/image";

// https://www.youtube.com/shorts/lNSY-lrHQ10

export default function Main() {
  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-950">
      <div className="relative flex flex-row min-h-screen gap-10 p-4 overflow-x-scroll">
        <div className="min-w-[700px] max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <div className="flex justify-center gap-4 ">
            <div className="text-center ">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Lucky-Vicky Lottery Game
              </h1>
              <div className="w-[200px] m-auto mt-10">
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
                  2. 각 숫자에 대해서 &lsquo; 나온다 &rsquo; or &lsquo; 안
                  나온다 &rsquo; 로 베팅합니다.
                </p>
                <p>
                  3. 게임이 종료되면, 1 ~ 45 숫자 중 6개의 숫자가 선택됩니다.
                </p>
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
          <div className="space-y-4 ">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Your Bet
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <NumberCard />
              <NumberCard />
              <NumberCard />
            </div>
            <div>
              <StatusBar title="게임 상태" status="진행 중" percentage={30} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Winning Numbers
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
                23
              </div>
              <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
                11
              </div>
              <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
                39
              </div>
              <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
                7
              </div>
              <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
                31
              </div>
              <div className="flex items-center justify-center w-12 h-12 font-bold text-gray-900 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-gray-50">
                14
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Leaderboard
            </h2>
            <div className="p-4 space-y-2 bg-gray-200 rounded-lg dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-50">
                      shadcn
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      $1,000,000 won
                    </p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 dark:text-gray-50">
                  1st
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      alt="@jaredpalmer"
                      src="/placeholder-avatar.jpg"
                    />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-50">
                      jaredpalmer
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      $500,000 won
                    </p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 dark:text-gray-50">
                  2nd
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      alt="@maxleiter"
                      src="/placeholder-avatar.jpg"
                    />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-50">
                      maxleiter
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      $250,000 won
                    </p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 dark:text-gray-50">
                  3rd
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
