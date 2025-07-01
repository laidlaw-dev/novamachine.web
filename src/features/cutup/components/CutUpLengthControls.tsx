import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import LabelledSlider from "../../../components/inputs/LabelledSlider"
import ControlBarLayoutItem from "../../../layouts/ControlBarLayoutItem"
import LabelledControlPanelLayout from "../../../layouts/LabelledControlPanelLayout"
import { useTranslation } from "react-i18next"
import type { Ref } from "react"

interface CutUpLengthControlsProps<FV extends FieldValues> {
  label: string
  lengthName: Path<FV>
  randomizeName: Path<FV>
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  control: Control<FV, any, FV>
  ref?: Ref<HTMLDivElement>
}

const CutUpLengthControls = <FV extends FieldValues>({
  label,
  lengthName,
  randomizeName,
  control,
  ref,
}: CutUpLengthControlsProps<FV>) => {
  const { t } = useTranslation()

  return (
    <ControlBarLayoutItem size="medium">
      <LabelledControlPanelLayout
        ref={ref}
        label={label}
        width="100%"
        color="background"
      >
        <Controller
          name={lengthName}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LabelledSlider
              label={t("cut_up.length")}
              step={1}
              marks
              min={1}
              max={10}
              {...field}
            />
          )}
        />
        <Controller
          name={randomizeName}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LabelledSlider
              label={t("cut_up.random")}
              step={1}
              marks
              min={0}
              max={10}
              {...field}
            />
          )}
        />
      </LabelledControlPanelLayout>
    </ControlBarLayoutItem>
  )
}

export default CutUpLengthControls
