import {useDraggable} from '@dnd-kit/react';
import { ReactNode } from 'react';

export type LearningTaskProps = {
  id: string;
  title: string;
  target: string;
};

/**
 * Renders a draggable learning task control for a swim lane.
 *
 * @param props - The task identifier and visible content.
 * @returns A button element wired into the drag-and-drop system.
 */
export default function LearningTask({id, title}: LearningTaskProps) {
  const {ref} = useDraggable({
    id,
  });

  return (
    <button ref={ref} type="button">{title}</button>
  );
}
