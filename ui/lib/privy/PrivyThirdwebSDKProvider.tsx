import { usePrivy, useWallets } from '@privy-io/react-auth'
import { Ethereum, Goerli, Mumbai, Polygon } from '@thirdweb-dev/chains'
import { ThirdwebSDKProvider } from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import PrivyWalletContext from './privy-wallet-context'

export function PrivyThirdwebSDKProvider({ selectedChain, children }: any) {
  const [selectedWallet, setSelectedWallet] = useState<number>(0)
  const [signer, setSigner] = useState<any>(null)

  const { wallets } = useWallets()

  const { user } = usePrivy()

  async function getPrivySigner() {
    try {
      const wallet = wallets[selectedWallet]
      const provider = await wallet?.getEthersProvider()
      await wallet?.switchChain(selectedChain.chainId)
      setSigner(provider?.getSigner())
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (user) getPrivySigner()
    else setSigner(null)
  }, [wallets, user, selectedWallet, selectedChain])

  return (
    <PrivyWalletContext.Provider value={{ selectedWallet, setSelectedWallet }}>
      <ThirdwebSDKProvider
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        activeChain={selectedChain}
        supportedChains={[Ethereum, Polygon, Goerli, Mumbai]}
        signer={signer}
      >
        {children}
      </ThirdwebSDKProvider>
    </PrivyWalletContext.Provider>
  )
}
