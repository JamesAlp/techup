import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
        deleteLearningTask={jest.fn()}
      />
    );

    expect(screen.getByText(learningTaskItem.title)).toBeInTheDocument();
    expect(screen.getByText(learningTaskItem.description)).toBeInTheDocument();
    expect(screen.getByText(`Resource: ${learningTaskItem.learningResource}`)).toBeInTheDocument();
    expect(screen.getByText(`${learningTaskItem.progress}%`)).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Progress' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /open build a practice app/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /task actions for build a practice app/i })).toBeInTheDocument();
  });

  it('opens the task modal callback when the full card is clicked', () => {
    const setSelectedTaskId = jest.fn();

    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={setSelectedTaskId}
        deleteLearningTask={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /open build a practice app/i }));

    expect(setSelectedTaskId).toHaveBeenCalledWith(learningTaskItem.id);
  });

  it('opens the task modal callback from keyboard interaction', () => {
    const setSelectedTaskId = jest.fn();

    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={setSelectedTaskId}
        deleteLearningTask={jest.fn()}
      />
    );

    const cardButton = screen.getByRole('button', { name: /open build a practice app/i });

    fireEvent.keyDown(cardButton, { key: 'Enter' });
    fireEvent.keyUp(cardButton, { key: ' ' });

    expect(setSelectedTaskId).toHaveBeenCalledTimes(2);
    expect(setSelectedTaskId).toHaveBeenNthCalledWith(1, learningTaskItem.id);
    expect(setSelectedTaskId).toHaveBeenNthCalledWith(2, learningTaskItem.id);
  });

  it('keeps the full-card trigger keyboard reachable', () => {
    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={jest.fn()}
        deleteLearningTask={jest.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /open build a practice app/i })).toHaveAttribute(
      'tabindex',
      '0'
    );
  });

  it('opens a confirmation dialog before deleting the task', async () => {
    const setSelectedTaskId = jest.fn();
    const deleteLearningTask = jest.fn();

    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={setSelectedTaskId}
        deleteLearningTask={deleteLearningTask}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /task actions for build a practice app/i }));
    fireEvent.click(await screen.findByRole('menuitem', { name: /delete task/i }));

    expect(await screen.findByRole('dialog', { name: /delete learning task\?/i })).toBeInTheDocument();
    expect(deleteLearningTask).not.toHaveBeenCalled();
    expect(setSelectedTaskId).not.toHaveBeenCalled();
  });

  it('closes the delete confirmation dialog without deleting when canceled', async () => {
    const deleteLearningTask = jest.fn();

    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={jest.fn()}
        deleteLearningTask={deleteLearningTask}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /task actions for build a practice app/i }));
    fireEvent.click(await screen.findByRole('menuitem', { name: /delete task/i }));
    fireEvent.click(await screen.findByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /delete learning task\?/i })).not.toBeInTheDocument();
    });
    expect(deleteLearningTask).not.toHaveBeenCalled();
  });

  it('deletes the task from the confirmation dialog without opening the task modal', async () => {
    const setSelectedTaskId = jest.fn();
    const deleteLearningTask = jest.fn();

    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={setSelectedTaskId}
        deleteLearningTask={deleteLearningTask}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /task actions for build a practice app/i }));
    fireEvent.click(await screen.findByRole('menuitem', { name: /delete task/i }));
    fireEvent.click(await screen.findByRole('button', { name: 'Delete' }));

    expect(deleteLearningTask).toHaveBeenCalledWith(learningTaskItem.id);
    expect(setSelectedTaskId).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /delete learning task\?/i })).not.toBeInTheDocument();
    });
  });

  it('shows a hover tooltip for the delete icon button', async () => {
    render(
      <LearningTask
        learningTaskItem={learningTaskItem}
        setSelectedTaskId={jest.fn()}
        deleteLearningTask={jest.fn()}
      />
    );

    fireEvent.mouseOver(screen.getByRole('button', { name: /task actions for build a practice app/i }));

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Task actions');
  });
});
