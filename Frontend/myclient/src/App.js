import {Routes, Route} from 'react-router-dom'
import NavigationBar from "./component/NavigationBar";
import HomePage from './component/Pages/HomePage';
import RegisterPage from './component/Pages/RegisterPage';

function App() {
  return (
    <div className="App">
        <NavigationBar/>
      <Routes>
    
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<RegisterPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
