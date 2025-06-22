import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import FullSizeTextArea from "../../../components/inputs/FullSizeTextArea"
import { useTranslation } from "react-i18next"

const FormLayout = styled("form")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}))

const TextInput = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  padding: theme.spacing(1),
  overflowY: "auto",
}))

interface CutUpInputFormProps {
  hasResults: boolean
  onShowResults: () => void
  onSubmitForm: (text: string) => void
}

interface CutUpInputFormFields {
  inputText: string
}

const CutUpInputForm = ({
  hasResults,
  onShowResults,
  onSubmitForm,
}: CutUpInputFormProps) => {
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
          render={({ field }) => <FullSizeTextArea {...field} />}
        />
      </TextInput>
      <Paper>
        <Button onClick={onShowResults} disabled={!hasResults}>
          {t("cut_up.cut_ups")}
        </Button>
        <Button type="submit">{t("cut_up.action")}</Button>
      </Paper>
    </FormLayout>
  )
}

export default CutUpInputForm
