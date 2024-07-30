import React from 'react';
import { FaMagic, FaGem, FaGlobeAsia } from 'react-icons/fa';

const features = [
    {
        icon: <FaMagic className="text-primary fa-3x" />,
        title: "Trused Products",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab",
    },
    {
        icon: <FaGem className="text-primary fa-3x" />,
        title: "Fast Deleiver",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab",
    },
    {
        icon: <FaGlobeAsia className="text-primary fa-3x" />,
        title: "30-days Guarantee",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab",
    },
];


const Landing = () => {
    return (
        <>
            <div className="bg-gray-100 py-16 mt-16 h-[500px] flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Hi There</h1>
                    <p className="text-lg text-gray-600 mt-4">
                        We are TrendyCart - The Super Creative Online Ecommerce
                    </p>
                </div>
            </div>
            <div className="container mx-auto py-16 lg:px-16 px-8 bg-white">
                <div className="grid gap-8 md:grid-cols-3 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-lg">
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Landing;
