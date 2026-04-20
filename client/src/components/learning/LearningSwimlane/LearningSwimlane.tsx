import {ReactNode} from 'react';
import {useDroppable} from '@dnd-kit/react';
import styles from './LearningSwimlane.module.css';

export type LearningSwimlaneProps = {
  id: string;
  title: string;
  children?: ReactNode;
};

/**
 * Renders a labeled learning swim lane with an accessible drop area.
 *
 * @param props - The swim lane identifier, visible title, and lane content.
 * @returns A semantic learning swim lane section containing a titled drop area.
 */
export default function LearningSwimlane({id, title, children}: LearningSwimlaneProps) {
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
        className={styles.learningSwimlaneBody}
        role="group"
        aria-label={dropAreaLabel}
      >
        {children}
      </div>
    </section>
  );
}
