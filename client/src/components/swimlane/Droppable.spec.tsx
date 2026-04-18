import React from 'react';
import { render, screen } from '@testing-library/react';
import Droppable from './Droppable';

jest.mock('@dnd-kit/react', () => ({
  useDroppable: () => ({ ref: jest.fn() }),
}));

describe('Droppable', () => {
  it('renders a swim lane section with a heading title', () => {
    const { container } = render(
      <Droppable id="A" title="Selected for Learning">
        Lane content
      </Droppable>
    );

    const section = container.querySelector('section');
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Selected for Learning',
    });

    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', heading.id);
    expect(heading).toBeInTheDocument();
  });

  it('renders a labeled droppable area for assistive technology', () => {
    render(
      <Droppable id="B" title="Learning in Progress">
        Lane content
      </Droppable>
    );

    expect(
      screen.getByRole('group', {
        name: 'Learning in Progress swim lane drop area',
      })
    ).toBeInTheDocument();
  });
});
