/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/tEpQsFjMNPf
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"

export function NumberCard() {
  return (
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-gray-900 text-8xl dark:text-gray-50">42</div>
          <div className="flex items-center justify-between w-full mt-6">
            <div className="flex flex-col items-center">
              <Button
                className="text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:text-gray-50 dark:hover:bg-green-700"
                size="sm"
                variant="outline"
              >
                찬성
              </Button>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                베팅액: $100
                <br />
                배당율: 2.5x
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Button
                className="text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-gray-50 dark:hover:bg-red-700"
                size="sm"
                variant="outline"
              >
                반대
              </Button>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                베팅액: $50
                <br />
                배당율: 3x
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
