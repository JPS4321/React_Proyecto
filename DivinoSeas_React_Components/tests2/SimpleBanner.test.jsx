import React from 'react';
import { render } from '@testing-library/react';
import SimpleBanner from '../src/Components/SimpleBanner/SimpleBanner';

test('renders SimpleBanner with correct background image', () => {
      // URL de la imagen de fondo para la prueba

  const backgroundImage = 'https://example.com/image.jpg';

    // Renderiza el componente SimpleBanner con la imagen de fondo proporcionada

  const { container } = render(<SimpleBanner backgroundImage={backgroundImage} />);
  // Obtiene el primer elemento hijo del contenedor renderizado

  const bannerDiv = container.firstChild;
    // Verifica que el estilo de 'background-image' del elemento renderizado sea correcto

  expect(bannerDiv).toHaveStyle(`background-image: url(${backgroundImage})`);
});
