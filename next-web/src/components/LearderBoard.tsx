import { Avatar, AvatarFallback, AvatarImage } from "@/utils/ui/avatar";

export default function LearderBoard() {
  return (
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
              <p className="text-gray-500 dark:text-gray-400">$1,000,000 won</p>
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-50">1st</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt="@jaredpalmer" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-50">
                jaredpalmer
              </p>
              <p className="text-gray-500 dark:text-gray-400">$500,000 won</p>
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-50">2nd</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt="@maxleiter" src="/placeholder-avatar.jpg" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-50">
                maxleiter
              </p>
              <p className="text-gray-500 dark:text-gray-400">$250,000 won</p>
            </div>
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-50">3rd</div>
        </div>
      </div>
    </div>
  );
}
