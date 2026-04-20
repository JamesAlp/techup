import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDraggable } from '@dnd-kit/react';
import { KeyboardEvent } from 'react';
import LearningProgressField from '../LearningProgressField/LearningProgressField';

export type LearningTaskItem = {
  id: string;
  title: string;
  progress: number;
  description?: string;
  learningResource?: string;
  swimlane?: string;
};

export type LearningTaskProps = {
  learningTaskItem: LearningTaskItem;
  setSelectedTaskId: (id: string) => void;
};

/**
 * Renders a draggable learning task control for a swim lane.
 *
 * @param props - The task item and task-selection callback.
 * @returns A MUI task card button wired into the drag-and-drop system.
 */
export default function LearningTask({ learningTaskItem, setSelectedTaskId }: LearningTaskProps) {
  const { id, title, description, learningResource, progress } = learningTaskItem;
  const { ref } = useDraggable({
    id,
  });
  const handleOpen = () => {
    setSelectedTaskId(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    handleOpen();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2.5,
        borderColor: 'rgba(148, 163, 184, 0.35)',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
      }}
    >
      <Box
        component="div"
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        sx={{
          display: 'block',
          width: '100%',
          borderRadius: 2.5,
          textAlign: 'left',
          cursor: 'pointer',
          outline: 'none',
          '&:focus-visible': {
            boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)',
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack spacing={1.25}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description ?? 'No description yet.'}
            </Typography>
            {learningResource ? (
              <Typography variant="caption" color="text.secondary">
                Resource: {learningResource}
              </Typography>
            ) : null}
            <LearningProgressField label="Progress" defaultValue={progress} editable={false} />
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
