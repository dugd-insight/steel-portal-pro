import { createHashRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About/About';
import Products from '../pages/Products';
import Solutions from '../pages/Solutions';
import News from '../pages/News';
import Contact from '../pages/Contact';
import ESG from '../pages/ESG';
import Technology from '../pages/Technology';
import NewsDetail from '../pages/News/NewsDetail';
import ProductDetail from '../pages/Products/ProductDetail';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:slug', element: <ProductDetail /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'news', element: <News /> },
      { path: 'news/:slug', element: <NewsDetail /> },
      { path: 'contact', element: <Contact /> },
      { path: 'esg', element: <ESG /> },
      { path: 'technology', element: <Technology /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
