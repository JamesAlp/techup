'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DragDropProvider } from '@dnd-kit/react';
import LearningSwimlane, {
  LearningSwimlaneProps,
} from '@/components/learning/LearningSwimlane/LearningSwimlane';
import LearningTask from '@/components/learning/LearningTask/LearningTask';
import LearningTaskModal, {
  LearningTaskModalState,
} from '@/components/learning/LearningTaskModal/LearningTaskModal';
import { useContext, useMemo, useState } from 'react';
import { LearningTasksContext } from '@/context/learningTasks/learningTasks.store';

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
  const learningTasksContext = useContext(LearningTasksContext);
  const learningTasks = learningTasksContext?.state.learningTasks;
  const selectedLearningTask = useMemo(
    () => {
      if (!learningTasks) return;
      return learningTasks.find((learningTask) => learningTask.id === modalState.learningTaskId);
    },
    [learningTasksContext, modalState.learningTaskId],
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
            {learningTasks && learningSwimlanes.map((learningSwimlane) => {
              const tasksInSwimlane = learningTasks.filter(
                (learningTaskItem) => learningTaskItem.swimlane === learningSwimlane.id,
              );

              return (
                <LearningSwimlane
                  key={learningSwimlane.id}
                  id={learningSwimlane.id}
                  title={learningSwimlane.title}
                >
                  {tasksInSwimlane && tasksInSwimlane.map((learningTaskItem) => (
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
