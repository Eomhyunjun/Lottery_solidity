"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/utils/ui/card";
import { Button } from "@/utils/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/utils/ui/avatar";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { getWalletInfo, initUserMetaWallet } from "@/utils/lotteryWeb3";
import { abbreviateString } from "@/utils/uttils";
import { T_WalletData } from "@/types/wallet";

export function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletData, setWalletData] = useState<T_WalletData | null>();

  useEffect(() => {
    initUserMetaWallet();
  }, []);

  async function connectWallet() {
    const walletData: T_WalletData | null = await getWalletInfo();

    if (walletData) {
      console.log(walletData);
      setWalletData({
        account: walletData.account,
        balance: window.web3.utils.fromWei(walletData.balance, "ether"),
      });
      setIsConnected(true);
    }
  }

  function disconnectWallet() {
    setIsConnected(false);
    setWalletData(null);
  }

  return (
    <>
      {!isConnected ? (
        <Card className="w-full max-w-md p-2 pb-0 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>지갑 연결하고 시작하기</CardTitle>
              <WalletIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <CardDescription>
              MetaMask에 연결하여 게임을 시작할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <Button
                className="w-full"
                variant="ghost"
                onClick={() => connectWallet()}
              >
                <WalletIcon className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-col items-center justify-center w-full">
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage
                    alt="User Avatar"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback />
                </Avatar>
                <div className="ml-4">
                  <h3 className="text-lg font-medium" />
                  <p
                    className="text-sm text-gray-500"
                    aria-label={walletData?.account}
                  >
                    {walletData && abbreviateString(walletData.account)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Balance</p>
                <p className="text-lg font-medium">{walletData?.balance} ETH</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end mt-4">
              <Button size="sm" variant="outline" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
