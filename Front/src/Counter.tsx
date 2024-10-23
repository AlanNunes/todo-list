import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);

    const Decrement = () => {
        if (count > 0) {
            setCount(c => c - 1);
        }
    }

    const Increment = () => setCount(c => c + 1);

  return (
    <>
    <div>Counter is {count}</div>
    <button type="button" className="btn btn-success" onClick={Increment}>Increment</button>
    <button type="button" className="btn btn-danger" onClick={Decrement}>Decrement</button>
    </>
  )
}

export default Counter