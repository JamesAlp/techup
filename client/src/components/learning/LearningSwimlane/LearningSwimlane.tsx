import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDroppable } from '@dnd-kit/react';
import { ReactNode } from 'react';

export type LearningSwimlaneProps = {
  id: string;
  title: string;
  children?: ReactNode;
};

/**
 * Renders a labeled learning swim lane with an accessible drop area.
 *
 * @param props - The swim lane identifier, visible title, and lane content.
 * @returns A semantic learning swim lane section containing a titled drop area.
 */
export default function LearningSwimlane({
  id,
  title,
  children,
}: LearningSwimlaneProps) {
  const { ref } = useDroppable({
    id,
  });
  const titleId = `swimlane-title-${id}`;
  const dropAreaLabel = `${title} swim lane drop area`;

  return (
    <Box
      component="section"
      aria-labelledby={titleId}
      sx={{
        display: 'flex',
        flex: '1 1 0',
        minWidth: 0,
        flexDirection: 'column',
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          minHeight: '4.25rem',
          alignItems: 'center',
          px: 0.625,
          py: 0.5,
        }}
      >
        <Typography
          id={titleId}
          component="h2"
          variant="subtitle1"
          sx={{ fontWeight: 700, fontSize: { xs: '0.92rem', md: '0.88rem', lg: '0.96rem' } }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        id={id}
        ref={ref}
        role="group"
        aria-label={dropAreaLabel}
        sx={{
          display: 'flex',
          minHeight: 320,
          flex: 1,
          flexDirection: 'column',
          gap: 1,
          px: 0.5,
          pb: 0.5,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
