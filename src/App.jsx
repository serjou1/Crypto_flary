import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss'
import { Footer, Navbar } from './components';
import { Home } from './page';

function App() {
  return <div className={style.App}>
    <Navbar/>
    <div className={style.wrapper}>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </div>
    <Footer/>
  </div>;
}

export default App;
