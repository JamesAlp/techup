'use client';

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { MouseEvent, useState } from 'react';

export type LearningTaskActionMenuProps = {
  taskTitle: string;
  onDeleteRequested: () => void;
};

/**
 * Renders a shared gear-menu trigger for task actions on cards and modals.
 *
 * @param props - The task title and delete-request callback.
 * @returns A hover-tipped settings icon button that opens a nearby actions menu.
 */
export default function LearningTaskActionMenu({
  taskTitle,
  onDeleteRequested,
}: LearningTaskActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRequested = () => {
    handleMenuClose();
    onDeleteRequested();
  };

  return (
    <>
      <Tooltip title="Task actions" disableFocusListener disableTouchListener placement="top">
        <IconButton
          aria-label={`Task actions for ${taskTitle}`}
          onClick={handleMenuOpen}
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
          <SettingsOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleDeleteRequested}>
          <ListItemIcon>
            <DeleteOutlinedIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete task" />
        </MenuItem>
      </Menu>
    </>
  );
}
