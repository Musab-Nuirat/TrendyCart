import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  // a variable to open/close the menu on mobile view 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // for see the search (input and results) menu
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // for sending the input to the api
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (event) => {
    // take the user input on change (without needing submit button)
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // wait one second before sending the serachterm to the api
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      fetch(`https://dummyjson.com/products/search?q=${debouncedTerm}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data.products.slice(0, 5)); // Display top 5 results
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedTerm]);

  const navItems = [
    { link: "Homepage", path: "/" },
    { link: "Products", path: "/products" },
  ];

  return (
    <>
      <nav className="flex justify-center bg-white md:px-14 p-4 border-b text-primary fixed top-0 right-0 left-0 z-50">
        {/* Left content of the navbar (TrendyCart, homepage and products) */}
        <div className="container flex justify-between items-center">

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold italic text-primary">
              TrendyCart
            </Link>
            {/* homepage and products will be hidden in mobile */}
            <ul className="hidden md:flex space-x-8">
              {navItems.map(({ link, path }) => (
                <Link
                  key={link}
                  to={path}
                  className="text-secondary hover:text-primary"
                >
                  {link}
                </Link>
              ))}
            </ul>
          </div>

          {/* right content of navbar (search and cart) */}
          <div className="flex items-center space-x-6">
            <button
              onClick={handleSearchClick}
              className="text-primary hover:text-gray-500 focus:outline-none"
            >
              <FaSearch />
            </button>
            <Link to="/cart" className="text-primary hover:text-gray-500 ">
              <FaShoppingCart size={24} />
            </Link>
            <button
              onClick={toggleMenu}
              className="md:hidden text-primary focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
        {/* search input and results menu */}
        {searchVisible && (
          <div className="absolute top-[calc(100%+5px)] left-0 right-0 bg-white shadow-md z-40">
            <div className=" container mx-auto p-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="text-gray-600 w-full p-2 border rounded-lg outline-gray-400"
              />
              {searchResults.length > 0 && (
                <ul className="mt-2 bg-white border rounded-lg shadow-lg">
                  {searchResults.map((product) => (
                    <Link to={`/products/${product.id}`} className="flex items-center p-2 border-b hover:bg-gray-100">
                      <li key={product.id} className="flex items-center ">
                        <img src={product.thumbnail} className="w-10 h-10 mr-2" />
                        <div>
                          <p className="font-bold">{product.title}</p>
                          <p className="text-sm text-gray-600">${product.price}</p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* homepage and products in mobile */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bg-primary bg-opacity-85 z-40 md:hidden rounded-lg shadow-lg">
          <ul className="mt-16 p-8 flex flex-col items-center space-y-8 text-xl text-white">
            {navItems.map(({ link, path }) => (
              <Link
                key={link}
                to={path}
                onClick={toggleMenu}
                className="hover:text-gray-300"
              >
                {link}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
