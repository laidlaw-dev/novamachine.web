import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import FullSizeTextArea from "../../../components/inputs/FullSizeTextArea"
import { useTranslation } from "react-i18next"
import ControlBarLayout from "../../../layouts/ControlBarLayout"
import Slider from "@mui/material/Slider"

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

const SliderBlock = styled("div")(({ theme }) => ({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}))

const Spacer = styled("div")(() => ({
  flex: 1,
}))

export interface CutUpInputFormFields {
  inputText: string
  sliceLength: number
  sliceRandomize: number
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
      sliceLength: 2,
      sliceRandomize: 5,
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
        <SliderBlock>
          <Controller
            name="sliceLength"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Slider step={1} marks min={2} max={5} {...field} />
            )}
          />
          <Controller
            name="sliceRandomize"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Slider step={1} marks min={0} max={10} {...field} />
            )}
          />
        </SliderBlock>
        <SliderBlock>
          <Controller
            name="joinLength"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Slider step={1} marks min={1} max={10} {...field} />
            )}
          />
          <Controller
            name="joinRandomize"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Slider step={1} marks min={0} max={10} {...field} />
            )}
          />
        </SliderBlock>
        <Spacer />
        <Button type="submit" size="large">
          {t("cut_up.action")}
        </Button>
      </ControlBarLayout>
    </FormLayout>
  )
}

export default CutUpInputForm
