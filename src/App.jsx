import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './routes'
import { ToastContainer } from 'react-toastify';
import { LoadingConsumer } from './context/loadingContext';
import { Backdrop, CircularProgress } from '@mui/material';
import './style.css'

const App = () => {
  const { isLoading } = LoadingConsumer();

  return (
    <>
      <AppRoutes />
      <Backdrop sx={{ zIndex: 10 }} open={isLoading}>
          <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </>
  ) 
}

export default App