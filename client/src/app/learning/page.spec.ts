import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import Learning from './page';

jest.mock('@dnd-kit/react', () => ({
  DragDropProvider: ({ children }: { children: ReactNode }) => children,
  useDroppable: () => ({ ref: jest.fn() }),
  useDraggable: () => ({ ref: jest.fn() }),
}));

describe('Learning page', () => {
  const expectedTargets = [
    { id: 'A', title: 'Selected for Learning' },
    { id: 'B', title: 'Learning in Progress' },
    { id: 'C', title: 'Learning Completed' },
    { id: 'D', title: 'Learning in Verification' },
    { id: 'E', title: 'Learning Verified' },
  ];

  it('mounts the five current droppable targets with their titles', () => {
    const { container } = render(React.createElement(Learning));

    expect(expectedTargets).toHaveLength(5);

    for (const target of expectedTargets) {
      expect(screen.getByText(target.title)).toBeInTheDocument();
      expect(container.querySelector(`[id="${target.id}"]`)).toBeInTheDocument();
    }
  });

  it('renders the swim lane headings in the expected order', () => {
    render(React.createElement(Learning));

    const headings = screen.getAllByRole('heading', { level: 2 });

    expect(headings).toHaveLength(expectedTargets.length);
    expect(headings.map((heading) => heading.textContent)).toEqual(
      expectedTargets.map((target) => target.title)
    );
  });

  it('renders one labeled swim lane drop area for each target', () => {
    render(React.createElement(Learning));

    const dropAreas = screen.getAllByRole('group');

    expect(dropAreas).toHaveLength(expectedTargets.length);

    for (const target of expectedTargets) {
      expect(
        screen.getByRole('group', {
          name: `${target.title} swim lane drop area`,
        })
      ).toBeInTheDocument();
    }
  });
});
