import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import FullSizeTextArea from "../../../components/inputs/FullSizeTextArea"
import { useTranslation } from "react-i18next"
import ControlBarLayout from "../../../layouts/ControlBarLayout"

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

interface CutUpInputFormProps {
  onSubmitForm: (text: string) => void
}

interface CutUpInputFormFields {
  inputText: string
}

const CutUpInputForm = ({ onSubmitForm }: CutUpInputFormProps) => {
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<CutUpInputFormFields>({
    defaultValues: {
      inputText: "",
    },
  })

  const onSubmit: SubmitHandler<CutUpInputFormFields> = data =>
    onSubmitForm(data.inputText)

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
        <Button type="submit" size="large">
          {t("cut_up.action")}
        </Button>
      </ControlBarLayout>
    </FormLayout>
  )
}

export default CutUpInputForm
