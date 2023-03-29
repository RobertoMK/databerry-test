import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './home/Home';
function App() {
  return (
    <div className="App">
      <div>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<HomeRoute />}></Route>
        </Routes>
      </div>

    </div>
  );
}

function HomeRoute() {
  return (
    <Home></Home>
  )
}

export default App;
