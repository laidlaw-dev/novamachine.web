import { useOnboardingTourStore } from "../../../../src/features/onboarding/hooks/useOnboardingTour"
import { renderHook, act } from "@testing-library/react"

const test_steps = [
  {
    key: "step_1",
    title: "step_1_title",
    text: "step_1_text",
  },
  {
    key: "step_2",
    title: "step_2_title",
    text: "step_2_text",
  },
  {
    key: "step_3",
    title: "step_3_title",
    text: "step_3_text",
  },
]

describe("useOnboardingTourStore", () => {
  describe("startTour", () => {
    test("startTour starts tour", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_1", document.createElement("div"))
        result.current.registerElement("step_2", document.createElement("div"))
        result.current.registerElement("step_3", document.createElement("div"))
      })

      act(() => {
        result.current.startTour()
      })

      expect(result.current.currentStep?.key).toBe("step_1")
      expect(result.current.currentStep?.title).toBe("step_1_title")
      expect(result.current.currentStep?.text).toBe("step_1_text")
      expect(result.current.currentStep?.stepNumber).toBe(1)
      expect(result.current.currentStep?.totalSteps).toBe(3)
      expect(result.current.currentStep?.targetElement).not.toBeNull()
    })
    test("when no registeredElements, startTour does nothing", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_4", document.createElement("div"))
      })

      act(() => {
        result.current.startTour()
      })

      expect(result.current.currentStep).toBeNull()
    })
  })
  describe("nextStep", () => {
    test("nextStep steps through all steps in tour", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_1", document.createElement("div"))
        result.current.registerElement("step_2", document.createElement("div"))
        result.current.registerElement("step_3", document.createElement("div"))
      })

      act(() => {
        result.current.startTour()
      })

      expect(result.current.currentStep?.key).toBe("step_1")
      expect(result.current.currentStep?.title).toBe("step_1_title")
      expect(result.current.currentStep?.text).toBe("step_1_text")
      expect(result.current.currentStep?.stepNumber).toBe(1)
      expect(result.current.currentStep?.totalSteps).toBe(3)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep?.key).toBe("step_2")
      expect(result.current.currentStep?.title).toBe("step_2_title")
      expect(result.current.currentStep?.text).toBe("step_2_text")
      expect(result.current.currentStep?.stepNumber).toBe(2)
      expect(result.current.currentStep?.totalSteps).toBe(3)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep?.key).toBe("step_3")
      expect(result.current.currentStep?.title).toBe("step_3_title")
      expect(result.current.currentStep?.text).toBe("step_3_text")
      expect(result.current.currentStep?.stepNumber).toBe(3)
      expect(result.current.currentStep?.totalSteps).toBe(3)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep).toBeNull()
    })
    test("when tour not started, nextStep does nothing", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_1", document.createElement("div"))
        result.current.registerElement("step_2", document.createElement("div"))
        result.current.registerElement("step_3", document.createElement("div"))
      })

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep).toBeNull()
    })
    test("when element not registerd, nextStep skips step", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_1", document.createElement("div"))
        result.current.registerElement("step_3", document.createElement("div"))
      })

      act(() => {
        result.current.startTour()
      })

      expect(result.current.currentStep?.key).toBe("step_1")
      expect(result.current.currentStep?.title).toBe("step_1_title")
      expect(result.current.currentStep?.text).toBe("step_1_text")
      expect(result.current.currentStep?.stepNumber).toBe(1)
      expect(result.current.currentStep?.totalSteps).toBe(2)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep?.key).toBe("step_3")
      expect(result.current.currentStep?.title).toBe("step_3_title")
      expect(result.current.currentStep?.text).toBe("step_3_text")
      expect(result.current.currentStep?.stepNumber).toBe(2)
      expect(result.current.currentStep?.totalSteps).toBe(2)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep).toBeNull()
    })
    test("when element removed during tour, nextStep skips step", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_1", document.createElement("div"))
        result.current.registerElement("step_2", document.createElement("div"))
        result.current.registerElement("step_3", document.createElement("div"))
      })

      act(() => {
        result.current.startTour()
      })

      expect(result.current.currentStep?.key).toBe("step_1")
      expect(result.current.currentStep?.title).toBe("step_1_title")
      expect(result.current.currentStep?.text).toBe("step_1_text")
      expect(result.current.currentStep?.stepNumber).toBe(1)
      expect(result.current.currentStep?.totalSteps).toBe(3)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.registerElement("step_2", null)
      })

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep?.key).toBe("step_3")
      expect(result.current.currentStep?.title).toBe("step_3_title")
      expect(result.current.currentStep?.text).toBe("step_3_text")
      expect(result.current.currentStep?.stepNumber).toBe(2)
      expect(result.current.currentStep?.totalSteps).toBe(2)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.nextStep()
      })

      expect(result.current.currentStep).toBeNull()
    })
  })
  describe("endTour", () => {
    test("endTour ends tour", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_1", document.createElement("div"))
        result.current.registerElement("step_2", document.createElement("div"))
        result.current.registerElement("step_3", document.createElement("div"))
      })

      act(() => {
        result.current.startTour()
      })

      expect(result.current.currentStep?.key).toBe("step_1")
      expect(result.current.currentStep?.title).toBe("step_1_title")
      expect(result.current.currentStep?.text).toBe("step_1_text")
      expect(result.current.currentStep?.stepNumber).toBe(1)
      expect(result.current.currentStep?.totalSteps).toBe(3)
      expect(result.current.currentStep?.targetElement).not.toBeNull()

      act(() => {
        result.current.endTour()
      })

      expect(result.current.currentStep).toBeNull()
    })
    test("when tour not started, endTour does nothing", () => {
      const { result } = renderHook(() => useOnboardingTourStore(test_steps))

      expect(result.current.currentStep).toBeNull()

      act(() => {
        result.current.registerElement("step_1", document.createElement("div"))
        result.current.registerElement("step_2", document.createElement("div"))
        result.current.registerElement("step_3", document.createElement("div"))
      })

      act(() => {
        result.current.endTour()
      })

      expect(result.current.currentStep).toBeNull()
    })
  })
})
