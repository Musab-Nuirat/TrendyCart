import React from 'react'
import { FaYoutube, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    return (
        <div>
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-bold text-gray-700 mb-4">Contact</h2>
                    <p className="text-lg text-gray-600 mb-4">We are here to help</p>
                    <div>
                        <p className="text-gray-600">Feel free to drop us a line at:</p>
                        <a href="mailto:leonagency@mail.com?subject=Contact" className="text-primary underline">
                            TrendyCart@mail.com
                        </a>
                        <div className="social mt-4">
                            <p className="text-gray-700 mb-4">Find Us On Social Networks</p>
                            <div className="flex justify-center space-x-6">
                                <FaYoutube className="text-red-600" />
                                <FaFacebookF className="text-blue-600" />
                                <FaTwitter className="text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact