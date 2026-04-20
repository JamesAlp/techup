import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LearningTaskModal from './LearningTaskModal';

describe('LearningTaskModal', () => {
  const learningTask = {
    id: 'task-1',
    title: 'Finish hooks practice',
    description: 'Build a small app that uses effects and derived state carefully.',
    learningResource: 'Course project',
    progress: 80,
  };

  it('renders seeded task values and an editable progress slider when open', () => {
    render(<LearningTaskModal open learningTask={learningTask} onClose={jest.fn()} />);

    expect(screen.getByRole('dialog', { name: 'Edit learning task' })).toBeInTheDocument();
    expect(screen.getByDisplayValue(learningTask.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(learningTask.description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(learningTask.learningResource)).toBeInTheDocument();
    expect(screen.getByText(`${learningTask.progress}%`)).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Progress' })).toBeEnabled();
  });

  it('renders accessible labels and required field semantics', () => {
    render(<LearningTaskModal open learningTask={learningTask} onClose={jest.fn()} />);

    expect(screen.getByLabelText(/Title/i)).toBeRequired();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Learning Resource/i)).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Progress' })).toBeEnabled();
  });

  it('does not submit the form when the required title field is empty', () => {
    const onClose = jest.fn();

    render(
      <LearningTaskModal
        open
        learningTask={{ ...learningTask, title: '' }}
        onClose={onClose}
      />
    );

    const titleInput = screen.getByLabelText(/Title/i);

    expect(titleInput).toBeInvalid();

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when the cancel button is clicked', () => {
    const onClose = jest.fn();

    render(<LearningTaskModal open learningTask={learningTask} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the form is submitted', () => {
    const onClose = jest.fn();

    render(<LearningTaskModal open learningTask={learningTask} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
