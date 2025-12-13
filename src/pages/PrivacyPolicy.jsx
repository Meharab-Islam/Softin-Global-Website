import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import './DetailPage.css';

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Privacy Policy - Softin Global';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="detail-page-wrapper">
            <ThreeScene />
            <main className="main-content">
                <section className="detail-page">
                    <div className="container">
                        <button
                            onClick={() => navigate('/')}
                            className="back-button"
                        >
                            ← Back to Home
                        </button>
                        <div className="glass-container">
                            <div className="detail-header">
                                <h1>Privacy Policy</h1>
                                <div className="meta">
                                    <span>Last Updated: December 2024</span>
                                </div>
                            </div>
                            <div className="detail-content">
                                <h2>1. Introduction</h2>
                                <p>
                                    Welcome to Softin Global. We respect your privacy and are committed to protecting your personal data.
                                    This privacy policy will inform you as to how we look after your personal data when you visit our website
                                    and tell you about your privacy rights and how the law protects you.
                                </p>

                                <h2>2. Data We Collect</h2>
                                <p>
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                                </p>
                                <ul>
                                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                    <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                                </ul>

                                <h2>3. How We Use Your Data</h2>
                                <p>
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                </p>
                                <ul>
                                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                    <li>Where we need to comply with a legal or regulatory obligation.</li>
                                </ul>

                                <h2>4. Data Security</h2>
                                <p>
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                                </p>

                                <h2>5. Contact Us</h2>
                                <p>
                                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
                                    <br />
                                    <strong>Email:</strong> info@softinglobal.com
                                    <br />
                                    <strong>Phone:</strong> +880 1837387206
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
