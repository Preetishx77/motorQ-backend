import {Routes,Route} from 'react-router-dom';
import './App.css';
import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';

function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/addblog' element={<AddBlog />} />
    </Routes>
    </>
  );
}

export default App;
