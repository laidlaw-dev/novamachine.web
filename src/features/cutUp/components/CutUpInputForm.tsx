import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import {
  Controller,
  useForm,
  type Control,
  type FieldValues,
  type Path,
  type SubmitHandler,
} from "react-hook-form"
import FullSizeTextArea from "../../../components/inputs/FullSizeTextArea"
import { useTranslation } from "react-i18next"
import ControlBarLayout from "../../../layouts/ControlBarLayout"
import ControlBarLayoutItem from "../../../layouts/ControlBarLayoutItem"
import useOnboardingTour from "../../onboarding/hooks/useOnboardingTour"
import * as ELEMENT from "../../../consts/elementKeys"
import LabelledControlPanelLayout from "../../../layouts/LabelledControlPanelLayout"
import type { Ref } from "react"
import Slider from "@mui/material/Slider"
import FormControlLabel from "@mui/material/FormControlLabel"

const FormLayout = styled("form")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}))

const TextInput = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  padding: theme.spacing(1),
  overflowY: "auto",
}))

export interface CutUpInputFormFields {
  inputText: string
  cutLength: number
  cutRandomize: number
  joinLength: number
  joinRandomize: number
}

interface CutUpInputFormProps {
  onSubmitForm: (data: CutUpInputFormFields) => void
}

const CutUpInputForm = ({ onSubmitForm }: CutUpInputFormProps) => {
  const { t } = useTranslation()
  const { registerElement } = useOnboardingTour()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CutUpInputFormFields>({
    defaultValues: {
      inputText: "",
      cutLength: 2,
      cutRandomize: 5,
      joinLength: 3,
      joinRandomize: 5,
    },
  })

  const onSubmit: SubmitHandler<CutUpInputFormFields> = data =>
    onSubmitForm(data)

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        ref={element => registerElement(ELEMENT.CUTUP_SOURCE_TEXT, element)}
      >
        <Controller
          name="inputText"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <>
                <FullSizeTextArea
                  {...field}
                  placeholder={t("cut_up.enter_source_text")}
                  errorMessage={
                    errors.inputText?.type === "required"
                      ? t("cut_up.validation_no_text")
                      : undefined
                  }
                />
                {}
              </>
            )
          }}
        />
      </TextInput>
      <ControlBarLayout>
        <CutUpLengthControls
          label={t("cut_up.cut")}
          lengthName="cutLength"
          randomizeName="cutRandomize"
          control={control}
          ref={element => registerElement(ELEMENT.CUTUP_CUT, element)}
        />
        <CutUpLengthControls
          label={t("cut_up.join")}
          lengthName="joinLength"
          randomizeName="joinRandomize"
          control={control}
          ref={element => registerElement(ELEMENT.CUTUP_JOIN, element)}
        />
        <ControlBarLayoutItem size="small">
          <Button
            type="submit"
            size="large"
            ref={element => registerElement(ELEMENT.CUTUP_CUTUP, element)}
          >
            {t("cut_up.action")}
          </Button>
        </ControlBarLayoutItem>
      </ControlBarLayout>
    </FormLayout>
  )
}

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
            <FormControlLabel
              label={t("cut_up.length")}
              control={
                <Slider
                  data-testid={lengthName}
                  step={1}
                  marks
                  min={1}
                  max={10}
                  {...field}
                />
              }
              labelPlacement="bottom"
            />
          )}
        />
        <Controller
          name={randomizeName}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControlLabel
              label={t("cut_up.random")}
              control={
                <Slider
                  data-testid={randomizeName}
                  step={1}
                  marks
                  min={0}
                  max={10}
                  {...field}
                />
              }
              labelPlacement="bottom"
            />
          )}
        />
      </LabelledControlPanelLayout>
    </ControlBarLayoutItem>
  )
}

export default CutUpInputForm
