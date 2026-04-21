import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LearningTaskModal from './LearningTaskModal';
import { LearningTasksContext } from '@/context/learningTasks/learningTasks.store';

describe('LearningTaskModal', () => {
  const learningTask = {
    id: 'task-1',
    title: 'Finish hooks practice',
    description: 'Build a small app that uses effects and derived state carefully.',
    learningResource: 'Course project',
    progress: 80,
  };
  const renderLearningTaskModal = ({
    mode = 'edit',
    task,
    dispatch = jest.fn(),
    onClose = jest.fn(),
    deleteLearningTask = jest.fn(),
  }: {
    mode?: 'create' | 'edit';
    task?: typeof learningTask;
    dispatch?: jest.Mock;
    onClose?: jest.Mock;
    deleteLearningTask?: jest.Mock;
  } = {}) =>
    {
      const resolvedTask = mode === 'create' ? undefined : (task ?? learningTask);

      return render(
        <LearningTasksContext.Provider
          value={{
            state: {
              learningTasks: resolvedTask ? [resolvedTask] : [],
            },
            dispatch,
          }}
        >
          <LearningTaskModal
            open
            mode={mode}
            learningTask={resolvedTask}
            defaultSwimlaneId="A"
            deleteLearningTask={deleteLearningTask}
            onClose={onClose}
          />
        </LearningTasksContext.Provider>
      );
    };

  it('renders seeded task values and an editable progress slider when open', () => {
    renderLearningTaskModal();

    expect(screen.getByRole('dialog', { name: 'Edit learning task' })).toBeInTheDocument();
    expect(screen.getByDisplayValue(learningTask.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(learningTask.description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(learningTask.learningResource)).toBeInTheDocument();
    expect(screen.getByText(`${learningTask.progress}%`)).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Progress' })).toBeEnabled();
    expect(screen.getByRole('button', { name: /task actions for finish hooks practice/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
  });

  it('renders blank create-task inputs without edit-only actions', () => {
    renderLearningTaskModal({ mode: 'create', task: undefined });

    expect(screen.getByRole('dialog', { name: 'Create learning task' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create task' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');
    expect(screen.getByLabelText(/Learning Resource/i)).toHaveValue('');
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /task actions for/i })).not.toBeInTheDocument();
  });

  it('renders accessible labels and required field semantics', () => {
    renderLearningTaskModal();

    expect(screen.getByLabelText(/Title/i)).toBeRequired();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Learning Resource/i)).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Progress' })).toBeEnabled();
  });

  it('does not submit the form when the required title field is empty', () => {
    const onClose = jest.fn();

    renderLearningTaskModal({
      task: { ...learningTask, title: '' },
      onClose,
    });

    const titleInput = screen.getByLabelText(/Title/i);

    expect(titleInput).toBeInvalid();

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes when the cancel button is clicked', () => {
    const onClose = jest.fn();

    renderLearningTaskModal({ onClose });

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the modal close icon is clicked', () => {
    const onClose = jest.fn();

    renderLearningTaskModal({ onClose });

    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the form is submitted', () => {
    const onClose = jest.fn();

    renderLearningTaskModal({ onClose });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('dispatches a new learning task when the create form is submitted', () => {
    const dispatch = jest.fn();
    const onClose = jest.fn();

    renderLearningTaskModal({
      mode: 'create',
      task: undefined,
      dispatch,
      onClose,
    });

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Create a testing checklist' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Write down the accessibility and reducer cases to cover.' },
    });
    fireEvent.change(screen.getByLabelText(/Learning Resource/i), {
      target: { value: 'Project notes' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'add_learning_tasks',
      payload: expect.objectContaining({
        id: expect.any(String),
        title: 'Create a testing checklist',
        description: 'Write down the accessibility and reducer cases to cover.',
        learningResource: 'Project notes',
        progress: 0,
        swimlane: 'A',
      }),
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('opens the shared actions menu and starts the delete confirmation flow', async () => {
    renderLearningTaskModal();

    fireEvent.click(screen.getByRole('button', { name: /task actions for finish hooks practice/i }));
    fireEvent.click(await screen.findByRole('menuitem', { name: /delete task/i }));

    expect(await screen.findByRole('dialog', { name: /delete learning task\?/i })).toBeInTheDocument();
  });

  it('deletes the task from the modal confirmation dialog and closes the modal', async () => {
    const onClose = jest.fn();
    const deleteLearningTask = jest.fn();

    renderLearningTaskModal({ deleteLearningTask, onClose });

    fireEvent.click(screen.getByRole('button', { name: /task actions for finish hooks practice/i }));
    fireEvent.click(await screen.findByRole('menuitem', { name: /delete task/i }));
    fireEvent.click(await screen.findByRole('button', { name: 'Delete' }));

    expect(deleteLearningTask).toHaveBeenCalledWith(learningTask.id);
    expect(onClose).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /delete learning task\?/i })).not.toBeInTheDocument();
    });
  });
});
