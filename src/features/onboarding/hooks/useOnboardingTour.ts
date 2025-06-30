import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { hasVisitedPage, setVisitedPage } from "../utils/storage"
import type { OnboardingStep } from "../../../types"

export interface OnboardingStepWithTarget extends OnboardingStep {
  stepNumber: number
  totalSteps: number
  targetElement: Element
}

interface Tour {
  steps: OnboardingStep[]
  current: OnboardingStepWithTarget
}

export interface UseOnboardingTour {
  currentStep: OnboardingStepWithTarget | null
  startTour: () => void
  nextStep: () => void
  endTour: () => void
  registerElement: (key: string, element: Element | null) => void
  registerPage: (key: string | null) => void
}

export const useOnboardingTourStore = (
  steps: OnboardingStep[],
): UseOnboardingTour => {
  const elementMap = useRef<Map<string, Element> | null>(null)
  const [tour, setTour] = useState<Tour | null>(null)
  const [currentPage, setCurrentPage] = useState<string | null>(null)

  const getElementMap = useCallback(() => {
    if (!elementMap.current) {
      elementMap.current = new Map<string, Element>()
    }
    return elementMap.current
  }, [])

  const registerElement = useCallback(
    (key: string, element: Element | null) => {
      const map = getElementMap()
      if (element != null) {
        map.set(key, element)
      } else {
        map.delete(key)
      }
      return () => {
        map.delete(key)
      }
    },
    [getElementMap],
  )

  const startTour = useCallback(() => {
    const map = getElementMap()
    const tourSteps = steps.filter(step => map.has(step.key))
    if (tourSteps.length === 0) {
      setTour(null)
      return
    }
    const firstStep = tourSteps[0]
    setTour({
      steps: tourSteps,
      current: {
        ...firstStep,
        totalSteps: tourSteps.length,
        stepNumber: 1,
        targetElement: map.get(firstStep.key)!,
      },
    })
  }, [getElementMap, setTour, steps])

  const nextStep = useCallback(() => {
    if (tour == null) return
    const map = getElementMap()
    const tourSteps = tour.steps.filter(step => map.has(step.key))
    if (tour.current.stepNumber >= tourSteps.length) {
      setTour(null)
      return
    }
    const nextStep = tourSteps[tour.current.stepNumber]
    setTour(state => ({
      steps: tourSteps,
      current: {
        ...nextStep,
        totalSteps: tourSteps.length,
        stepNumber: state!.current.stepNumber + 1,
        targetElement: map.get(nextStep.key)!,
      },
    }))
  }, [getElementMap, setTour, tour])

  const endTour = useCallback(() => {
    setTour(null)
  }, [setTour])

  useEffect(() => {
    if (currentPage != null) {
      if (!hasVisitedPage(currentPage)) {
        setVisitedPage(currentPage)
        startTour()
      }
    }
  }, [currentPage, startTour])

  return {
    currentStep: tour != null ? tour.current : null,
    startTour,
    nextStep,
    endTour,
    registerElement,
    registerPage: setCurrentPage,
  }
}

export const OnboardingTourContext = createContext<UseOnboardingTour | null>(
  null,
)

const useOnboardingTour = () => {
  const context = useContext(OnboardingTourContext)
  if (!context) {
    throw new Error(
      "No OnboardingTourContext set, use OnboardingTourProvider to set one",
    )
  }
  return context
}

export default useOnboardingTour
