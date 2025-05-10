import React from 'react';
import { render } from '@testing-library/react-native';
import CategoryButton from '../CategoryButton';

describe('CategoryButton', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(
      <CategoryButton label="Test Label" isSelected={false} />
    );

    expect(getByText('Test Label')).toBeDefined();
  });

  it('applies correct text color when selected', () => {
    const { getByText } = render(
      <CategoryButton label="Selected Label" isSelected={true} />
    );

    const text = getByText('Selected Label');
    expect(text.props.style).toEqual(expect.objectContaining({ color: '#FFF' }));
  });

  it('applies correct background color when selected', () => {
    const { getByTestId } = render(
      <CategoryButton label="Selected Label" isSelected={true} />
    );

    const container = getByTestId('category-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({ backgroundColor: '#EF233C' })
    );
  });

  it('applies correct text color when not selected', () => {
    const { getByText } = render(
      <CategoryButton label="Unselected Label" isSelected={false} />
    );

    const text = getByText('Unselected Label');
    expect(text.props.style).toEqual(expect.objectContaining({ color: '#000' }));
  });

  it('applies correct background color when not selected', () => {
    const { getByTestId } = render(
      <CategoryButton label="Unselected Label" isSelected={false} />
    );

    const container = getByTestId('category-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({ backgroundColor: '#FFF' })
    );
  });

  it('includes shadow properties regardless of selection', () => {
    const { getByTestId } = render(
      <CategoryButton label="Shadow Test" isSelected={true} />
    );

    const container = getByTestId('category-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        shadowOpacity: 0.1,
        shadowRadius: 7,
      })
    );
  });

  it('handles long labels without crashing', () => {
    const longLabel = 'Esto es un texto de prueba bastante largo para probar el comportamiento visual del botón';
    const { getByText } = render(
      <CategoryButton label={longLabel} isSelected={false} />
    );

    expect(getByText(longLabel)).toBeDefined();
  });
});
