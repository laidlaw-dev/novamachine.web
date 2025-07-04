import { type Ref } from "react"
import type { ControlPanelLayoutProps } from "./ControlPanelLayout"
import ControlPanelLayout from "./ControlPanelLayout"
import type { ReactNode } from "react"
import FormLabel from "@mui/material/FormLabel"

interface LabelledControlPanelLayoutProps extends ControlPanelLayoutProps {
  label: string
  children: ReactNode
  ref?: Ref<HTMLDivElement>
}

const LabelledControlPanelLayout = ({
  label,
  width,
  color,
  children,
  ref,
}: LabelledControlPanelLayoutProps) => {
  return (
    <ControlPanelLayout width={width} color={color} ref={ref}>
      <FormLabel
        component="legend"
        sx={{
          position: "absolute",
          left: "1rem",
          top: "-0.75rem",
          display: "flex",
          justifyContent: "center",
          paddingLeft: 1,
          paddingRight: 1,
          backgroundColor: "inherit",
        }}
      >
        {label}
      </FormLabel>
      {children}
    </ControlPanelLayout>
  )
}

export default LabelledControlPanelLayout
