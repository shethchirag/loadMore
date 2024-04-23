import { useState } from "react";
import "./style.css";
import { useEffect } from "react";

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  console.log(products);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const data = await response.json();
      console.log(data);
      if (data && data.products && data.products.length) {
        setProducts((prev) => [...prev, ...data.products]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [count]);

  if (loading) {
    return <div>Loading...Please Wait</div>;
  }

  return (
    <>
      {" "}
      <div className="container">
        <div className="product-container">
          {products && products.length
            ? products.map((product, index) => (
                <div className="product" key={index}>
                  <img src={product.thumbnail} alt="" />
                  <p>{product.title}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {products.length === 100 ? (
          "No more products maximum 100 products reached"
        ) : (
          <button
            disabled={products.length === 100}
            onClick={() => setCount(count + 1)}
          >
            Load more Product
          </button>
        )}
      </div>
    </>
  );
};

export default LoadMoreData;
