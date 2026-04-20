'use client';

import { DragDropProvider } from "@dnd-kit/react";
import styles from "./page.module.scss";
import LearningSwimlane, { LearningSwimlaneProps } from "@/components/learning/LearningSwimlane/LearningSwimlane";
import LearningTaskModal, { LearningTaskModalState } from "@/components/learning/LearningTaskModal/LearningTaskModal";
import { useMemo, useState } from "react";
import LearningTask, { LearningTaskItem } from "@/components/learning/LearningTask/LearningTask";

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
  const learningTaskItems: LearningTaskItem[] = [
    {
      id: 'A',
      title: 'React.js',
      description: 'Complete the core React lessons.',
      learningResource: 'Udemy React course',
      progress: 25,
      swimlane: 'A',
    },
    {
      id: 'A',
      title: 'React.js 2',
      description: 'Complete the core React lessons.',
      learningResource: 'Udemy React course',
      progress: 25,
      swimlane: 'A',
    },
  ];
  const [modalState, setModalState] = useState<LearningTaskModalState>({
    open: false,
    learningTaskId: undefined,
  });
  const setSelectedTaskId = (id: string) => {
    setModalState({
      open: true,
      learningTaskId: id
    });
  };
  const selectedLearningTask = useMemo(() =>
    learningTaskItems.find((learningTask) => learningTask.id === modalState.learningTaskId
    ), [modalState.learningTaskId]);

  return (
    <main>
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          // todo: fix in future with dynamic swimlane switching logic
          // setTarget(event.operation.target?.id as unknown as any);
        }}
      >
        <div className={styles.board}>
          {learningSwimlanes.map((learningSwimlane) => (
            <LearningSwimlane
              key={learningSwimlane.id}
              id={learningSwimlane.id}
              title={learningSwimlane.title}
            >
              {
                learningTaskItems.map((learningTaskItem, index) => {
                  if (learningTaskItem.swimlane !== learningSwimlane.id) return;

                  return (
                    <LearningTask
                      key={index}
                      learningTaskItem={learningTaskItem}
                      setSelectedTaskId={setSelectedTaskId} />
                  );
                })
              }
            </LearningSwimlane>
          ))}
        </div>
      </DragDropProvider>

      <LearningTaskModal
        open={modalState.open}
        learningTask={selectedLearningTask}
        onClose={() => {
          setModalState({
            open: false,
            learningTaskId: undefined,
          });
        }}
      />
    </main>
  );
}
