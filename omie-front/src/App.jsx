import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './global.css';

import { Home } from './pages/Home';

export function App() {
 
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Home />
    </>   
  )
}