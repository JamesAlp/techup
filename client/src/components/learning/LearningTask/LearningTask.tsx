import { useDraggable } from '@dnd-kit/react';
import { Dispatch } from 'react';
import { LearningTaskModalState } from '../LearningTaskModal/LearningTaskModal';

export type LearningTaskItem = {
  id: string,
  title: string,
  progress: number,
  description?: string,
  learningResource?: string,
  swimlane?: string;
};

export type LearningTaskProps = {
  learningTaskItem: LearningTaskItem;
  setSelectedTaskId: (id: string) => void;
};

/**
 * Renders a draggable learning task control for a swim lane.
 *
 * @param props - The task identifier and visible content.
 * @returns A button element wired into the drag-and-drop system.
 */
export default function LearningTask({ learningTaskItem, setSelectedTaskId }: LearningTaskProps) {
  const { id, title } = learningTaskItem;
  const { ref } = useDraggable({
    id,
  });

  return (
    <button ref={ref} type="button" onClick={() => setSelectedTaskId(id)}>{title}</button>
  );
}
