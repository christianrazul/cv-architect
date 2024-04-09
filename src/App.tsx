import { useState } from 'react';
import './style.css';
import Header from './components/Header';
import Test from './components/Test';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Test />
      <h1 className='dark text-xl flex justify-center text-ellipsis'>Counter</h1>
    </>
  );
}

export default App;
