import Frame from "../layout/Frame"

export default function Card({ children, className = '', onClick }: any) {
  return (
    <div
      onClick={onClick}
    >
      <Frame 
        noPadding
        bottomLeft="20px"
        >
        {children}
      </Frame>
    </div>
  )
}
