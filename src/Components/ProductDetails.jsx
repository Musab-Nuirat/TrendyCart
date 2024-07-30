import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../rtk/store';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    // State for showing the prompt
    const [showPrompt, setShowPrompt] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity }));
        // show the prompt
        setShowPrompt(true);
        setTimeout(() => {
            // hide it after 1 second
            setShowPrompt(false);
        }, 1000);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                // console.log(data);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="text-center mt-20 text-xl"></div>;
    }

    return (
        <div className="mt-20 md:w-11/12 mx-auto p-4">
            <div className="grid md:grid-cols-2 gap-8">
                {/* product images  */}
                <div className="flex justify-center items-center">
                    <Carousel showArrows={true} infiniteLoop={true} showThumbs={true} showStatus={false}>
                        {product.images.map((image, index) => (
                            <div key={index} className="flex justify-center items-center h-64 overflow-hidden rounded-t-lg">
                                <img src={image} alt={`${product.title} image ${index + 1}`} className="object-contain h-full w-full " />
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* product info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-primary mb-4">{product.title}</h1>
                        <p className="italic text-gray-500 mb-2">{product.brand}</p>
                        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                        <p className="text-3xl font-bold text-secondary mb-2">${product.price}</p>
                        <p className="text-red-500 line-through mb-4 italic">
                            Price Before: ${Math.round(product.price + (product.discountPercentage * product.price) / 100)}
                        </p>
                        <div className="flex items-center mb-4">
                            <span className="text-yellow-500">
                                {Array(Math.round(product.rating)).fill('⭐')}
                            </span>
                            <span className="ml-2 text-gray-600">({product.rating})</span>
                        </div>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Stock</td>
                                    <td className="border px-4 py-2">{product.stock} available</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">SKU</td>
                                    <td className="border px-4 py-2">{product.sku}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Category</td>
                                    <td className="border px-4 py-2">{product.category}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Dimensions</td>
                                    <td className="border px-4 py-2">
                                        {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Weight</td>
                                    <td className="border px-4 py-2">{product.weight} g</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Warranty</td>
                                    <td className="border px-4 py-2">{product.warrantyInformation}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Shipping</td>
                                    <td className="border px-4 py-2">{product.shippingInformation}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Availability</td>
                                    <td className="border px-4 py-2">{product.availabilityStatus}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Return Policy</td>
                                    <td className="border px-4 py-2">{product.returnPolicy}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>


                    <div className="mt-8 flex gap-4">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-16"
                        />
                        <button
                            className="border-4 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Prompt for add to cart */}
            {showPrompt && (
                <div className="fixed top-16 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-500">
                    Added to cart!
                </div>
            )}
            {/* Product Reviews */}
            <div id="reviews" className="mt-16">
                <h2 className="text-3xl font-bold text-primary mb-4">Customer Reviews</h2>
                {product.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="p-4 border rounded-lg shadow-sm">
                                <div className="flex items-center mb-2">
                                    <span className="text-yellow-500">
                                        {Array(review.rating).fill('⭐')}
                                    </span>
                                    <span className="ml-2 text-gray-600">by {review.reviewerName}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                                <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
