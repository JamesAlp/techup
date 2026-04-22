import React, { ReactNode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { LearningTasksContext } from '@/context/learningTasks/learningTasks.store';
import exampleLearningTasks from '@/temp/learningTasks';
import Learning from './page';

type MockDragEndEvent = {
  canceled?: boolean;
  operation?: {
    source?: { id?: string };
    target?: { id?: string };
  };
};

let dragEndHandler: ((event: MockDragEndEvent) => void) | undefined;

jest.mock('@dnd-kit/react', () => ({
  DragDropProvider: ({
    children,
    onDragEnd,
  }: {
    children: ReactNode;
    onDragEnd?: (event: MockDragEndEvent) => void;
  }) => {
    dragEndHandler = onDragEnd;
    return children;
  },
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
  const renderLearningPage = ({
    tasks = exampleLearningTasks,
    dispatch = jest.fn(),
  }: {
    tasks?: typeof exampleLearningTasks;
    dispatch?: jest.Mock;
  } = {}) =>
    render(
      React.createElement(
        LearningTasksContext.Provider,
        {
          value: {
            state: {
              learningTasks: tasks,
            },
            dispatch,
          },
        },
        React.createElement(Learning)
      )
    );

  beforeEach(() => {
    dragEndHandler = undefined;
  });

  it('mounts the five current learning swim lanes with their titles', () => {
    const { container } = renderLearningPage();

    expect(expectedLearningSwimlanes).toHaveLength(5);

    for (const learningSwimlane of expectedLearningSwimlanes) {
      expect(screen.getByText(learningSwimlane.title)).toBeInTheDocument();
      expect(container.querySelector(`[id="${learningSwimlane.id}"]`)).toBeInTheDocument();
    }
  });

  it('renders the swim lane headings in the expected order', () => {
    renderLearningPage();

    const headings = screen.getAllByRole('heading', { level: 2 });

    expect(headings).toHaveLength(expectedLearningSwimlanes.length);
    expect(headings.map((heading) => heading.textContent)).toEqual(
      expectedLearningSwimlanes.map((learningSwimlane) => learningSwimlane.title)
    );
  });

  it('renders one labeled swim lane drop area for each target', () => {
    renderLearningPage();

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

  it('renders mobile and desktop add-task entry buttons', () => {
    renderLearningPage();

    expect(screen.getByRole('button', { name: 'Add task' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add learning task' })).toBeInTheDocument();
  });

  it('opens the shared modal in create mode from the add-task button', () => {
    renderLearningPage();

    fireEvent.click(screen.getByRole('button', { name: 'Add task' }));

    expect(screen.getByRole('dialog', { name: 'Create learning task' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create task' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /task actions for/i })).not.toBeInTheDocument();
  });

  it('dispatches a new task into the first swimlane when the create modal is submitted', () => {
    const dispatch = jest.fn();

    renderLearningPage({ dispatch });

    fireEvent.click(screen.getByRole('button', { name: 'Add task' }));
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Practice reducer walkthrough' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Trace the create, update, and delete actions end to end.' },
    });
    fireEvent.change(screen.getByLabelText(/Learning Resource/i), {
      target: { value: 'Learning board backlog' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'add_learning_tasks',
      payload: expect.objectContaining({
        id: expect.any(String),
        title: 'Practice reducer walkthrough',
        description: 'Trace the create, update, and delete actions end to end.',
        learningResource: 'Learning board backlog',
        progress: 0,
        swimlane: 'A',
      }),
    });
  });

  it('dispatches an updated swimlane when a task is dropped on a valid lane target', () => {
    const dispatch = jest.fn();
    const sourceTask = exampleLearningTasks[0];

    renderLearningPage({ dispatch });

    act(() => {
      dragEndHandler?.({
        canceled: false,
        operation: {
          source: { id: sourceTask.id },
          target: { id: 'B' },
        },
      });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'update_learning_tasks',
      payload: {
        ...sourceTask,
        swimlane: 'B',
      },
    });
  });

  it('does not dispatch a swimlane update when the drag operation is canceled', () => {
    const dispatch = jest.fn();

    renderLearningPage({ dispatch });

    act(() => {
      dragEndHandler?.({
        canceled: true,
        operation: {
          source: { id: exampleLearningTasks[0].id },
          target: { id: 'B' },
        },
      });
    });

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch a swimlane update when the drag target is not a valid swimlane', () => {
    const dispatch = jest.fn();

    renderLearningPage({ dispatch });

    act(() => {
      dragEndHandler?.({
        canceled: false,
        operation: {
          source: { id: exampleLearningTasks[0].id },
          target: { id: 'not-a-swimlane' },
        },
      });
    });

    expect(dispatch).not.toHaveBeenCalled();
  });
});
