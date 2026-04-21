import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDraggable } from '@dnd-kit/react';
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

  return (
    <Card
      ref={ref}
      variant="outlined"
      sx={{
        overflow: 'hidden',
        borderRadius: 2.5,
        borderColor: 'rgba(148, 163, 184, 0.35)',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardActionArea
        component="div"
        onClick={handleOpen}
        sx={{
          width: '100%',
          textAlign: 'left',
          alignItems: 'stretch',
          borderRadius: 2.5,
          '&.MuiCardActionArea-root': {
            borderRadius: 2.5,
          },
          '&.Mui-focusVisible': {
            boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)',
          },
          '& .MuiCardActionArea-focusHighlight': {
            opacity: 0,
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
      </CardActionArea>
    </Card>
  );
}
