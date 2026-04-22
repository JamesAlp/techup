'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useId, useState } from 'react';
import { LearningTaskItem } from '../LearningTask/LearningTask';
import LearningTaskActionMenu from '../LearningTaskActionMenu/LearningTaskActionMenu';
import LearningTaskDeleteDialog from '../LearningTaskDeleteDialog/LearningTaskDeleteDialog';
import LearningProgressField from '../LearningProgressField/LearningProgressField';
import { LearningTasksContext } from '@/context/learningTasks/learningTasks.store';

export type LearningTaskModalMode = 'create' | 'edit';

export type LearningTaskModalState = {
  open: boolean;
  mode: LearningTaskModalMode;
  learningTaskId: string | undefined;
};

export type LearningTaskModalProps = {
  open: boolean;
  mode: LearningTaskModalMode;
  onClose: () => void;
  learningTask?: LearningTaskItem;
  defaultSwimlaneId: string;
  deleteLearningTask: (id: string) => void;
};

/**
 * Renders the shared learning-task modal for create and edit flows.
 *
 * @param props - The modal visibility, mode, task data, and action handlers.
 * @returns A task form modal that supports creation, editing, and deletion.
 */
export default function LearningTaskModal({
  open,
  mode,
  onClose,
  learningTask,
  defaultSwimlaneId,
  deleteLearningTask,
}: LearningTaskModalProps) {
  const titleId = useId();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isCreateMode = mode === 'create';
  const dialogTitle = isCreateMode ? 'Create learning task' : 'Edit learning task';
  const submitButtonLabel = isCreateMode ? 'Create task' : 'Save';
  const formKey = `${mode}-${learningTask?.id ?? 'new-learning-task'}-${open ? 'open' : 'closed'}`;

  /**
   * Closes the modal without persisting any additional changes.
   */
  const handleCancel = () => {
    onClose();
  };
  const learningTasksContext = useContext(LearningTasksContext);

  /**
   * Submits the shared task form in create or edit mode.
   *
   * @param event - The form submission event from the modal body.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const learningTaskFields = {
      title: String(formData.get('title') ?? ''),
      description: String(formData.get('description') ?? ''),
      learningResource: String(formData.get('learning-resource') ?? ''),
      progress: Number(formData.get('progress') ?? 0),
    };

    // Reuse the same form fields for both flows so create and edit stay visually and structurally aligned.
    if (isCreateMode) {
      learningTasksContext?.dispatch({
        type: 'add_learning_tasks',
        payload: {
          id: globalThis.crypto?.randomUUID?.() ?? `learning-task-${Date.now()}`,
          swimlane: defaultSwimlaneId,
          ...learningTaskFields,
        },
      });
    } else if (learningTask) {
      const updatedLearningTaskItem: LearningTaskItem = {
        id: learningTask.id,
        swimlane: learningTask.swimlane,
        ...learningTaskFields,
      };
      learningTasksContext?.dispatch({
        type: 'update_learning_tasks',
        payload: updatedLearningTaskItem,
      });
    }
    onClose();
  };

  /**
   * Opens the delete-confirmation dialog from the modal action menu.
   */
  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  /**
   * Closes the delete-confirmation dialog without deleting the task.
   */
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  /**
   * Confirms task deletion from the modal and then dismisses both dialog layers.
   */
  const handleDeleteConfirm = () => {
    if (learningTask) {
      deleteLearningTask(learningTask.id);
    }
    setIsDeleteDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose ?? undefined}>
        <Box
          key={formKey}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(32rem, calc(100vw - 2rem))',
            borderRadius: 2.5,
            border: '1px solid rgba(148, 163, 184, 0.35)',
            bgcolor: 'rgba(255, 255, 255, 0.98)',
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
            p: 3,
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography id={titleId} component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                {dialogTitle}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                {!isCreateMode && learningTask ? (
                  <LearningTaskActionMenu
                    taskTitle={learningTask.title}
                    onDeleteRequested={handleDeleteDialogOpen}
                  />
                ) : null}
                <Tooltip title="Close modal" disableFocusListener disableTouchListener placement="top">
                  <IconButton
                    aria-label="Close modal"
                    onClick={onClose}
                    size="small"
                    sx={{
                      color: 'rgba(148, 163, 184, 0.95)',
                      bgcolor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: 'rgba(148, 163, 184, 0.08)',
                        color: 'rgba(100, 116, 139, 1)',
                      },
                      '&.Mui-focusVisible': {
                        bgcolor: 'rgba(148, 163, 184, 0.12)',
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="title"
                fullWidth
                label="Title"
                required
                defaultValue={learningTask?.title ?? ''}
              />
            </Box>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                name="description"
                fullWidth
                multiline
                minRows={3}
                label="Description"
                defaultValue={learningTask?.description ?? ''}
              />
              <TextField
                name="learning-resource"
                fullWidth
                label="Learning Resource"
                defaultValue={learningTask?.learningResource ?? ''}
              />
              <LearningProgressField
                label="Progress"
                defaultValue={learningTask?.progress ?? 0}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
              <Button type="button" variant="text" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {submitButtonLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <LearningTaskDeleteDialog
        open={isDeleteDialogOpen}
        taskTitle={learningTask?.title ?? 'this task'}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
