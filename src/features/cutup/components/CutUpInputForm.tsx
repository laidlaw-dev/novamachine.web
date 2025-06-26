import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import FullSizeTextArea from "../../../components/inputs/FullSizeTextArea"
import { useTranslation } from "react-i18next"
import ControlBarLayout from "../../../layouts/ControlBarLayout"
import LabelledControlPanelLayout from "../../../layouts/LabelledControlPanelLayout"
import LabelledSlider from "../../../components/inputs/LabelledSlider"

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

const Spacer = styled("div")(() => ({
  flex: 1,
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

  const { handleSubmit, control } = useForm<CutUpInputFormFields>({
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
      <TextInput>
        <Controller
          name="inputText"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FullSizeTextArea
              {...field}
              placeholder={t("cut_up.enter_source_text")}
            />
          )}
        />
      </TextInput>
      <ControlBarLayout>
        <LabelledControlPanelLayout
          label={t("cut_up.cut")}
          width="300px"
          color="background"
        >
          <Controller
            name="cutLength"
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
            name="cutRandomize"
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
        <LabelledControlPanelLayout
          label={t("cut_up.join")}
          width="300px"
          color="background"
        >
          <Controller
            name="joinLength"
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
            name="joinRandomize"
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
        <Spacer />
        <Button type="submit" size="large">
          {t("cut_up.action")}
        </Button>
      </ControlBarLayout>
    </FormLayout>
  )
}

export default CutUpInputForm
