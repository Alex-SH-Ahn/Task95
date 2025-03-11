import MainPage from './pages/MainPage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background-teal m-0 p-0 overflow-hidden">
          <MainPage />
      </div>
    </LocalizationProvider>
  );
}

export default App;
