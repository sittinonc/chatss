import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Error() {
  const [count, setCount] = useState<number>(4);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      navigate('/enter-username');
    }
  }, [count]);

  return (
    <div>
      <p>Error, page not found</p>
      <p>Back to the main page in {count} seconds</p>
    </div>
  );
}
