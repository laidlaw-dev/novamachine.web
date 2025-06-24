export type CutUpText = {
  index: number
  text: string
}

type CutUpReducerState = {
  results: CutUpText[]
  currentMaxIndex: number
}

export const initialState: CutUpReducerState = {
  results: [],
  currentMaxIndex: 0,
}

type CutUpReducerActionAdd = {
  type: "add"
  payload: {
    results: string[]
  }
}

type CutUpReducerActionDeleteSingle = {
  type: "delete_single"
  payload: {
    index: number
  }
}

type CutUpReducerActionDeleteAll = {
  type: "delete_all"
}

type CutUpReducerActionReorder = {
  type: "reorder"
  payload: {
    indicies: number[]
  }
}

type CutUpReducerAction =
  | CutUpReducerActionAdd
  | CutUpReducerActionDeleteSingle
  | CutUpReducerActionDeleteAll
  | CutUpReducerActionReorder

export const cutUpReducerFunction = (
  state: CutUpReducerState,
  action: CutUpReducerAction,
) => {
  switch (action.type) {
    case "add": {
      const newItems = action.payload.results.map((text, index) => ({
        index: state.currentMaxIndex + index,
        text: text,
      }))
      return {
        results: [...state.results, ...newItems],
        currentMaxIndex: state.currentMaxIndex + newItems.length,
      }
    }
    case "delete_single": {
      return {
        ...state,
        results: state.results.filter(
          item => item.index !== action.payload.index,
        ),
      }
    }
    case "delete_all": {
      return {
        ...state,
        results: [],
      }
    }
    case "reorder": {
      const newOrder: CutUpText[] = []
      action.payload.indicies.forEach(index => {
        const item = state.results.find(result => result.index === index)
        if (item) {
          newOrder.push(item)
        }
      })
      return {
        ...state,
        results: newOrder,
      }
    }
  }
}
