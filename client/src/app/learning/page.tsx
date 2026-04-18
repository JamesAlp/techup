'use client';

import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import LearningTask, { LearningTaskProps } from "@/components/swimlane/LearningTask";
import LearningSwimlane, { LearningSwimlaneProps } from "@/components/swimlane/LearningSwimlane";
import styles from "./page.module.scss";

/**
 * Renders the learning board route with the current swim lane collection.
 *
 * @returns The learning workflow board for skill-progress tracking.
 */
export default function Learning() {
  const learningSwimlanes: LearningSwimlaneProps[] = [
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
  const learningTasks: LearningTaskProps[] = [
    {
      id: 'A',
      title: 'React.js',
      target: 'A'
    }
  ];

  return (
  <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        // todo: fix in future with dynamic swimlane switching logic
        // setTarget(event.operation.target?.id as unknown as any);
      }}
    >
      <main>
        <div className={styles.board}>
          {learningSwimlanes.map((learningSwimlane) => (
            <LearningSwimlane
              key={learningSwimlane.id}
              id={learningSwimlane.id}
              title={learningSwimlane.title}
            >
              {
                learningTasks.map((learningTask, index) => {
                  if (learningTask.target !== learningSwimlane.id) return;

                  return (
                    <LearningTask
                      key={index}
                      id={learningTask.id}
                      title={learningTask.title}
                      target={learningTask.target} />
                  );
                })
              }

              {/* {target === learningSwimlane.id ? learningTask : `Empty`} */}
            </LearningSwimlane>
          ))}
        </div>
      </main>
    </DragDropProvider>
  );
}
