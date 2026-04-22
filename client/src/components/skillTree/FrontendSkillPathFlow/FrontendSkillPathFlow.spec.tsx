import React from 'react';
import { render, screen } from '@testing-library/react';
import FrontendSkillPathFlow from './FrontendSkillPathFlow';

const mockFitView = jest.fn().mockResolvedValue(true);

jest.mock('@xyflow/react', () => ({
  Background: () => <div data-testid="react-flow-background" />,
  Controls: () => <div data-testid="react-flow-controls" />,
  useReactFlow: () => ({
    fitView: mockFitView,
  }),
  ReactFlow: ({
    children,
    nodes,
    'aria-label': ariaLabel,
  }: {
    children: React.ReactNode;
    nodes: Array<{ id: string; data: { label: string; }; }>;
    'aria-label'?: string;
  }) => (
    <div role="application" aria-label={ariaLabel}>
      {nodes.map((node) => (
        <div key={node.id}>{node.data.label}</div>
      ))}
      {children}
    </div>
  ),
  MarkerType: {
    ArrowClosed: 'arrowclosed',
  },
}));

describe('FrontendSkillPathFlow', () => {
  beforeEach(() => {
    mockFitView.mockClear();
  });

  it('renders the suggested frontend role path and the major skill nodes', () => {
    render(<FrontendSkillPathFlow />);

    expect(screen.getByRole('application', { name: 'Suggested frontend skill path' })).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('HTML & Semantic Structure')).toBeInTheDocument();
    expect(screen.getByText('CSS & Responsive UI')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Testing & Debugging')).toBeInTheDocument();
  });
});
