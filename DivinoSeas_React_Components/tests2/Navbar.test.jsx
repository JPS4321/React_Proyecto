import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../src/Components/NavBar/Navbar";

test('renders Navbar with logo, links, and search box', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const logo = screen.getByAltText(/DivinoSeas Logo/i);
  expect(logo).toBeInTheDocument();

  // Verifica que los enlaces se renderizan
  const homeLink = screen.getByText(/Home/i);
  const aboutLink = screen.getByText(/About/i);
  const contactLink = screen.getByText(/Contact/i);
  const shopWomenLink = screen.getByText(/Shop Women/i);
  const shopCoupleLink = screen.getByText(/Shop Couple/i);

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
  expect(shopWomenLink).toBeInTheDocument();
  expect(shopCoupleLink).toBeInTheDocument();

  // Verifica que el cuadro de búsqueda se renderiza
  const searchBox = screen.getByPlaceholderText(/Search/i);
  expect(searchBox).toBeInTheDocument();
});
