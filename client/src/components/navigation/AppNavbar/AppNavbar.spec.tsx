import React from 'react';
import { render, screen } from '@testing-library/react';
import AppNavbar from './AppNavbar';

jest.mock('next/link', () => {
  return function MockNextLink({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('AppNavbar', () => {
  it('renders the persistent app links for home and learning', () => {
    render(<AppNavbar />);

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'TechUp' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'My Learning' })).toHaveAttribute('href', '/learning');
  });
});
