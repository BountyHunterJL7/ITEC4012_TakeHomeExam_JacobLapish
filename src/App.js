import './App.css';
import {
  BrowserRouter as Router,
  Routes, 
  Route
} from "react-router-dom";

import {Header} from './components/header';
import {HomePage} from './components/pages/home';
import { Login } from './components/pages/login';
import { Post } from './components/pages/post'
import { Me } from './components/pages/me';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<HomePage/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/post" element={<Post/>}></Route>
          <Route path="/me/:id" element={<Me/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
