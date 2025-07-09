import { Locator, Page } from "@playwright/test"

const baseUrl = "http://localhost:5173"

export const createStorageState = (storage: object) => {
  const objectEntries = Object.entries(storage)
  const mappedEntries = objectEntries.map(entry => ({
    name: entry[0],
    value: JSON.stringify(entry[1]),
  }))

  return {
    cookies: [],
    origins: [
      {
        origin: baseUrl,
        localStorage: mappedEntries,
      },
    ],
  }
}

export const setSliderValue = async (
  page: Page,
  sliderTrack: Locator,
  value: number,
) => {
  const sliderClientRect = await sliderTrack.evaluate(el => {
    return el.getBoundingClientRect()
  })

  const slider = await sliderTrack.getByRole("slider")

  const values = await slider.evaluate(el => {
    const sliderElement = el as HTMLInputElement
    return {
      min: parseInt(sliderElement.min),
      max: parseInt(sliderElement.max),
    }
  })

  const pixelsPerValue = sliderClientRect.width / (values.max - values.min)
  const mouseXPosition = (value - values.min) * pixelsPerValue

  await page.mouse.click(
    sliderClientRect.left + mouseXPosition,
    sliderClientRect.top + sliderClientRect.height / 2,
  )
}
