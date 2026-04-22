import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SkillTreeWorkspace from './SkillTreeWorkspace';

const mockUseMediaQuery = jest.fn();

jest.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockUseMediaQuery(...args),
}));

jest.mock('@mui/material/Drawer', () => {
  return function MockDrawer({
    open,
    children,
  }: {
    open: boolean;
    children: React.ReactNode;
  }) {
    if (!open) return null;
    return <div>{children}</div>;
  };
});

jest.mock('../FrontendSkillPathFlow/FrontendSkillPathFlow', () => {
  return function MockFrontendSkillPathFlow() {
    return <div aria-label="Mock skill tree">Skill tree</div>;
  };
});

describe('SkillTreeWorkspace', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReset();
  });

  it('shows the sidebar by default on smd and larger layouts', () => {
    mockUseMediaQuery.mockReturnValue(true);

    render(<SkillTreeWorkspace />);

    expect(screen.getByText('AI-Generated Summary')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hide AI sidebar' })).toBeInTheDocument();
    expect(screen.getByTestId('hide-ai-sidebar-icon')).toBeInTheDocument();
  });

  it('keeps the sidebar closed by default on mobile until the toggle is used', () => {
    mockUseMediaQuery.mockReturnValue(false);

    render(<SkillTreeWorkspace />);

    expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
    expect(screen.getByTestId('show-ai-sidebar-icon')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show AI sidebar' }));

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('AI-Generated Summary')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hide AI sidebar' })).toBeInTheDocument();
    expect(screen.getByTestId('hide-ai-sidebar-icon')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Hide AI sidebar' }));

    expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
    expect(screen.getByTestId('show-ai-sidebar-icon')).toBeInTheDocument();
  });
});
