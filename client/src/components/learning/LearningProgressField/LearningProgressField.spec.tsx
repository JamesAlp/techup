import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LearningProgressField from './LearningProgressField';

describe('LearningProgressField', () => {
  it('renders the progress label and seeded percentage readout', () => {
    render(<LearningProgressField label="Progress" defaultValue={45} />);

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Progress' })).toBeInTheDocument();
  });

  it('updates the displayed percentage when the editable slider changes', () => {
    render(<LearningProgressField label="Progress" defaultValue={30} />);

    const slider = screen.getByRole('slider', { name: 'Progress' });

    fireEvent.change(slider, { target: { value: '72' } });

    expect(screen.getByText('72%')).toBeInTheDocument();
  });

  it('renders a disabled slider when editing is turned off', () => {
    render(<LearningProgressField label="Progress" defaultValue={60} editable={false} />);

    expect(screen.getByRole('slider', { name: 'Progress' })).toBeDisabled();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('exposes the progress readout with an accessible label', () => {
    render(<LearningProgressField label="Progress" defaultValue={60} />);

    expect(screen.getByLabelText('Progress percentage')).toHaveTextContent('60%');
  });
});
