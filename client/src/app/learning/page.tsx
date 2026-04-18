'use client';

import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import { Draggable } from "@/components/swimlane/Draggable";
import Droppable, { DroppableTarget } from "@/components/swimlane/Droppable";
import styles from "./page.module.scss";

/**
 * Renders the learning board route with the current swim lane collection.
 *
 * @returns The learning workflow board for skill-progress tracking.
 */
export default function Learning() {
  const droppableTargets: DroppableTarget[] = [
    {
      id: 'A',
      title: 'Selected for Learning'
    },
    {
      id: 'B',
      title: 'Learning in Progress'
    },
    {
      id: 'C',
      title: 'Learning Completed'
    },
    {
      id: 'D',
      title: 'Learning in Verification'
    },
    {
      id: 'E',
      title: 'Learning Verified'
    },
  ];
  const [target, setTarget] = useState(droppableTargets[0].id);
  const draggable = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
  <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        setTarget(event.operation.target?.id as unknown as any);
      }}
    >
      <main>
        <div className={styles.board}>
          {droppableTargets.map((droppableTarget) => (
            <Droppable
              key={droppableTarget.id}
              id={droppableTarget.id}
              title={droppableTarget.title}
            >
              {target === droppableTarget.id ? draggable : `Empty`}
            </Droppable>
          ))}
        </div>
      </main>
    </DragDropProvider>
  );
}
