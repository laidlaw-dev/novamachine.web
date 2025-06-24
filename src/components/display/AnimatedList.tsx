import { useTheme } from "@mui/material/styles"
import { AnimatePresence, motion, Reorder } from "motion/react"
import { type ReactElement } from "react"

interface AnimatedListProps {
  onReorder: (keys: string[]) => void
  children: ReactElement[]
}

const AnimatedList = ({ onReorder, children }: AnimatedListProps) => {
  const theme = useTheme()

  const MotionListItem = motion.create("div")

  return (
    <Reorder.Group
      axis="y"
      values={children}
      onReorder={items => onReorder(items.map(i => i.key ?? ""))}
      layoutScroll
      style={{
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        margin: 0,
        listStyleType: "none",
        overflowY: "auto",
        height: "400px",
      }}
    >
      <AnimatePresence>
        {children.map(child => (
          <Reorder.Item
            key={child.key}
            value={child}
            initial={{ opacity: 1, height: "auto" }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              default: { duration: 0.25 },
              height: { duration: 0.25, delay: 0.25 },
            }}
            style={{
              cursor: "grab",
              marginBottom: theme.spacing(0.5),
              "&:firstChild": {
                marginBottom: theme.spacing(0.25),
              },
            }}
          >
            <MotionListItem>{child}</MotionListItem>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  )
}

export default AnimatedList
