import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Particulardata from './Particulardata';
import Card from './Card';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Card/>}/>
          <Route path = '/particular-data' element = {<Particulardata/>}/>
          <Route path="*" element = {<Card/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
