import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import FullSizeTextArea from "../../../components/inputs/FullSizeTextArea"

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
  onSubmitForm: (text: string) => void
}

interface CutUpInputFormFields {
  inputText: string
}

const CutUpInputForm = ({ onSubmitForm }: CutUpInputFormProps) => {
  const { handleSubmit, control, reset } = useForm<CutUpInputFormFields>({
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
        <Button type="submit">Submit</Button>
      </Paper>
    </FormLayout>
  )
}

export default CutUpInputForm
