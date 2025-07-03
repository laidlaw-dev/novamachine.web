import { useTheme } from "@mui/material/styles"
import { AnimatePresence, motion, Reorder } from "motion/react"
import { type ReactElement } from "react"
import { durations } from "../../theme/durations"

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
        maxHeight: "100%",
        padding: theme.spacing(1),
        margin: 0,
        listStyleType: "none",
        overflowY: "auto",
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
              default: { duration: durations.listItems / 1000 },
              height: {
                duration: durations.listItems / 1000,
                delay: durations.listItems / 1000,
              },
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
