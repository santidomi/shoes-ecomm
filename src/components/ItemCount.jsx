import { useState, useEffect } from "react"

const ItemCount = ({ Stock, initial, onAdd }) => {
    const [count, setCount] = useState(1);
    const [stock, setStock] = useState(1);
    console.log(Stock)
    useEffect (() => {
        setCount(initial)
        setStock(Stock)
    }, [Stock, initial])

    const plusCount = () => {
        if(count === stock) {
            setCount(stock)
        }else{
            setCount(prevCount => prevCount +1)
        }
    }

    const minusCount = () => {
        if (count === initial) {
          setCount(1);
        } else if (count > stock) {
          setCount(0);
        } else {
          setCount((prevCount) => prevCount - 1);
        }
      };

      return (
        <div className="itemContainer">
          <div className="item">
          <button className="btn-cant" onClick={minusCount}>
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
              </svg>
            </button>
            <span className="itemCount">
              {count > stock ? "No disponible " : count}
            </span>
            <button className="btn-cant" onClick={plusCount}>
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>
            <button
              className="btnComprar"
              onClick={() => {
                onAdd(stock, count);
              }}
            >
              <svg
                className="aurisAddToCart bi bi-cart-plus-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
              </svg>
            </button>
          </div>
        </div>
      );
    };
    
export default ItemCount;