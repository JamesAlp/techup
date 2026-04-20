'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useId } from 'react';
import { LearningTaskItem } from '../LearningTask/LearningTask';
import LearningProgressField from '../LearningProgressField/LearningProgressField';

export type LearningTaskModalState = {
  open: boolean;
  learningTaskId: string | undefined;
};

export type LearningTaskModalProps = {
  open: boolean;
  onClose?: () => void;
  learningTask?: LearningTaskItem;
};

/**
 * Renders a basic MUI modal.
 *
 * @param props - The modal visibility, selected task, and close handler.
 * @returns A minimal modal with task inputs.
 */
export default function LearningTaskModal({
  open,
  onClose,
  learningTask,
}: LearningTaskModalProps) {
  const titleId = useId();

  const handleCancel = () => {
    onClose?.();
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose ?? undefined}>
      <Box
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
        <Box component="form" onSubmit={handleSave}>
          <Typography id={titleId} component="h2" variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Edit learning task
          </Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Title"
              required
              defaultValue={learningTask?.title ?? ''}
            />
          </Box>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Description"
              defaultValue={learningTask?.description ?? ''}
            />
            <TextField
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
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
