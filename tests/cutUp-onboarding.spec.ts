import { test, expect } from "@playwright/test"

test("plays onboarding tour", async ({ page }) => {
  await page.goto("/")

  const step1 = await page.getByRole("tooltip", { name: "Cut up" })
  await expect(step1.getByText("1/7")).toBeVisible()
  await step1.getByRole("button", { name: "Next" }).click()

  const step2 = await page.getByRole("tooltip", { name: "Source text" })
  await expect(step2.getByText("2/7")).toBeVisible()
  await step2.getByRole("button", { name: "Next" }).click()

  const step3 = await page.getByRole("tooltip", { name: "Cut" })
  await expect(step3.getByText("3/7")).toBeVisible()
  await step3.getByRole("button", { name: "Next" }).click()

  const step4 = await page.getByRole("tooltip", { name: "Join" })
  await expect(step4.getByText("4/7")).toBeVisible()
  await step4.getByRole("button", { name: "Next" }).click()

  const step5 = await page.getByRole("tooltip", { name: "Cut up" })
  await expect(step5.getByText("5/7")).toBeVisible()
  await step5.getByRole("button", { name: "Next" }).click()

  const step6 = await page.getByRole("tooltip", { name: "Results" })
  await expect(step6.getByText("6/7")).toBeVisible()
  await step6.getByRole("button", { name: "Next" }).click()

  const step7 = await page.getByRole("tooltip", { name: "Help" })
  await expect(step7.getByText("7/7")).toBeVisible()
  await expect(step7.getByRole("button", { name: "Next" })).not.toBeVisible()

  await step7.getByRole("button", { name: "End Tour" }).click()
  await expect(page.getByRole("tooltip")).not.toBeVisible()

  const storage = await page.evaluate(() => localStorage)
  expect(storage.pages_visited).toContain("cutup_page")
})

test("ends onboarding tour", async ({ page }) => {
  await page.goto("/")

  const step1 = await page.getByRole("tooltip", { name: "Cut up" })
  await step1.getByRole("button", { name: "Next" }).click()

  const step2 = await page.getByRole("tooltip", { name: "Source text" })
  await step2.getByRole("button", { name: "Next" }).click()

  const step3 = await page.getByRole("tooltip", { name: "Cut" })
  await step3.getByRole("button", { name: "End Tour" }).click()

  await expect(page.getByRole("tooltip")).not.toBeVisible()

  const storage = await page.evaluate(() => localStorage)
  expect(storage.pages_visited).toContain("cutup_page")
})
