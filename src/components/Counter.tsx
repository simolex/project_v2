import { useState } from "react";
import styles from "./Counter.module.scss";

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    return (
        <div>
            <h1 className={styles.h1}> {count}</h1>
            <button onClick={increment}> Прибавить </button>
        </div>
    );
};

export default Counter;
