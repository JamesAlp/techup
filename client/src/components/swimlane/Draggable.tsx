import {useDraggable} from '@dnd-kit/react';
import { ReactNode } from 'react';

type DraggableProps = {
  id: string;
  children: ReactNode;
};

/**
 * Renders a draggable control for a swim lane item.
 *
 * @param props - The draggable identifier and visible content.
 * @returns A button element wired into the drag-and-drop system.
 */
export function Draggable({id, children}: DraggableProps) {
  const {ref} = useDraggable({
    id,
  });

  return (
    <button ref={ref} type="button">
      {children}
    </button>
  );
}
