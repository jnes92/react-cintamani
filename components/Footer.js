import React from 'react'
import Link from 'next/link'

const Footer = (props) => {
    const { staticTexts } = props;
    if (!staticTexts) return (<div>  </div>);
    return (
        <footer className="footer is-dark">
            <div className="content has-text-centered">

                <div className="columns">
                    <div className="column">
                        <i style={{ color: '#777' }} className="fa fa-home" aria-hidden="true"></i>
                        <span style={{ color: "#777" }}>  Bornstraße 37 <br /> 56379 Singhofen</span> <br />
                        <i style={{ color: '#777' }} className="fa fa-phone" aria-hidden="true"></i>
                        <span style={{ color: "#777" }}> (+49) 2604 8443</span> <br />
                        <i style={{ color: '#777' }} className="fa fa-envelope" aria-hidden="true"></i>
                        <a style={{ textDecoration: 'none' }} href="mailto:christianoesterle@gmx.de"> 
                        <span style={{ color: "#777" }}> christianoesterle@gmx.de</span> </a>
                    </div>

                    <ul style={{ padding: "0", listStyle: "none" }} className="column">
                        {staticTexts ?
                            staticTexts.map((staticTextElement) => (
                                <li key={staticTextElement.path}>
                                    <Link
                                        key={"categoriesList_static" + staticTextElement.title}
                                        as={`/info/${staticTextElement.path}`}
                                        href={`/info?title=${staticTextElement.path}`}>
                                                 
                                        <a style={{ textDecoration: "none", color: "#aeb2b7" }}>
                                            {staticTextElement.title}
                                        </a>
                                    </Link>
                                </li>
                            )) : null
                        }
                    </ul>
                </div>
                <span style={{ color: "#777" }}> ©Copyright {new Date().getFullYear()} Cintamani. </span>

            </div>
        </footer>

    )
}


export default Footer;