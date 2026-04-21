'use client';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';
import LearningSwimlane, {
  LearningSwimlaneProps,
} from '@/components/learning/LearningSwimlane/LearningSwimlane';
import LearningTask from '@/components/learning/LearningTask/LearningTask';
import LearningTaskModal, {
  LearningTaskModalState,
} from '@/components/learning/LearningTaskModal/LearningTaskModal';
import { useContext, useMemo, useState } from 'react';
import { LearningTasksContext } from '@/context/learningTasks/learningTasks.store';

const swimlanes: LearningSwimlaneProps[] = [
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
    mode: 'edit',
    learningTaskId: undefined,
  });
  const tasksContext = useContext(LearningTasksContext);
  const tasks = tasksContext?.state.learningTasks;

  /**
   * Opens the shared learning-task modal in create mode.
   */
  const handleAddLearningTask = () => {
    setModalState({
      open: true,
      mode: 'create',
      learningTaskId: undefined,
    });
  };

  /**
   * Resets the learning-task modal back to its closed state.
   */
  const closeModal = () => {
    setModalState({
      open: false,
      mode: 'edit',
      learningTaskId: undefined,
    });
  };

  /**
   * Opens the learning-task modal for the selected task id.
   *
   * @param id - The learning task to show in the modal.
   */
  const setSelectedTaskId = (id: string) => {
    setModalState({
      open: true,
      mode: 'edit',
      learningTaskId: id,
    });
  };

  /**
   * Dispatches a delete action for the provided learning task id.
   *
   * @param id - The learning task to remove from board state.
   */
  const deleteLearningTask = (id: string) => {
    tasksContext?.dispatch({
      type: 'delete_learning_tasks',
      payload: id,
    });
  };

  // Create mode intentionally resolves no selected task so the shared modal renders empty defaults.
  const selectedTask = useMemo(
    () => {
      if (!tasks || !modalState.learningTaskId) return;
      return tasks.find((task) => task.id === modalState.learningTaskId);
    },
    [tasks, modalState.learningTaskId],
  );

  /**
   * Moves a dragged learning task into a new swim lane when the drag ends on a valid lane target.
   *
   * @param e - The drag-drop completion event from `@dnd-kit/react`.
   */
  const onDragEnd = (e: DragEndEvent) => {
    if (e.canceled || !tasks) return;

    const sourceId = e?.operation?.source?.id;
    const targetId = e?.operation?.target?.id;

    if (!sourceId || !targetId) return;

    const sourceTask = tasks.find(learningTask => learningTask.id === sourceId);
    const targetSwimlane = swimlanes.find(swimlane => swimlane.id === targetId);

    if (!sourceTask || !targetSwimlane) return;

    tasksContext?.dispatch({
      type: 'update_learning_tasks',
      payload: {
        ...sourceTask,
        swimlane: String(targetId)
      }
    });
  };

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
        onDragEnd={onDragEnd}
      >
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddLearningTask}
              sx={{ display: { xs: 'none', smd: 'inline-flex' } }}
            >
              Add task
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', smd: 'row' },
              gap: 1,
              alignItems: 'stretch',
            }}
          >
            {tasks && swimlanes.map((learningSwimlane) => {
              const tasksInSwimlane = tasks.filter(
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
                      deleteLearningTask={deleteLearningTask}
                    />
                  ))}
                </LearningSwimlane>
              );
            })}
          </Box>
        </Stack>
      </DragDropProvider>

      <Fab
        color="primary"
        aria-label="Add learning task"
        onClick={handleAddLearningTask}
        sx={{
          display: { xs: 'inline-flex', smd: 'none' },
          position: 'fixed',
          right: 16,
          bottom: 16,
          zIndex: 1,
        }}
      >
        <AddIcon />
      </Fab>

      <LearningTaskModal
        open={modalState.open}
        mode={modalState.mode}
        learningTask={selectedTask}
        defaultSwimlaneId={swimlanes[0]?.id ?? ''}
        deleteLearningTask={deleteLearningTask}
        onClose={closeModal}
      />
    </Box>
  );
}
