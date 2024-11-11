import { PrivyProvider } from '@privy-io/react-auth'
import { Sepolia } from '@thirdweb-dev/chains'
import { PrivyThirdwebSDKProvider } from '@/lib/privy/PrivyThirdwebSDKProvider'
import CreateCitizen from '@/components/onboarding/CreateCitizen'

describe('<CreateCitizen />', () => {
  let props: any

  beforeEach(() => {
    props = {
      address: '0x1234567890abcdef',
      selectedChain: { slug: 'ethereum' },
      setSelectedTier: cy.stub(),
    }
    cy.mountNextRouter('/')
    cy.mount(
      <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}>
        <PrivyThirdwebSDKProvider selectedChain={Sepolia}>
          <CreateCitizen {...props} />
        </PrivyThirdwebSDKProvider>
      </PrivyProvider>
    )
  })

  it('Should render the component', () => {
    cy.get('h1').contains('Join The Network').should('exist')
  })

  it('Should complete citizen onboarding flow', () => {
    //DESIGN
    cy.contains(
      'Create your unique and personalized AI passport photo.'
    ).should('exist')
    // Simulate image upload
    cy.get('input[type="file"]').attachFile('images/Original.png')
    cy.contains('Generate').click()

    //TYPEFORM
    cy.contains('Please complete your citizen profile.').should('exist')
    cy.get('iframe').should('exist')
    cy.get('iframe').should('have.attr', 'src').should('include', 'typeform')
    cy.contains('NEXT').click()

    //MINT
    cy.contains('Connect').should('exist')

    cy.get('input[type="checkbox"]').check()
    cy.get('input[type="checkbox"]').should('be.checked')
  })
})