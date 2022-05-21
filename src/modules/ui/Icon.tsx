import React from "react"
import IonIcon from "@reacticons/ionicons"
import IconList from "@reacticons/ionicons/lib/components/iconList.json"
import { Box } from "../constants/containers/Containers"

type Props = {
  iconName: keyof typeof IconList
  color?: string
  onClick: () => void
  style?: React.CSSProperties
}

export default ({ iconName, color, onClick, ...rest }: Props) => {
  return (
    <Box>
      <IonIcon
        name={iconName}
        onClick={onClick}
        color={color}
        style={{ fontSize: 50, color: color, ...rest }}
      />
    </Box>
  )
}
