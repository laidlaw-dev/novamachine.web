import type { SliderOwnProps } from "@mui/material/Slider"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

const Container = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
}))

interface LabelledSliderProps extends SliderOwnProps<number> {
  label: string
}

const LabelledSlider = ({ label, ...sliderProps }: LabelledSliderProps) => {
  return (
    <Container>
      <Typography variant="caption">{label}</Typography>
      <Slider {...sliderProps} />
    </Container>
  )
}

export default LabelledSlider
