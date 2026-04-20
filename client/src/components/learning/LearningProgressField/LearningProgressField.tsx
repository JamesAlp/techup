'use client';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useId, useState } from 'react';

export type LearningProgressFieldProps = {
  label: string;
  defaultValue: number;
  editable?: boolean;
};

const clampProgress = (value: number) => Math.max(0, Math.min(100, value));

/**
 * Renders a shared editable progress control used by task previews and the modal.
 *
 * @param props - The display label and initial progress percentage.
 * @returns A styled progress slider paired with a compact percentage readout.
 */
export default function LearningProgressField({
  label,
  defaultValue,
  editable = true,
}: LearningProgressFieldProps) {
  const labelId = useId();
  const [progressValue, setProgressValue] = useState(clampProgress(defaultValue));

  useEffect(() => {
    setProgressValue(clampProgress(defaultValue));
  }, [defaultValue]);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setProgressValue(clampProgress(Array.isArray(newValue) ? newValue[0] : newValue));
  };

  return (
    <Stack spacing={0.75}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Typography id={labelId} variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography
          aria-label={`${label} percentage`}
          variant="caption"
          sx={{
            minWidth: 40,
            color: 'text.secondary',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textAlign: 'right',
          }}
        >
          {progressValue}%
        </Typography>
      </Box>
      <Slider
        aria-labelledby={labelId}
        disabled={!editable}
        min={0}
        max={100}
        step={1}
        value={progressValue}
        onChange={editable ? handleSliderChange : undefined}
        sx={{
          px: 0,
          py: 0.5,
          '& .MuiSlider-rail': {
            height: 8,
            opacity: 1,
            borderRadius: 999,
            bgcolor: 'rgba(148, 163, 184, 0.2)',
          },
          '& .MuiSlider-rail.Mui-disabled': {
            bgcolor: 'rgba(148, 163, 184, 0.2)',
          },
          '& .MuiSlider-track': {
            height: 8,
            border: 'none',
            borderRadius: 999,
            backgroundImage: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
          },
          '& .MuiSlider-track.Mui-disabled': {
            backgroundImage: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
          },
          '& .MuiSlider-thumb': {
            width: 14,
            height: 14,
            bgcolor: '#ffffff',
            border: '2px solid #2563eb',
            boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.16)',
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0 0 0 6px rgba(37, 99, 235, 0.2)',
            },
            '&::before': {
              boxShadow: 'none',
            },
          },
          '& .MuiSlider-thumb.Mui-disabled': {
            bgcolor: '#ffffff',
            borderColor: '#2563eb',
          },
          '&.Mui-disabled': {
            opacity: 1,
            cursor: 'default',
          },
        }}
      />
    </Stack>
  );
}
