'use client';

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo, useState } from 'react';
import FrontendSkillPathFlow from '../FrontendSkillPathFlow/FrontendSkillPathFlow';

const desktopSidebarWidth = 340;
const mobileSidebarTopOffset = 64;

/**
 * Renders the sidebar content for the current skill-tree workspace.
 *
 * @returns The current summary panel and placeholder assistant area.
 */
function SkillTreeSidebarContent() {
  return (
    <Stack spacing={2.5} sx={{ height: '100%', p: 2.5 }}>
      <Stack spacing={1.25}>
        <Box>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800 }}>
            AI-Generated Summary
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Frontend Developer
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          This area can become the job-description source panel. For now, it represents a sample
          entry-level frontend role, and the skill tree is derived from the high-level requirements
          implied by that description.
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Chip label="Foundations" size="small" sx={{ fontWeight: 700 }} />
        <Chip label="Core Framework Skills" size="small" color="success" sx={{ fontWeight: 700 }} />
        <Chip label="Delivery Skills" size="small" color="secondary" sx={{ fontWeight: 700 }} />
      </Stack>
    </Stack>
  );
}

/**
 * Renders the skill-tree workspace with a responsive summary and AI sidebar.
 *
 * @returns The full-page graph plus mobile overlay or desktop split-panel sidebar.
 */
export default function SkillTreeWorkspace() {
  const theme = useTheme();
  // Keep the initial client render aligned with the server fallback to avoid
  // hydrating different mobile/desktop sidebar branches.
  const isDesktopSidebar = useMediaQuery(theme.breakpoints.up('smd'));
  const [desktopSidebarOverride, setDesktopSidebarOverride] = useState<boolean | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  /**
   * Opens the sidebar from the workspace toggle.
   */
  const handleSidebarOpen = () => {
    if (isDesktopSidebar) {
      setDesktopSidebarOverride(true);
      return;
    }
    setIsMobileSidebarOpen(true);
  };

  /**
   * Closes the sidebar from either mobile or desktop layouts.
   */
  const handleSidebarClose = () => {
    if (isDesktopSidebar) {
      setDesktopSidebarOverride(false);
      return;
    }
    setIsMobileSidebarOpen(false);
  };

  /**
   * Toggles the sidebar while keeping the graph visible underneath.
   */
  const handleSidebarToggle = () => {
    if (isDesktopSidebar) {
      setDesktopSidebarOverride((currentState) => !(currentState ?? true));
      return;
    }
    setIsMobileSidebarOpen((currentState) => !currentState);
  };

  const isSidebarOpen = isDesktopSidebar
    ? desktopSidebarOverride ?? true
    : isMobileSidebarOpen;
  const skillTreeLayoutVersion = isDesktopSidebar
    ? `desktop-${isSidebarOpen ? 'open' : 'closed'}`
    : 'mobile';

  const toggleButtonLabel = useMemo(() => {
    if (isSidebarOpen) return 'Hide AI sidebar';
    return 'Show AI sidebar';
  }, [isSidebarOpen]);

  return (
    <Box sx={{ position: 'relative', display: 'flex', height: '100%', width: '100%', minHeight: 0 }}>
      <Box sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
        <FrontendSkillPathFlow layoutVersion={skillTreeLayoutVersion} />
      </Box>

      {isDesktopSidebar ? (
        <Box
          aria-hidden={!isSidebarOpen}
          sx={{
            width: isSidebarOpen ? desktopSidebarWidth : 0,
            minHeight: 0,
            overflow: 'hidden',
            transition: theme.transitions.create('width', {
              duration: theme.transitions.duration.standard,
            }),
            borderLeft: isSidebarOpen ? '1px solid rgba(148, 163, 184, 0.25)' : 'none',
            bgcolor: 'rgba(255, 255, 255, 0.92)',
          }}
        >
          <Box sx={{ width: desktopSidebarWidth, height: '100%' }}>
            <SkillTreeSidebarContent />
          </Box>
        </Box>
      ) : (
        <Drawer
          anchor="right"
          open={isSidebarOpen}
          onClose={handleSidebarClose}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              sx: {
                top: mobileSidebarTopOffset,
                width: '100%',
                height: `calc(100dvh - ${mobileSidebarTopOffset}px)`,
                borderRadius: 0,
                borderLeft: 'none',
              },
            },
          }}
        >
          <SkillTreeSidebarContent />
        </Drawer>
      )}

      <IconButton
        aria-label={toggleButtonLabel}
        onClick={handleSidebarToggle}
        sx={{
          position: !isDesktopSidebar && isSidebarOpen ? 'fixed' : 'absolute',
          top: !isDesktopSidebar && isSidebarOpen ? mobileSidebarTopOffset + 16 : 16,
          right: isDesktopSidebar && isSidebarOpen ? desktopSidebarWidth + 16 : 16,
          zIndex: !isDesktopSidebar && isSidebarOpen ? theme.zIndex.drawer + 1 : 5,
          border: '1px solid rgba(148, 163, 184, 0.25)',
          bgcolor: 'rgba(255, 255, 255, 0.92)',
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
          transition: theme.transitions.create('right', {
            duration: theme.transitions.duration.standard,
          }),
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 1)',
          },
        }}
      >
        {isSidebarOpen ? (
          <KeyboardDoubleArrowRightRoundedIcon data-testid="hide-ai-sidebar-icon" />
        ) : (
          <KeyboardDoubleArrowLeftRoundedIcon data-testid="show-ai-sidebar-icon" />
        )}
      </IconButton>
    </Box>
  );
}
