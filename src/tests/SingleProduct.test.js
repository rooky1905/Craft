/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import SingleProduct from './SingleProduct';

const mockProduct = {
  id: 1,
  name: 'Example Product',
  price: 100,
  discount: 10,
};

describe('Single Product Component', () => {
  it('renders the mock product details', () => {
    const { getByText } = render(
      <SingleProduct product={mockProduct} error={false} />
    );
    expect(getByText('Example Product')).toBeInTheDocument();
    expect(getByText('₹ 90')).toBeInTheDocument(); //discounted price
    expect(getByText('₹100')).toBeInTheDocument();
    expect(getByText('10% off')).toBeInTheDocument();
  });

  it('check if throws an error when the error prop is true', () => {
    expect(() => {
      render(<SingleProduct product={mockProduct} error={true} />);
    }).toThrow('This is an error getting a single product.');
  });
});
