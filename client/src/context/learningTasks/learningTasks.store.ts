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

export function learningTasksReducer(
  state: LearningTasksState,
  action: LearningTaskActions
): LearningTasksState {
  if (!action.payload) return state;
  switch (action.type) {
    case 'update_learning_tasks':
      console.log(action)
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
      }
    default:
      return state;
  }
}

export const LearningTasksContext = createContext<LearningTasksContextValue | null>(null);