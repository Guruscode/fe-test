import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinancialDashboard from '@/app/components/BalanceCard';

jest.mock('@/app/components/Graph', () => ({
  AnimatedLineGraph: () => <div data-testid="animated-line-graph">Mocked Graph</div>
}));

describe('FinancialDashboard', () => {
  const defaultProps = {
    availableBalance: 5000,
    ledgerBalance: 6500,
    totalPayout: 3000,
    totalRevenue: 9500,
    pendingPayout: 1500
  };

  test('renders the component with all required props', () => {
    render(<FinancialDashboard {...defaultProps} />);
    
    // Check for main container
    expect(screen.getByText(/Available Balance/i)).toBeInTheDocument();
    
    // Check that the graph is rendered
    expect(screen.getByTestId('animated-line-graph')).toBeInTheDocument();
    
    // Check financial details are displayed
    expect(screen.getByText(/Ledger Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Payout/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Payout/i)).toBeInTheDocument();
  });

  test('displays correct currency values', () => {
    render(<FinancialDashboard {...defaultProps} />);
    
    expect(screen.getByText(`USD ${defaultProps.availableBalance}`)).toBeInTheDocument();
    expect(screen.getByText(`USD ${defaultProps.ledgerBalance}`)).toBeInTheDocument();
    expect(screen.getByText(`USD ${defaultProps.totalPayout}`)).toBeInTheDocument();
    expect(screen.getByText(`USD ${defaultProps.totalRevenue}`)).toBeInTheDocument();
    expect(screen.getByText(`USD ${defaultProps.pendingPayout}`)).toBeInTheDocument();
  });

  test('withdraw button is rendered and clickable', () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <div onClick={mockFn}>
        <FinancialDashboard {...defaultProps} />
      </div>
    );
    
    const withdrawButton = getByText('Withdraw');
    expect(withdrawButton).toBeInTheDocument();
    
    fireEvent.click(withdrawButton);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('InfoIcon components are rendered', () => {
    render(<FinancialDashboard {...defaultProps} />);
    
    // There should be 4 InfoIcon components (for ledger balance, total payout, total revenue, and pending payout)
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBe(4);
  });

  test('responsive layout changes based on screen size', () => {
    // This test is more conceptual since Jest doesn't handle media queries well
    // We can check that necessary classes for responsiveness are present
    
    const { container } = render(<FinancialDashboard {...defaultProps} />);
    
    // Check for responsive flex layout
    expect(container.querySelector('.flex.flex-col.md\\:flex-row')).toBeInTheDocument();
    
    // Check for responsive text sizes
    expect(container.querySelector('.text-3xl.md\\:text-4xl')).toBeInTheDocument();
    expect(container.querySelector('.text-xl.md\\:text-2xl')).toBeInTheDocument();
  });

  test('handles zero values correctly', () => {
    const zeroProps = {
      availableBalance: 0,
      ledgerBalance: 0,
      totalPayout: 0,
      totalRevenue: 0,
      pendingPayout: 0
    };
    
    render(<FinancialDashboard {...zeroProps} />);
    
    // Check that zero values are displayed properly
    expect(screen.getAllByText('USD 0')).toHaveLength(5);
  });

  test('handles large numeric values with proper formatting', () => {
    // You might want to implement number formatting in your component
    const largeProps = {
      availableBalance: 1000000,
      ledgerBalance: 2000000,
      totalPayout: 3000000,
      totalRevenue: 4000000,
      pendingPayout: 5000000
    };
    
    render(<FinancialDashboard {...largeProps} />);
    
    expect(screen.getByText(`USD ${largeProps.availableBalance}`)).toBeInTheDocument();
    expect(screen.getByText(`USD ${largeProps.ledgerBalance}`)).toBeInTheDocument();

  });


});