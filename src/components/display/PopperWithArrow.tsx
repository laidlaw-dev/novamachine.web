import Fade from "@mui/material/Fade"
import type { PopperProps } from "@mui/material/Popper"
import Popper from "@mui/material/Popper"
import { styled } from "@mui/material/styles"
import { useState, type ReactNode } from "react"

interface StyledPopperProps {
  arrowColor: string
}

const StyledPopper = styled(Popper, {
  shouldForwardProp: prop => prop !== "arrowColor",
})<StyledPopperProps>(({ arrowColor }) => ({
  "&[data-popper-placement*='bottom'] .arrow": {
    top: 0,
    left: 0,
    marginTop: "-1.9em",
    width: "6em",
    height: "2em",
    "&::before": {
      borderWidth: "0 2em 2em 2em",
      borderColor: `transparent transparent ${arrowColor} transparent`,
    },
  },
  "&[data-popper-placement*='top'] .arrow": {
    bottom: 0,
    left: 0,
    marginBottom: "-1.9em",
    width: "6em",
    height: "2em",
    "&::before": {
      borderWidth: "2em 2em 0 2em",
      borderColor: `${arrowColor} transparent transparent transparent`,
    },
  },
  "&[data-popper-placement*='right'] .arrow": {
    left: 0,
    marginLeft: "-1.9em",
    height: "6em",
    width: "2em",
    "&::before": {
      borderWidth: "2em 2em 2em 0",
      borderColor: `transparent ${arrowColor} transparent transparent`,
    },
  },
  "&[data-popper-placement*='left'] .arrow": {
    right: 0,
    marginRight: "-1.9em",
    height: "6em",
    width: "2em",
    "&::before": {
      borderWidth: "2em 0 2em 2em",
      borderColor: `transparent transparent transparent ${arrowColor}`,
    },
  },
}))

const Arrow = styled("div")(() => ({
  position: "absolute",
  fontSize: 7,
  width: "3em",
  height: "3em",
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
}))

interface PopperWithArrowProps extends PopperProps {
  arrowColor: string
  children: ReactNode
}

const PopperWithArrow = (props: PopperWithArrowProps) => {
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null)

  const { children, arrowColor, ref, ...rest } = props
  return (
    <StyledPopper
      ref={ref}
      arrowColor={arrowColor}
      transition
      {...rest}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
        {
          name: "flip",
          options: {
            padding: 8,
          },
        },
        {
          name: "preventOverflow",
          options: {
            mainAxis: true,
            altAxis: true,
            padding: 8,
          },
        },
        {
          name: "offset",
          options: {
            offset: [4, 4],
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <div>
            <Arrow ref={setArrowRef} className="arrow" />
            {children}
          </div>
        </Fade>
      )}
    </StyledPopper>
  )
}

export default PopperWithArrow
