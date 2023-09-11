/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import SingleAddress from './SingleAddress';

const mockAddress = {
  id: 1,
  address: '123 street',
  city: 'Example City',
  state: 'Example State',
  country: 'Example Country',
  pincode: '12345',
};

describe('Single Address Component', () => {
  it('renders the mock address details', () => {
    const { getByText } = render(
      <SingleAddress address={mockAddress} selected={false} error={false} />
    );
    expect(getByText('123 street')).toBeInTheDocument();
    expect(getByText('Example City, Example State, Example Country')).toBeInTheDocument();
    expect(getByText('12345')).toBeInTheDocument();
  });

  it('check if selected address has the blue border', () => {
    const { container } = render(
      <SingleAddress address={mockAddress} selected={true} error={false} />
    );
    expect(container.children).toHaveClass('box-border border-2 border-blue-400');
  });

  it('check if error is thrown when error = true is passed', () => {
    expect(() => {
      render(<SingleAddress address={mockAddress} selected={false} error={true} />);
    }).toThrow('This is an error getting a single address.');
  });
});