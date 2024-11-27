import {Routes, Route} from 'react-router-dom'
import NavigationBar from "./component/NavigationBar";
import HomePage from './component/Pages/HomePage';
function App() {
  return (
    <div className="App">
        <NavigationBar/>
      <Routes>
    
        <Route path='/' element={<HomePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
