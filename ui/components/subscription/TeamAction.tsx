import SubCard from './SubCard'

type TeamActionProps = {
  title: string
  description: string
  icon: any
  onClick?: () => void
}

export default function TeamAction({
  title,
  description,
  icon,
  onClick,
}: TeamActionProps) {
  return (
    <button onClick={onClick}>
      <SubCard className=" flex flex-col gap-2 ease-in-out duration-300">
        <div className="flex gap-2">
          {icon}
          <p className="pb-2 font-bold text-xl">{title}</p>
        </div>
        <p className="pb-5">{description}</p>
      </SubCard>
    </button>
  )
}
