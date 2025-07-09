import { test, expect } from "@playwright/test"
import { createStorageState, setSliderValue } from "./_test-helpers"

test.use({
  storageState: createStorageState({ pages_visited: ["cutup_page"] }),
})

test("when paged already visited, does not show onboaring tour", async ({
  page,
}) => {
  await page.goto("/")

  await expect(page.getByRole("tooltip", { name: "Cut up" })).not.toBeAttached({
    timeout: 100,
  })

  const storage = await page.evaluate(() => localStorage)
  expect(storage.pages_visited).toContain("cutup_page")
})

test("clicking on system menu > about shows about dialog", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("button", { name: "System menu" }).click()
  await page.getByText("About").click()

  await expect(
    page.getByRole("dialog", { name: "The Nova Machine" }),
  ).toBeVisible()
})

test("clicking on system menu > help starts onboarding tour", async ({
  page,
}) => {
  await page.goto("/")

  await page.getByRole("button", { name: "System menu" }).click()
  await page.getByText("Help").click()

  await expect(page.getByRole("tooltip", { name: "Cut up" })).toBeVisible()
})

test("when no results displays no results", async ({ page }) => {
  await page.goto("/")

  await expect(
    page.getByRole("region", { name: "Cut up results" }).getByText("No result"),
  ).toBeVisible()
})

test("clicking on cut up when source text is empty displays validation error", async ({
  page,
}) => {
  await page.goto("/")

  await page.getByRole("button", { name: "Cut up" }).click()

  await expect(page.getByText("Cut up requires some text")).toBeVisible()
})

test("clicking on cut up produces results", async ({ page }) => {
  await page.goto("/")

  await setSliderValue(page, await page.getByTestId("cutLength"), 2)
  await setSliderValue(page, await page.getByTestId("cutRandomize"), 0)
  await setSliderValue(page, await page.getByTestId("joinLength"), 1)
  await setSliderValue(page, await page.getByTestId("joinRandomize"), 0)

  await page
    .getByRole("textbox")
    .fill("Aaa Bbb Ccc Ddd Eee Fff Ggg Hhh Iii Jjj")

  await page.getByRole("button", { name: "Cut up" }).click()

  const results = page.getByRole("region", { name: "Cut up results" })

  await expect(results.getByText("aaa bbb")).toBeVisible()
  await expect(results.getByText("ccc ddd")).toBeVisible()
  await expect(results.getByText("eee fff")).toBeVisible()
  await expect(results.getByText("ggg hhh")).toBeVisible()
  await expect(results.getByText("iii jjj")).toBeVisible()

  await expect(results.getByText("No result")).not.toBeAttached()
})

test("adjusting sliders and clicking on cut up produces results", async ({
  page,
}) => {
  await page.goto("/")

  await setSliderValue(page, await page.getByTestId("cutLength"), 3)
  await setSliderValue(page, await page.getByTestId("cutRandomize"), 0)
  await setSliderValue(page, await page.getByTestId("joinLength"), 1)
  await setSliderValue(page, await page.getByTestId("joinRandomize"), 0)

  await page
    .getByRole("textbox")
    .fill("Aaa Bbb Ccc Ddd Eee Fff Ggg Hhh Iii Jjj")

  await page.getByRole("button", { name: "Cut up" }).click()

  const results = page.getByRole("region", { name: "Cut up results" })

  await expect(results.getByText("aaa bbb ccc")).toBeVisible()
  await expect(results.getByText("ddd eee fff")).toBeVisible()
  await expect(results.getByText("ggg hhh iii")).toBeVisible()
  await expect(results.getByText("jjj")).toBeVisible()

  await expect(results.getByText("No result")).not.toBeAttached()
})

test("clicking on cut up twice adds to results", async ({ page }) => {
  await page.goto("/")

  await setSliderValue(page, await page.getByTestId("cutLength"), 2)
  await setSliderValue(page, await page.getByTestId("cutRandomize"), 0)
  await setSliderValue(page, await page.getByTestId("joinLength"), 1)
  await setSliderValue(page, await page.getByTestId("joinRandomize"), 0)

  await await page
    .getByRole("textbox")
    .fill("Aaa Bbb Ccc Ddd Eee Fff Ggg Hhh Iii Jjj")

  await page.getByRole("button", { name: "Cut up" }).click()
  await page.getByRole("button", { name: "Cut up" }).click()

  const results = await page.getByRole("region", { name: "Cut up results" })

  await expect(results.getByText("aaa bbb")).toHaveCount(2)
  await expect(results.getByText("ccc ddd")).toHaveCount(2)
  await expect(results.getByText("eee fff")).toHaveCount(2)
  await expect(results.getByText("ggg hhh")).toHaveCount(2)
  await expect(results.getByText("iii jjj")).toHaveCount(2)

  await expect(results.getByText("No result")).not.toBeAttached()
})

test("dragging a result reorders results", async ({ page }) => {
  await page.goto("/")

  await setSliderValue(page, await page.getByTestId("cutLength"), 2)
  await setSliderValue(page, await page.getByTestId("cutRandomize"), 0)
  await setSliderValue(page, await page.getByTestId("joinLength"), 1)
  await setSliderValue(page, await page.getByTestId("joinRandomize"), 0)

  await page
    .getByRole("textbox")
    .fill("Aaa Bbb Ccc Ddd Eee Fff Ggg Hhh Iii Jjj")

  await page.getByRole("button", { name: "Cut up" }).click()

  await page
    .getByRole("region", { name: "Cut up results" })
    .getByTestId("result_3")
    .hover()
  await page.mouse.down()
  await page
    .getByRole("region", { name: "Cut up results" })
    .getByTestId("result_0")
    .hover()
  await page.waitForTimeout(500)
  await page.mouse.up()

  //  Let animation settle
  await page.waitForTimeout(500)

  const result3Top = await page
    .getByRole("region", { name: "Cut up results" })
    .getByTestId("result_3")
    .evaluate(el => el.getBoundingClientRect().top)

  const result1Top = await page
    .getByRole("region", { name: "Cut up results" })
    .getByTestId("result_1")
    .evaluate(el => el.getBoundingClientRect().top)

  const result2Top = await page
    .getByRole("region", { name: "Cut up results" })
    .getByTestId("result_2")
    .evaluate(el => el.getBoundingClientRect().top)

  expect(result3Top).toBeLessThan(result1Top)
  expect(result3Top).toBeLessThan(result2Top)
  expect(result1Top).toBeLessThan(result2Top)
})

test("clicking on delete for one result deletes that result", async ({
  page,
}) => {
  await page.goto("/")

  await setSliderValue(page, await page.getByTestId("cutLength"), 2)
  await setSliderValue(page, await page.getByTestId("cutRandomize"), 0)
  await setSliderValue(page, await page.getByTestId("joinLength"), 1)
  await setSliderValue(page, await page.getByTestId("joinRandomize"), 0)

  await page
    .getByRole("textbox")
    .fill("Aaa Bbb Ccc Ddd Eee Fff Ggg Hhh Iii Jjj")

  await page.getByRole("button", { name: "Cut up" }).click()

  const results = await page.getByRole("region", { name: "Cut up results" })

  const li = await results.getByRole("listitem").filter({
    has: page.getByText("aaa bbb"),
  })

  await li.getByRole("button").click()

  await expect(results.getByText("ccc ddd")).toBeVisible()
  await expect(results.getByText("eee fff")).toBeVisible()
  await expect(results.getByText("ggg hhh")).toBeVisible()
  await expect(results.getByText("iii jjj")).toBeVisible()

  await expect(results.getByText("aaa bbb")).not.toBeAttached()
  await expect(results.getByText("No result")).not.toBeAttached()
})

test("clicking on delete all deletes all results", async ({ page }) => {
  await page.goto("/")

  await setSliderValue(page, await page.getByTestId("cutLength"), 2)
  await setSliderValue(page, await page.getByTestId("cutRandomize"), 0)
  await setSliderValue(page, await page.getByTestId("joinLength"), 1)
  await setSliderValue(page, await page.getByTestId("joinRandomize"), 0)

  await page
    .getByRole("textbox")
    .fill("Aaa Bbb Ccc Ddd Eee Fff Ggg Hhh Iii Jjj")

  await page.getByRole("button", { name: "Cut up" }).click()

  const results = page.getByRole("region", { name: "Cut up results" })

  await expect(results.getByText("aaa bbb")).toBeVisible()
  await expect(results.getByText("ccc ddd")).toBeVisible()
  await expect(results.getByText("eee fff")).toBeVisible()
  await expect(results.getByText("ggg hhh")).toBeVisible()
  await expect(results.getByText("iii jjj")).toBeVisible()

  await results.getByRole("button", { name: "Delete all" }).click()

  await expect(results.getByText("aaa bbb")).not.toBeAttached()
  await expect(results.getByText("ccc ddd")).not.toBeAttached()
  await expect(results.getByText("eee fff")).not.toBeAttached()
  await expect(results.getByText("ggg hhh")).not.toBeAttached()
  await expect(results.getByText("iii jjj")).not.toBeAttached()

  await expect(results.getByText("No results")).toBeVisible()
})
