import { useState } from 'react';
import './style.css';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <h1 className='text-xl flex justify-center text-ellipsis'>Counter</h1>
    </>
  );
}

export default App;
