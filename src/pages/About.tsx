import React from 'react';
import '../css/About.css';

const About: React.FC = () => {
        return (
                <div className="about-page">
                        <h1>About Us</h1>
                        <p>
                                Welcome to our e-commerce website. We are committed to providing the best products and services to our customers.
                                Our team works hard to ensure that you have a great shopping experience.
                        </p>
                        <p>
                                If you have any questions or feedback, feel free to contact us. We value your input and strive to continuously improve.
                        </p>
                        <p>
                                Email: <a href="mailto:bugrahanumaysafak@gmail.com">bugrahanumaysafak@gmail.com</a>
                        </p>
                        <p>
                                Phone: <a href="tel:+905432041420">+90 543 204 14 20</a>
                        </p>
                </div>
        );
}

export default About;
