import { styled } from "@mui/material/styles"
import { useTranslation } from "react-i18next"
import ControlBarLayout from "../../../layouts/ControlBarLayout"
import ContentCopy from "@mui/icons-material/ContentCopy"
import IconActionButton from "../../../components/inputs/IconActionButton"
import CutUpResult from "./CutUpResult"
import type { CutUpText } from "../hooks/cutUpReducer"
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"
import AnimatedList from "../../../components/display/AnimatedList"
import Typography from "@mui/material/Typography"

const Panel = styled("div")(({ theme }) => ({
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}))

const ResultsPanel = styled("div")(({ theme }) => ({
  flex: 1,
  borderRadius: theme.shape.borderRadius,
  overflowY: "hidden",
}))

const NoResults = styled("div")(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

interface CutUpResultsPanelProps {
  cutUpResults: CutUpText[]
  onDeleteSingle: (index: number) => void
  onDeleteAll: () => void
  onReorder: (keys: string[]) => void
  onCopyToClipboard: () => void
}

const CutUpResultsPanel = ({
  cutUpResults,
  onDeleteSingle,
  onDeleteAll,
  onReorder,
  onCopyToClipboard,
}: CutUpResultsPanelProps) => {
  const { t } = useTranslation()
  return (
    <Panel>
      <ResultsPanel>
        {cutUpResults.length === 0 ? (
          <NoResults>
            <Typography variant="mono">{t("cut_up.no_results")}</Typography>
          </NoResults>
        ) : (
          <AnimatedList onReorder={onReorder}>
            {cutUpResults.map(item => (
              <CutUpResult
                key={item.index}
                text={item}
                onDelete={onDeleteSingle}
              />
            ))}
          </AnimatedList>
        )}
      </ResultsPanel>
      <ControlBarLayout>
        <IconActionButton
          title={t("common.copy_to_clipboard")}
          onClick={onCopyToClipboard}
        >
          <ContentCopy />
        </IconActionButton>
        <IconActionButton title={t("common.delete_all")} onClick={onDeleteAll}>
          <DeleteOutlined />
        </IconActionButton>
      </ControlBarLayout>
    </Panel>
  )
}

export default CutUpResultsPanel
