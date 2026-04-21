import { LearningTaskItem } from "@/components/learning/LearningTask/LearningTask";
import { createContext, Dispatch } from "react";

export type LearningTasksState = {
  learningTasks: LearningTaskItem[];
};

export type LearningTaskActions =
  | { type: 'set_learning_tasks'; payload: LearningTaskItem[]; }
  | { type: 'add_learning_tasks'; payload: LearningTaskItem; }
  | { type: 'update_learning_tasks'; payload: LearningTaskItem; }
  | { type: 'delete_learning_tasks'; payload: string; }; // id

export type LearningTasksContextValue = {
  state: LearningTasksState;
  dispatch: Dispatch<LearningTaskActions>;
};

/**
 * Applies learning-task state updates for board-level task actions.
 *
 * @param state - The current learning task collection.
 * @param action - The task action to apply.
 * @returns The next learning task state after the action is reduced.
 */
export function learningTasksReducer(
  state: LearningTasksState,
  action: LearningTaskActions
): LearningTasksState {
  if (!action.payload) return state;
  switch (action.type) {
    case 'add_learning_tasks':
      return {
        ...state,
        learningTasks: [
          ...state.learningTasks,
          action.payload
        ]
      };
    case 'update_learning_tasks':
      return {
        ...state,
        learningTasks: state.learningTasks.map(learningTask =>
          learningTask.id === action.payload.id ?
          {
            ...learningTask,
            ...action.payload
          }
          : learningTask
        )
      };
    case 'delete_learning_tasks':
      return {
        ...state,
        learningTasks: state.learningTasks.filter(
          (learningTask) => learningTask.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export const LearningTasksContext = createContext<LearningTasksContextValue | null>(null);
