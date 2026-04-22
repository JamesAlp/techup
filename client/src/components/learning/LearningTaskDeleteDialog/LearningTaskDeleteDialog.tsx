'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useId } from 'react';

export type LearningTaskDeleteDialogProps = {
  open: boolean;
  taskTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

/**
 * Renders the shared confirmation dialog used before deleting a learning task.
 *
 * @param props - The dialog state, task title, and close/confirm callbacks.
 * @returns A destructive confirmation dialog for learning-task deletion.
 */
export default function LearningTaskDeleteDialog({
  open,
  taskTitle,
  onClose,
  onConfirm,
}: LearningTaskDeleteDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <DialogTitle id={titleId}>Delete learning task?</DialogTitle>
      <DialogContent>
        <DialogContentText id={descriptionId}>
          {`Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
