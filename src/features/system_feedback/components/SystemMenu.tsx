import IconButton from "@mui/material/IconButton"
import { useEffect, useState } from "react"
import useOnboardingTour from "../../onboarding/hooks/useOnboardingTour"
import * as ELEMENT from "../../../consts/elementKeys"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useTranslation } from "react-i18next"
import AboutDialog from "./AboutDialog"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Help from "@mui/icons-material/Help"
import Info from "@mui/icons-material/Info"

interface SystemMenuProps {
  hasOnboardingTour: boolean
}

const SystemMenu = ({ hasOnboardingTour }: SystemMenuProps) => {
  const { t } = useTranslation()

  const { registerElement, startTour } = useOnboardingTour()

  const [anchor, setAnchor] = useState<Element | null>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [aboutDialogOpen, setAboutDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (hasOnboardingTour) {
      registerElement(ELEMENT.COMMON_HELP, anchor)
    }
  }, [anchor, hasOnboardingTour])

  return (
    <div>
      <IconButton
        ref={setAnchor}
        color="inherit"
        onClick={() => setMenuOpen(state => !state)}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        {hasOnboardingTour && (
          <MenuItem
            onClick={() => {
              setMenuOpen(false)
              startTour()
            }}
          >
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText>{t("onboarding.help")}</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setMenuOpen(false)
            setAboutDialogOpen(true)
          }}
        >
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText>{t("common.about")}</ListItemText>
        </MenuItem>
      </Menu>
      <AboutDialog
        open={aboutDialogOpen}
        onClose={() => setAboutDialogOpen(false)}
      />
    </div>
  )
}

export default SystemMenu
