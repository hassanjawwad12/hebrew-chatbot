import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from './Components/Error';
import { Admin } from './Components/Admin/Admin';
import { Chat } from './Components/Chat/Chat'
import { Start } from './Components/Chat/Start'
import { FAQ } from './Components/Chat/FAQ'
import { BotChat } from './Components/Chat/BotChat'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/start" element={<Start />} />
        <Route path="/botchat" element={<BotChat />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path='/fdf8a361-d7bc-4a56-99d4-5866c6f90ad8' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

