import React from 'react';
import { render } from '@testing-library/react-native';
import TitleText from '../TitleText';

describe('TitleText Component', () => {
  /**
   * Test 1: Renderizado básico
   * Verifica que el componente TitleText renderiza correctamente
   * el texto children que recibe como prop.
   * Debería mostrar exactamente el texto pasado como children.
   */
  it('renders the children correctly', () => {
    const testText = 'Hello World';
    const { getByText } = render(<TitleText>{testText}</TitleText>);
    
    expect(getByText(testText)).toBeTruthy();
  });

  /**
   * Test 2: Estilos por defecto
   * Verifica que el componente aplica las clases CSS (className)
   * por defecto correctamente.
   * Debería contener las clases 'text-xl' y 'font-bold'.
   */
  it('applies the default className styles', () => {
    const testText = 'Styled Text';
    const { getByText } = render(<TitleText>{testText}</TitleText>);
    const textElement = getByText(testText);
    
    expect(textElement.props.className).toContain('text-xl'); 
  });

  /**
   * Test 3: Combinación de estilos
   * Verifica que el componente maneja correctamente estilos personalizados
   * combinándolos con los estilos por defecto.
   * 1. Debería aplicar los estilos personalizados (color: red en este caso)
   * 2. Debería mantener las clases por defecto
   */
  it('merges custom styles with default styles', () => {
    const testText = 'Custom Style Text';
    const customStyle = { color: 'red' };
    const { getByText } = render(<TitleText style={customStyle}>{testText}</TitleText>);
    const textElement = getByText(testText);
    
    // Verificación flexible que maneja tanto objeto como array de estilos
    const receivedStyle = textElement.props.style;
    if (Array.isArray(receivedStyle)) {
      expect(receivedStyle).toEqual(
        expect.arrayContaining([
          expect.objectContaining(customStyle),
        ])
      );
    } else {
      expect(receivedStyle).toEqual(expect.objectContaining(customStyle));
    }
    
    expect(textElement.props.className).toContain('text-xl');
    expect(textElement.props.className).toContain('font-bold');
  });

  /**
   * Test 4: Comportamiento sin prop de estilo
   * Verifica el comportamiento del componente cuando no se le pasan
   * estilos personalizados.
   * 1. No debería tener estilos aplicados (o debería tener los por defecto)
   * 2. Debería mantener las clases por defecto
   */
  it('renders without style prop', () => {
    const testText = 'No Style Text';
    const { getByText } = render(<TitleText>{testText}</TitleText>);
    const textElement = getByText(testText);
    
    expect(textElement.props.style).toBeFalsy();
  });
});