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
    // const winners: Winner[] = []

    const verifiedNftsRes: any = await fetch('/api/db/nft')
    const verifiedNftsData = await verifiedNftsRes.json()
    const { data: verifiedNfts } = verifiedNftsData

    const winners = []

    for (let i = 0; i <= 10; i++) {
      try {
        const randomWordsId = await ttsContract.call('requestIds', [i])
        if (randomWordsId) {
          const { randomWords } = await ttsContract.call('getRequestStatus', [
            randomWordsId,
          ])

          const winningTokenId = await randomWords[0].mod(supply)

          const ownerOfWinningTokenId = await ttsContract.call('ownerOf', [
            winningTokenId.toString(),
          ])

          const verifiedWinner = verifiedNfts.find(
            (vNft: any) => vNft.tokenId === winningTokenId._hex
          )

          const winner = {
            tokenId: winningTokenId,
            address: ownerOfWinningTokenId,
            name: verifiedWinner?.name || 'Unverified',
          }

          // winners.push(winner)
          winners.push(winner)
        }
      } catch (err) {
        console.log(err)
      }
    }
    setWinners(winners.reverse())
  }

  useEffect(() => {
    const refresh = setInterval(() => {
      if (ttsContract && supply) getWinners()
    }, 5000)
    return () => clearInterval(refresh)
  }, [])

  return (
    <div className="mt-3 px-5 lg:px-7 xl:px-10 py-12 lg:py-14 page-border-and-color font-RobotoMono w-[336px] sm:w-[400px] lg:mt-10 lg:w-full lg:max-w-[1080px] text-slate-950 dark:text-white">
      <h1 className={`page-title`}>Ticket to Space</h1>
      <p className="mt-5 bg-[#CBE4F7] text-[#1F212B] dark:bg-[#D7594F36] dark:text-white  px-2 py-2 xl:py-3 xl:px-4 2xl:max-w-[750px] xl:text-left text-sm xl:text-base">
        {`One person will be randomly selected to win an opportunity aboard a future Blue Origin rocket to space!`}
      </p>

      <div className="mt-5">
        <h2 className="text-xl font-bold">Winners</h2>
        <div className="w-full flex flex-col items-center">
          <button
            className="w-[250px] md:w-1/2 mt-4 p-1 border text-white hover:scale-105 transition-all duration-150 border-white hover:bg-white hover:text-moon-orange"
            onClick={getWinners}
          >
            Refresh ↺
          </button>
        </div>
        {winners.length > 0 ? (
          <div className="flex flex-col items-center">
            {winners.map((winner: any, i: number) => (
              <div
                key={`winner-${i}`}
                className={`flex gap-4 px-5 lg:px-7 xl:px-10 py-6 border-2 dark:border-[#ffffff20] font-RobotoMono w-[336px] sm:w-[400px] lg:mt-10 lg:w-3/4 lg:max-w-[1080px] text-slate-950 text-sm dark:text-white ${
                  10 - winners.length + i + 1 === 1 && 'border-moon-gold'
                }`}
              >
                <h1 className="font-[Goodtimes] text-2xl">{`#${
                  10 - winners.length + i + 1
                }`}</h1>
                <div className="w-[2px] h-12 bg-[#00000020] dark:bg-[#ffffff20]" />
                <div className="flex flex-col">
                  <p>{`Name : ${winner.name}`}</p>
                  <p>{`Token Id : ${winner.tokenId}`}</p>
                  <Link
                    href={'https://polygonscan.com/address/' + winner.address}
                    target="_blank"
                  >
                    {`Address : ${winner?.address?.slice(
                      0,
                      6
                    )}...${winner?.address?.slice(-4)}`}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex gap-4 px-5 lg:px-7 xl:px-10 py-6 border-2 dark:border-[#ffffff20] font-RobotoMono w-[400px] h-[100px] lg:mt-10 lg:w-3/4 lg:max-w-[1080px] text-slate-950 text-sm dark:text-white"></div>
          </div>
        )}
      </div>
    </div>
  )
}
