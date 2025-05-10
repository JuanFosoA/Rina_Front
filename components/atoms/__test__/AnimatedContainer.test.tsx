import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import AnimatedContainer from '../AnimatedContainer';

const { width } = require('react-native').Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

describe('AnimatedContainer', () => {

  // Test 1: Verificar que el componente renderiza los hijos correctamente
  it('should render its children', () => {
    const { getByText } = render(
      <AnimatedContainer animatedStyle={{}}>
        <Text>¡Hola Mundo!</Text>
      </AnimatedContainer>
    );
    expect(getByText('¡Hola Mundo!')).toBeDefined();
  });

  // Test 2: Verificar que se aplique el estilo animado pasado como prop
  it('should apply the provided animated style', () => {
    const animatedStyle = { transform: [{ scale: 1.5 }] };

    const { getByTestId } = render(
      <AnimatedContainer animatedStyle={animatedStyle}>
        <Text>Test Child</Text>
      </AnimatedContainer>
    );

    const container = getByTestId('animated-container');
    expect(container.props.style).toEqual(expect.objectContaining(animatedStyle));
  });

  // Test 3: Verificar que se apliquen los estilos predeterminados correctamente (como 'bg-white', 'rounded-xl', etc.)
  it('should apply default styles correctly', () => {
    const { getByTestId } = render(
      <AnimatedContainer animatedStyle={{}}>
        <Text>Test Child</Text>
      </AnimatedContainer>
    );

    const container = getByTestId('animated-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.6,
      })
    );
  });

  // Test 4: Verificar que el componente use el tamaño calculado de ITEM_WIDTH e ITEM_HEIGHT
  it('should apply dynamic width and height', () => {
    const { getByTestId } = render(
      <AnimatedContainer animatedStyle={{}}>
        <Text>Test Child</Text>
      </AnimatedContainer>
    );

    const container = getByTestId('animated-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
      })
    );
  });

  // Test 5: Verificar que los hijos estén correctamente envueltos por el componente con los estilos correctos
  it('should wrap children with correct styles', () => {
    const { getByText } = render(
      <AnimatedContainer animatedStyle={{}}>
        <Text>Test Child</Text>
      </AnimatedContainer>
    );

    const container = getByText('Test Child').parentElement;  // Accedemos al contenedor que envuelve el hijo
    expect(container).toHaveStyle({
      backgroundColor: 'white',
      borderRadius: 10,  // Verifica el borde redondeado, que debe ser el valor de 'rounded-xl'
      shadowColor: 'black',
      shadowOpacity: 0.6,
    });
  });

});
