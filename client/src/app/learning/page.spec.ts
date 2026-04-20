import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import Learning from './page';

jest.mock('@dnd-kit/react', () => ({
  DragDropProvider: ({ children }: { children: ReactNode }) => children,
  useDroppable: () => ({ ref: jest.fn() }),
  useDraggable: () => ({ ref: jest.fn() }),
}));

describe('Learning page', () => {
  const expectedLearningSwimlanes = [
    { id: 'A', title: 'Selected for Learning' },
    { id: 'B', title: 'Learning in Progress' },
    { id: 'C', title: 'Learning Completed' },
    { id: 'D', title: 'Learning in Verification' },
    { id: 'E', title: 'Learning Verified' },
  ];

  it('mounts the five current learning swim lanes with their titles', () => {
    const { container } = render(React.createElement(Learning));

    expect(expectedLearningSwimlanes).toHaveLength(5);

    for (const learningSwimlane of expectedLearningSwimlanes) {
      expect(screen.getByText(learningSwimlane.title)).toBeInTheDocument();
      expect(container.querySelector(`[id="${learningSwimlane.id}"]`)).toBeInTheDocument();
    }
  });

  it('renders the swim lane headings in the expected order', () => {
    render(React.createElement(Learning));

    const headings = screen.getAllByRole('heading', { level: 2 });

    expect(headings).toHaveLength(expectedLearningSwimlanes.length);
    expect(headings.map((heading) => heading.textContent)).toEqual(
      expectedLearningSwimlanes.map((learningSwimlane) => learningSwimlane.title)
    );
  });

  it('renders one labeled swim lane drop area for each target', () => {
    render(React.createElement(Learning));

    const dropAreas = screen.getAllByRole('group');

    expect(dropAreas).toHaveLength(expectedLearningSwimlanes.length);

    for (const learningSwimlane of expectedLearningSwimlanes) {
      expect(
        screen.getByRole('group', {
          name: `${learningSwimlane.title} swim lane drop area`,
        })
      ).toBeInTheDocument();
    }
  });
});
