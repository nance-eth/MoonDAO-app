import Link from 'next/link'
import Speaker from '../home/Speaker'
import StandardButton from '../layout/StandardButton'
import CitizenTier from '../onboarding/CitizenTier'
import TeamTier from '../onboarding/TeamTier'

export default function Callout2() {
  return (
    <section>
      <div
        id="callout2-container"
        className="z-10 md:rounded-tl-[5vmax] relative flex flex-col items-end lg:items-start justify-end pt-0 lg:pt-5 p-5 pb-[5vmax] md:pr-10 md:pl-10 min-h-[250px] lg:min-h-[600px] bg-gradient-to-bl from-transparent via-[#090D21] via-10% to-transparent to-40%"
      >
        <div id="background-elements">
          <div
            id="background-gradient"
            className="w-full h-[50%] absolute bottom-0 left-0"
          ></div>
          <div
            id="bottom-divider"
            className="hidden divider-4 absolute left-0 bottom-[-2px] w-[60%] h-full"
          ></div>
          <div
            id="featured-image-large"
            className="hide-xl feature-3 absolute top-0 right-0 w-[80vmin] md:w-[70%] lg:w-[45vmax] mt-[-5vmax] h-full mt-5"
          ></div>
          <div
            id="featured-image-extra-large"
            className="show-xl feature-3 absolute top-0 right-0 w-[900px] h-[50vw]"
          ></div>
        </div>
        <div
          id="content"
          className="relative pt-[220px] lg:pt-20 md:pb-0 w-full pr-5 lg:w-[70%]"
        >
          <h1 className="header font-GoodTimes">
            Space Acceleration Network
          </h1>
          <p
            id="paragraph"
            className="pt-2 pb-5 text-lg w-[100%] md:w-[100%] lg:max-w-[500px]"
          >
            The Space Acceleration Network is an onchain startup society focused 
            on building a permanent settlement on the Moon and beyond. We aim to 
            connect space visionaries and organizations with the funding, tools, 
            and support needed to turn bold ideas into reality.
          </p>
          <StandardButton
            backgroundColor="bg-white"
            textColor="text-dark-cool"
            borderRadius="rounded-tl-[10px] rounded-[2vmax]"
            link="/network"
            paddingOnHover="pl-5"
          >
            Explore the Network
          </StandardButton>
        </div>
      </div>
      <div className="md:pr-5">
        <Link href="/citizen" passHref>
          <CitizenTier setSelectedTier={() => {}} compact />
        </Link>
      </div>

      <div
        id="our-astronauts-section"
        className="sm:px-2 md:p-5 z-50 flex flex-col items-start overflow-hidden"
      >
        <div
          id="astronauts-container"
          className="p-1 flex flex-wrap w-full justify-center sm:justify-around md:justify-start lg:ml-[5%] gap-5 scale-[90%] md:scale-[100%] lg:scale-[115%] my-[20px] z-50"
        >
          <Speaker
            alt="Coby Cotton"
            logo="/assets/astronaut-coby.png"
            name="Coby Cotton"
            subtitle="MoonDAO's 1st Astronaut"
            link="https://www.youtube.com/watch?v=YXXlSG-du7c"
            isWhiteText={true}
          />
          <Speaker
            alt="Dr. Eiman Jahangir"
            logo="/assets/astronaut-eiman.png"
            name="Dr. Eiman Jahangir"
            subtitle="MoonDAO's 2nd Astronaut"
            link="https://www.youtube.com/watch?v=O8Z5HVXOwsk"
            isWhiteText={true}
          />
        </div>
      </div>
    </section>
  )
}
