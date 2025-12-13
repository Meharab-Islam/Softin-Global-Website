import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import './DetailPage.css';

export default function TermsOfService() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Terms of Service - Softin Global';
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
                                <h1>Terms of Service</h1>
                                <div className="meta">
                                    <span>Last Updated: December 2024</span>
                                </div>
                            </div>
                            <div className="detail-content">
                                <h2>1. Agreement to Terms</h2>
                                <p>
                                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Softin Global ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                                </p>

                                <h2>2. Intellectual Property Rights</h2>
                                <p>
                                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                                </p>

                                <h2>3. User Representations</h2>
                                <p>
                                    By using the Site, you represent and warrant that:
                                </p>
                                <ul>
                                    <li>All registration information you submit will be true, accurate, current, and complete.</li>
                                    <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                                    <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                                    <li>You are not a minor in the jurisdiction in which you reside.</li>
                                </ul>

                                <h2>4. Prohibited Activities</h2>
                                <p>
                                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                                </p>

                                <h2>5. Limitation of Liability</h2>
                                <p>
                                    In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                                </p>

                                <h2>6. Contact Us</h2>
                                <p>
                                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
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
