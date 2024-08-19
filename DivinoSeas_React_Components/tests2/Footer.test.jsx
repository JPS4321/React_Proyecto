import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../src/Components/Footer/Footer';

test('renders Footer with contact information, Dvino Seas section, and social media links', () => {
  render(<Footer />);

  // Verifica que la sección de contacto se renderiza
  const contactTitle = screen.getByText(/Contacto/i);
  const address = screen.getByText(/Dirección:/i);
  const phone = screen.getByText(/Teléfono:/i);
  const email = screen.getByText(/Correo:/i);

  expect(contactTitle).toBeInTheDocument();
  expect(address).toBeInTheDocument();
  expect(phone).toBeInTheDocument();
  expect(email).toBeInTheDocument();

  // Verifica que la sección Dvino Seas se renderiza
  const dvinoSeasTitle = screen.getByText(/Dvino Seas/i);
  const aboutUs = screen.getByText(/Sobre Nostros/i);
  const ourServices = screen.getByText(/Nuestros Servicios/i);
  const privacyPolicy = screen.getByText(/Politica de Privacidad/i);

  expect(dvinoSeasTitle).toBeInTheDocument();
  expect(aboutUs).toBeInTheDocument();
  expect(ourServices).toBeInTheDocument();
  expect(privacyPolicy).toBeInTheDocument();

  // Verifica que la sección de redes sociales se renderiza
  const followUsTitle = screen.getByText(/¡Siguenos!/i);
  const facebook = screen.getByText(/Facebook/i);
  const xSocial = screen.getByText(/^X$/i);
  const instagram = screen.getByText(/Instagram/i);

  expect(followUsTitle).toBeInTheDocument();
  expect(facebook).toBeInTheDocument();
  expect(xSocial).toBeInTheDocument();
  expect(instagram).toBeInTheDocument();
});
