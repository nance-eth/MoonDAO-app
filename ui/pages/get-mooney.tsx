import { useFundWallet } from '@privy-io/react-auth'
import { useAddress } from '@thirdweb-dev/react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import ChainContext from '@/lib/thirdweb/chain-context'
import viemChains from '@/lib/viem/viemChains'
import Container from '../components/layout/Container'
import ContentLayout from '../components/layout/ContentLayout'
import WebsiteHead from '../components/layout/Head'
import { NoticeFooter } from '@/components/layout/NoticeFooter'
import NetworkSelector from '@/components/thirdweb/NetworkSelector'
import NativeToMooney from '@/components/uniswap/NativeToMooney'

export default function GetMooney() {
  const { t } = useTranslation('common')
  const address = useAddress()
  const router = useRouter()
  const { selectedChain } = useContext(ChainContext)
  const { fundWallet } = useFundWallet()

  return (
    <>
      <WebsiteHead title={t('mooneyTitle')} description={t('mooneyDesc')} />
      <section className="w-[calc(100vw-20px)]">
        <Container>
          <ContentLayout
            header={t('mooneyTitle')}
            headerSize="max(20px, 3vw)"
            description={
              <p>
                {'Playing an active role in MoonDAO governance is simple: '}
                <button
                  className="underline"
                  onClick={() => {
                    if (!address)
                      return toast.error('Please connect your wallet')
                    fundWallet(address, {
                      chain: viemChains[selectedChain.slug],
                    })
                  }}
                >
                  {'fund your account'}
                </button>
                {',  '}
                <button className="underline">{'swap for $MOONEY'}</button>
                {', our governance token, and '}
                <button
                  className="underline"
                  onClick={() => {
                    router.push('/lock')
                  }}
                >
                  {'lock for voting power'}
                </button>
                {'.  '}
              </p>
            }
            preFooter={<NoticeFooter />}
            mainPadding
            isProfile
            mode="compact"
            popOverEffect={false}
          >
            <div className="mt-3 w-full">
              <NetworkSelector />
              <NativeToMooney selectedChain={selectedChain} />
            </div>
          </ContentLayout>
        </Container>
      </section>
    </>
  )
}
