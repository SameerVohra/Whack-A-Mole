import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [moleX, setMoleX] = useState<number>(0);
  const [moleY, setMoleY] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const MOLE_SIZE = 40;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (
      clientX >= moleX &&
      clientX <= moleX + MOLE_SIZE &&
      clientY >= moleY &&
      clientY <= moleY + MOLE_SIZE
    ) {
      setScore((prev) => prev + 1);
      spawnMole(); // Move mole immediately on hit.
    }
  };

  const spawnMole = () => {
    setMoleX(Math.floor(Math.random() * (window.innerWidth - MOLE_SIZE)));
    setMoleY(Math.floor(Math.random() * (window.innerHeight - MOLE_SIZE)));
  };

  useEffect(() => {
    const interval = setInterval(spawnMole, 5000); // Move mole every second.
    return () => clearInterval(interval); // Cleanup on unmount.
  }, []);

  return (
    <div
      className="border-2 border-red-500 min-h-screen min-w-full relative bg-black"
      onMouseDown={handleMouseDown}
    >
      <div className="text-white text-2xl absolute top-2 left-2">Score: {score}</div>
      <div
        className="bg-red-500 rounded-full absolute cursor-pointer"
        style={{
          width: `${MOLE_SIZE}px`,
          height: `${MOLE_SIZE}px`,
          left: `${moleX}px`,
          top: `${moleY}px`,
        }}
      ></div>
    </div>
  );
}

export default App;
