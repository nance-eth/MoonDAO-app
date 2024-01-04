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

    const unverifiedNfts = verifiedNfts.filter(
      (vNft: any) => vNft.tokenId === 'xxx' || vNft.name.trim() === ''
    )

    const numberOfUnverifiedNfts =
      supply - verifiedNfts.length + unverifiedNfts.length

    setWinners([])

    for (let i = 0; i <= 10 + numberOfUnverifiedNfts; i++) {
      try {
        const randomWordsId = await ttsContract.call('requestIds', [i])
        if (randomWordsId) {
          const { randomWords } = await ttsContract.call('getRequestStatus', [
            randomWordsId,
          ])

          const winningTokenId = await randomWords[0].mod(supply).toString()

          const ownerOfWinningTokenId = await ttsContract.call('ownerOf', [
            winningTokenId,
          ])

          const verifiedWinner = verifiedNfts.find(
            (vNft: any) => vNft.tokenId.toString() === winningTokenId
          )

          if (!verifiedWinner.name || verifiedWinner.name.trim() === '') return

          const winner = {
            tokenId: winningTokenId,
            address: ownerOfWinningTokenId,
            name: verifiedWinner?.name || 'Unverified',
          }

          // winners.push(winner)
          setWinners((prev) => [...prev, winner])
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    if (ttsContract && supply) getWinners()
    console.log(winners)
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
          <div className="flex flex-col items-center">
            {winners.map((winner: any, i: number) => (
              <div
                key={`winner-${i}`}
                className="flex gap-4 px-5 lg:px-7 xl:px-10 py-6 border-2 dark:border-[#ffffff20] font-RobotoMono w-[336px] sm:w-[400px] lg:mt-10 lg:w-3/4 lg:max-w-[1080px] text-slate-950 text-sm dark:text-white"
              >
                <h1 className="font-[Goodtimes] text-2xl">{`#${10 - i}`}</h1>
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
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`winner-skeleton-${i}`}
                className="flex gap-4 px-5 lg:px-7 xl:px-10 py-6 border-2 dark:border-[#ffffff20] font-RobotoMono w-[400px] h-[100px] lg:mt-10 lg:w-3/4 lg:max-w-[1080px] text-slate-950 text-sm dark:text-white"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
