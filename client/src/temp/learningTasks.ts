import { LearningTaskItem } from "@/components/learning/LearningTask/LearningTask";

const exampleLearningTasks: LearningTaskItem[] = [
  {
    id: 'A',
    title: 'Finish React fundamentals module',
    description: 'Work through components, props, JSX, and state basics before moving into project work.',
    learningResource: 'Udemy React course',
    progress: 15,
    swimlane: 'A',
  },
  {
    id: 'B',
    title: 'Review component composition patterns',
    description: 'Take notes on composition, prop drilling, and how to break large UI trees into smaller pieces.',
    learningResource: 'React docs',
    progress: 5,
    swimlane: 'A',
  },
  {
    id: 'C',
    title: 'Build a hooks practice app',
    description: 'Create a small practice app that uses state, effects, and reusable components.',
    learningResource: 'Course project section',
    progress: 55,
    swimlane: 'B',
  },
  {
    id: 'D',
    title: 'Complete routing mini project',
    description: 'Finish the guided router exercise and verify the page flow works across nested routes.',
    learningResource: 'React Router tutorial',
    progress: 80,
    swimlane: 'B',
  },
  {
    id: 'E',
    title: 'Wrap up module quiz',
    description: 'Submit the end-of-module assessment and record any missed concepts for follow-up.',
    learningResource: 'Course quiz',
    progress: 100,
    swimlane: 'C',
  },
  {
    id: 'F',
    title: 'Verify state management notes',
    description: 'Re-read notes on derived state and effects to make sure the explanations still feel solid.',
    learningResource: 'Personal notes',
    progress: 100,
    swimlane: 'D',
  },
  {
    id: 'G',
    title: 'Rebuild todo app from memory',
    description: 'Recreate the practice app without the walkthrough to confirm the core concepts have stuck.',
    learningResource: 'Previous project brief',
    progress: 100,
    swimlane: 'E',
  },
  {
    id: 'H',
    title: 'Explain hooks lifecycle aloud',
    description: 'Talk through render timing, effect cleanup, and dependency behavior without referring to notes.',
    learningResource: 'Self-review session',
    progress: 100,
    swimlane: 'A',
  },
];

export default exampleLearningTasks;
