import '../assets/sass/footer.scss'
import React from 'react'

export default () => {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">
                            Asian Classics Explorer (ACE)
                        </h5>
                        <p className="grey-text text-lighten-4">
                            We travel the globe searching for surviving texts in
                            libraries, monasteries and private collections. We
                            then catalogue their location and contents; scan
                            digital images of them; and manually key them,
                            creating e-text at the data entry centers that we’ve
                            established throughout Asia. These digitized
                            materials are then made available, free of charge,
                            to scholars, translators, teachers, and
                            practitioners worldwide.
                        </p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Information</h5>
                        <ul>
                            <li>
                                <a
                                    className="grey-text text-lighten-3 footer-link"
                                    href="http://asianclassics.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ACIP Website
                                </a>
                            </li>
                            <li>
                                <a
                                    className="grey-text text-lighten-3 footer-link"
                                    href="http://nlm.asianclassics.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Browse the National Library of Mongolia
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2018 Asian Classics Input Project
                    <a className="grey-text text-lighten-4 right" href="#!">
                        More Links
                    </a>
                </div>
            </div>
        </footer>
    )
}
