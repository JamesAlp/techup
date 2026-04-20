'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LearningTaskItem } from '../LearningTask/LearningTask';

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
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(32rem, calc(100vw - 2rem))',
          bgcolor: 'background.paper',
          p: 3,
        }}
      >
        <Box component="form" onSubmit={handleSave}>
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
            <Box>
              <Typography component="label" variant="body2" gutterBottom>
                Progress
              </Typography>
              <Slider
                aria-label="Progress"
                defaultValue={learningTask?.progress ?? 0}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>
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
