import Link from 'next/link'
import { useEffect, useState } from 'react'

type Winner = {
  tokenId: string
  address: string
  name: string
}

export function SweepstakesWinners({ ttsContract, supply }: any) {
  const [winners, setWinners] = useState<Winner[]>([])

  async function getWinners() {
    const winners: Winner[] = []

    const verifiedNftsRes: any = await fetch('/api/db/nft')
    const verifiedNftsData = await verifiedNftsRes.json()
    const { data: verifiedNfts } = verifiedNftsData

    for (let i = 0; i <= 10; i++) {
      try {
        const randomWordsId = await ttsContract.call('requestIds', [i])
        if (randomWordsId) {
          const { randomWords } = await ttsContract.call('getRequestStatus', [
            randomWordsId,
          ])

          const winningTokenId = await randomWords[0].mod(supply).toString()

          const verifiedWinner = verifiedNfts.find(
            (vNft: any) => vNft.tokenId === winningTokenId
          )

          const winner = {
            tokenId: winningTokenId,
            address: verifiedWinner?.address,
            name: verifiedWinner?.name,
          }

          winners.push(winner)
        }
      } catch (err) {
        console.log(err)
      }
    }
    setWinners(winners)
  }

  useEffect(() => {
    if (ttsContract && supply) getWinners()
  }, [ttsContract, supply])

  return (
    <div className="mt-3 px-5 lg:px-7 xl:px-10 py-12 lg:py-14 page-border-and-color font-RobotoMono w-[336px] sm:w-[400px] lg:mt-10 lg:w-full lg:max-w-[1080px] text-slate-950 dark:text-white">
      <h1 className={`page-title`}>Ticket to Space</h1>
      <p className="mt-5 bg-[#CBE4F7] text-[#1F212B] dark:bg-[#D7594F36] dark:text-white  px-2 py-2 xl:py-3 xl:px-4 2xl:max-w-[750px] xl:text-left text-sm xl:text-base">
        {`One person will be randomly selected to win an opportunity aboard a future Blue Origin rocket to space!`}
      </p>

      <div className="mt-5">
        <h2 className="text-xl font-bold">Winners</h2>
        {winners.length > 0 ? (
          <div className="flex flex-col max-h-[600px] overflow-y-scroll">
            {winners.map((winner: any, i: number) => (
              <>
                <div
                  key={i}
                  className="flex gap-4 px-5 lg:px-7 xl:px-10 py-6 page-border-and-color font-RobotoMono w-[336px] sm:w-[400px] lg:mt-10 lg:w-full lg:max-w-[1080px] text-slate-950 text-sm dark:text-white"
                >
                  <h1 className="font-[Goodtimes] text-2xl">{`#${10 - i}`}</h1>
                  <div className="flex flex-col">
                    <p>{`Name : ${winner.name}`}</p>
                    <p>{`Token Id : ${winner.tokenId}`}</p>
                    <Link
                      href={'https://polygonscan.com/address/' + winner.address}
                      target="_blank"
                    >
                      {`Address : ${winner.address.slice(
                        0,
                        6
                      )}...${winner.address.slice(-4)}`}
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : (
          <div className="mt-3 px-5 lg:px-7 xl:px-10 py-12 lg:py-14 page-border-and-color font-RobotoMono w-[336px] sm:w-[400px] lg:mt-10 lg:w-full lg:max-w-[1080px] text-slate-950 dark:text-white"></div>
        )}
      </div>
    </div>
  )
}
