'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DragDropProvider } from '@dnd-kit/react';
import LearningSwimlane, {
  LearningSwimlaneProps,
} from '@/components/learning/LearningSwimlane/LearningSwimlane';
import LearningTask, { LearningTaskItem } from '@/components/learning/LearningTask/LearningTask';
import LearningTaskModal, {
  LearningTaskModalState,
} from '@/components/learning/LearningTaskModal/LearningTaskModal';
import { useMemo, useState } from 'react';

const learningSwimlanes: LearningSwimlaneProps[] = [
  {
    id: 'A',
    title: 'Selected for Learning',
  },
  {
    id: 'B',
    title: 'Learning in Progress',
  },
  {
    id: 'C',
    title: 'Learning Completed',
  },
  {
    id: 'D',
    title: 'Learning in Verification',
  },
  {
    id: 'E',
    title: 'Learning Verified',
  },
];

const learningTaskItems: LearningTaskItem[] = [
  {
    id: 'A',
    title: 'Finish React fundamentals module',
    description: 'Work through components, props, JSX, and state basics before moving into project work.',
    learningResource: 'Udemy React course',
    progress: 15,
    swimlane: 'A',
  },
  {
    id: 'B',
    title: 'Review component composition patterns',
    description: 'Take notes on composition, prop drilling, and how to break large UI trees into smaller pieces.',
    learningResource: 'React docs',
    progress: 5,
    swimlane: 'A',
  },
  {
    id: 'C',
    title: 'Build a hooks practice app',
    description: 'Create a small practice app that uses state, effects, and reusable components.',
    learningResource: 'Course project section',
    progress: 55,
    swimlane: 'B',
  },
  {
    id: 'D',
    title: 'Complete routing mini project',
    description: 'Finish the guided router exercise and verify the page flow works across nested routes.',
    learningResource: 'React Router tutorial',
    progress: 80,
    swimlane: 'B',
  },
  {
    id: 'E',
    title: 'Wrap up module quiz',
    description: 'Submit the end-of-module assessment and record any missed concepts for follow-up.',
    learningResource: 'Course quiz',
    progress: 100,
    swimlane: 'C',
  },
  {
    id: 'F',
    title: 'Verify state management notes',
    description: 'Re-read notes on derived state and effects to make sure the explanations still feel solid.',
    learningResource: 'Personal notes',
    progress: 100,
    swimlane: 'D',
  },
  {
    id: 'G',
    title: 'Rebuild todo app from memory',
    description: 'Recreate the practice app without the walkthrough to confirm the core concepts have stuck.',
    learningResource: 'Previous project brief',
    progress: 100,
    swimlane: 'E',
  },
  {
    id: 'H',
    title: 'Explain hooks lifecycle aloud',
    description: 'Talk through render timing, effect cleanup, and dependency behavior without referring to notes.',
    learningResource: 'Self-review session',
    progress: 100,
    swimlane: 'A',
  },
];

/**
 * Renders the learning board route with the current swim lane collection.
 *
 * @returns The learning workflow board for skill-progress tracking.
 */
export default function Learning() {
  const [modalState, setModalState] = useState<LearningTaskModalState>({
    open: false,
    learningTaskId: undefined,
  });

  const setSelectedTaskId = (id: string) => {
    setModalState({
      open: true,
      learningTaskId: id,
    });
  };
  const selectedLearningTask = useMemo(
    () => learningTaskItems.find((learningTask) => learningTask.id === modalState.learningTaskId),
    [modalState.learningTaskId],
  );

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        px: { xs: 1.5, smd: 2 },
        py: { xs: 2, smd: 2.5 },
      }}
    >
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          // todo: fix in future with dynamic swimlane switching logic
          // setTarget(event.operation.target?.id as unknown as any);
        }}
      >
        <Stack spacing={1.5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', smd: 'row' },
              gap: 1,
              alignItems: 'stretch',
            }}
          >
            {learningSwimlanes.map((learningSwimlane) => {
              const tasksInSwimlane = learningTaskItems.filter(
                (learningTaskItem) => learningTaskItem.swimlane === learningSwimlane.id,
              );

              return (
                <LearningSwimlane
                  key={learningSwimlane.id}
                  id={learningSwimlane.id}
                  title={learningSwimlane.title}
                >
                  {tasksInSwimlane.map((learningTaskItem) => (
                    <LearningTask
                      key={learningTaskItem.id}
                      learningTaskItem={learningTaskItem}
                      setSelectedTaskId={setSelectedTaskId}
                    />
                  ))}
                </LearningSwimlane>
              );
            })}
          </Box>
        </Stack>
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
    </Box>
  );
}
