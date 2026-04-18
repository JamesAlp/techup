import {ReactNode} from 'react';
import {useDroppable} from '@dnd-kit/react';
import styles from './Droppable.module.css';

export type DroppableTarget = {
  id: string;
  title: string;
  children?: ReactNode;
};

/**
 * Renders a labeled swim lane with an accessible droppable region.
 *
 * @param props - The swim lane identifier, visible title, and lane content.
 * @returns A semantic swim lane section containing a titled drop area.
 */
export default function Droppable({id, title, children}: DroppableTarget) {
  const {ref} = useDroppable({
    id,
  });
  const titleId = `swimlane-title-${id}`;
  const dropAreaLabel = `${title} swim lane drop area`;

  return (
    <section className={styles.swimLane} aria-labelledby={titleId}>
      <header className={styles.title}>
        <h2 id={titleId} className={styles.titleText}>
          {title}
        </h2>
      </header>
      <div
        id={id}
        ref={ref}
        className={styles.droppable}
        role="group"
        aria-label={dropAreaLabel}
      >
        {children}
      </div>
    </section>
  );
}
