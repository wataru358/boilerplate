import React from "react"

export type TTreeNode = {
  id: string
  childrenIds: string[]
  onRendered?: () => void
  isChildrenLoading?: boolean
  onBranchOpen?: () => void
  renderBranch?: (x: Omit<TTreeNode, "renderBranch">) => React.ReactNode
}
/**
 * Normalized tree obj
 */
export type TWholeTree = { [key: string]: TTreeNode }

export type TAction = {
  type: "load_tree_data"
  payload: TWholeTree
}

export type TState = { tree: TWholeTree }
