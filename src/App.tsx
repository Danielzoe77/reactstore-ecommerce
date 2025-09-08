import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import MainContext from './component/MainContext';
import ProductPage from './component/ProductPage';
import TopSellers from './component/TopSellers';
import PopularBlogs from './component/PopularBlogs';

export default function App() {
  return <Router>
<div className='flex h-screen'>
  <Sidebar/>

  <div className="rounded w-full justify-center flex-wrap flex">
        <Routes>
          <Route path="/" element={<MainContext />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
  </div>

  <div >
    <TopSellers/>
    <PopularBlogs/>
  </div>
</div>

  </Router>
}


