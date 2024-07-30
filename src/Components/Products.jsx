import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, addToCart } from '../rtk/store';
import { Link } from "react-router-dom";

function Products({ isHomepage, itemsPerPage }) {
  const dispatch = useDispatch();
  // taking data from redux store
  const products = useSelector((state) => state.products);
  // the current page of pagination 
  const [currentPage, setCurrentPage] = useState(1);
  // an array to save the visited page, in order to reduce the api calling
  const [visitedPages, setVisitedPages] = useState([]);
  // State for showing the prompt
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!visitedPages.includes(currentPage)) {
      setVisitedPages([...visitedPages, currentPage]);
      fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`)
        .then(res => res.json())
        .then((data) => {
          const updatedProducts = [...products, ...data.products];
          dispatch(setProducts(updatedProducts));
        });
    }
  }, [dispatch, currentPage]);

  const handleAddToCart = (product) => {
    // detault quantity when you are adding outside the productDetails
    const quantity = 1;
    dispatch(addToCart({ ...product, quantity }));
    // show the prompt
    setShowPrompt(true);
    setTimeout(() => {
      // hide it after 1 second
      setShowPrompt(false);
    }, 1000);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // console.log(products);
  // console.log(currentProducts);
  // console.log(`startIndex ${startIndex}`);
  // console.log(`currentPage ${currentPage}`);

  return (
    <div className="mx-auto mt-14 md:px-16 px-4 py-10" id="products">

      {/* Product Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:w-11/12 mx-auto">
        {currentProducts.map((product, index) => (
          <div
            key={index}
            className="border py-6 px-4 rounded-lg shadow-lg flex flex-col justify-between"
          >
            {/* Card Image */}
            <div className="flex justify-center items-center h-52">
              <img src={product.images[0]} alt={product.title} className="object-contain h-full w-full" />
            </div>

            {/* Card Content */}
            <div className="flex flex-col items-center justify-between flex-grow">
              {/* Brand */}
              <p className="italic text-gray-500 mt-4">{product.brand}</p>

              {/* Card Title */}
              <h3 className="text-2xl font-bold text-center text-primary my-2">
                {product.title}
              </h3>

              {/* Card Description */}
              {isHomepage === 0 && (
                <div className="text-gray-700 text-center my-2 px-2">
                  {product.description}
                </div>
              )}

              {/* Card Pricing */}
              <div className="text-center my-2">
                <p className="text-secondary text-3xl font-bold">
                  ${product.price}
                </p>
                <p className="text-red-500 line-through italic">
                  Price Before: ${Math.round(product.price + (product.discountPercentage * product.price) / 100)}
                </p>
              </div>

              {/* Card Actions */}
              <div className="mt-4 flex gap-4">
                <button
                  className="border-4 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                  onClick={() => { handleAddToCart(product) }}
                >
                  Add to Cart
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="flex text-center items-center border-4 border-secondary text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition"
                >
                  See More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt for add to cart */}
      {showPrompt && (
        <div className="fixed top-16 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-500">
          Added to cart!
        </div>
      )}

      <div className="flex justify-center p-4">
        <button className="p-2 border rounded-md hover:bg-primary hover:text-white transition-all" onClick={handlePreviousPage}>Previous</button>
        <span className="p-2"> Page {currentPage} </span>
        <button className="p-2 border rounded-md hover:bg-primary hover:text-white transition-all" onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Products