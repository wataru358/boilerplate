import { createContext, useContext, Dispatch } from "react"
import { TAction, TState } from "./types"

const initialState = {
  tree: { root: { id: "root", childrenIds: [] } },
}



/**
 * Context
 */
export const StateContext = createContext<TState>(initialState)
export const DispatchContext = createContext<Dispatch<TAction>>(() => {})

/**
 * Hooks
 */
export const useStore = () => {
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)
  return { dispatch, state }
}
