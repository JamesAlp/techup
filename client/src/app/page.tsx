'use client';

import Box from '@mui/material/Box';
import SkillTreeWorkspace from '@/components/skillTree/SkillTreeWorkspace/SkillTreeWorkspace';

/**
 * Renders the home route with the first skill-tree prototype.
 *
 * @returns The main skill-tree workspace for the current sample frontend path.
 */
export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: {
          xs: 'calc(100dvh - 64px)',
          smd: 'calc(100dvh - 72px)',
        },
        display: 'flex',
        width: '100%',
      }}
    >
      <Box sx={{ flex: 1, minHeight: 0, width: '100%' }}>
        <SkillTreeWorkspace />
      </Box>
    </Box>
  );
}
