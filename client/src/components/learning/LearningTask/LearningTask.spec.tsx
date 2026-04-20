import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LearningTask from './LearningTask';

jest.mock('@dnd-kit/react', () => ({
  useDraggable: () => ({ ref: jest.fn() }),
}));

describe('LearningTask', () => {
  const learningTaskItem = {
    id: 'task-1',
    title: 'Build a practice app',
    description: 'Use a small practice project to reinforce hooks and composition.',
    learningResource: 'React docs',
    progress: 55,
  };

  it('renders the task content and a disabled board progress slider', () => {
    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={jest.fn()}
      />
    );

    expect(screen.getByText(learningTaskItem.title)).toBeInTheDocument();
    expect(screen.getByText(learningTaskItem.description)).toBeInTheDocument();
    expect(screen.getByText(`Resource: ${learningTaskItem.learningResource}`)).toBeInTheDocument();
    expect(screen.getByText(`${learningTaskItem.progress}%`)).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Progress' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /build a practice app/i })).toBeInTheDocument();
  });

  it('opens the task modal callback when the full card is clicked', () => {
    const setSelectedTaskId = jest.fn();

    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={setSelectedTaskId}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(setSelectedTaskId).toHaveBeenCalledWith(learningTaskItem.id);
  });

  it('opens the task modal callback from keyboard interaction', () => {
    const setSelectedTaskId = jest.fn();

    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={setSelectedTaskId}
      />
    );

    const cardButton = screen.getByRole('button');

    fireEvent.keyDown(cardButton, { key: 'Enter' });
    fireEvent.keyDown(cardButton, { key: ' ' });

    expect(setSelectedTaskId).toHaveBeenCalledTimes(2);
    expect(setSelectedTaskId).toHaveBeenNthCalledWith(1, learningTaskItem.id);
    expect(setSelectedTaskId).toHaveBeenNthCalledWith(2, learningTaskItem.id);
  });

  it('keeps the full-card trigger keyboard reachable', () => {
    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={jest.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /build a practice app/i })).toHaveAttribute(
      'tabindex',
      '0'
    );
  });
});
