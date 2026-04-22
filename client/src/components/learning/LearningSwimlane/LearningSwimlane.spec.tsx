import React from 'react';
import { render, screen } from '@testing-library/react';
import LearningSwimlane from './LearningSwimlane';

jest.mock('@dnd-kit/react', () => ({
  useDroppable: () => ({ ref: jest.fn() }),
}));

describe('LearningSwimlane', () => {
  it('renders a learning swim lane section with a heading title', () => {
    const { container } = render(
      <LearningSwimlane id="A" title="Selected for Learning">
        Lane content
      </LearningSwimlane>
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

  it('renders a labeled swim lane drop area for assistive technology', () => {
    render(
      <LearningSwimlane id="B" title="Learning in Progress">
        Lane content
      </LearningSwimlane>
    );

    expect(
      screen.getByRole('group', {
        name: 'Learning in Progress swim lane drop area',
      })
    ).toBeInTheDocument();
  });
});
