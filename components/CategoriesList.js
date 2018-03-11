import React from 'react'
import Link from 'next/link'



class CategoriesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMain: "home",
            activeSub: ""
        };
    }

    expandItem = (activatedMenu, activatedSubMenu) => {
        this.setState({
            activeMain: activatedMenu,
            activeSub: activatedSubMenu
        })
    }

    render() {
        const { categories, staticTexts } = this.props;
        if (!categories) return (<div> Please import categories </div>);
        return (
            <aside className="sidebar" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <div id="logo">
                    <img style={{ width: '75%', padding: '25px' }} src="/static/images/logo.png" />
                </div>
                <div id="leftside-navigation" className="nano">
                    <ul className="nano-content">
                        <li>
                            <Link href={`/`}>
                                <a><i className="fa fa-home"></i><span>Home</span> </a>
                            </Link>
                        </li>

                        {categories.map((mainCategory) => {
                            const menuStyle = (this.state.activeMain === mainCategory.name) ? "sub-menu active" : "sub-menu";

                            if (mainCategory.subCategories)
                                return (
                                    <li className={menuStyle} key={"categoriesList_" + mainCategory.name}>

                                        <a onClick={() => this.expandItem(mainCategory.name)}>
                                            {/* <i className="fa fa-cogs"></i> */}
                                            <span> {mainCategory.name}</span><i className="arrow fa fa-angle-right pull-right"></i>
                                        </a>
                                        <ul> {mainCategory.subCategories.map((sideCategory) => {
                                            const menuStyle = (this.state.activeSub === sideCategory.name) ? "active" : "";
                                            return (
                                                <Link
                                                    key={"categoriesList_" + mainCategory.name + "_" + sideCategory}
                                                    as={`/${mainCategory.name}/${sideCategory}`}
                                                    href={`/category?main=${mainCategory.name}&side=${sideCategory}`}>
                                                    <a>
                                                        <li className={menuStyle}> {sideCategory} </li>
                                                    </a>
                                                </Link>
                                            )
                                        })}

                                        </ul>
                                    </li>
                                );
                            else return (
                                <li className={menuStyle} key={"categoriesList_" + mainCategory.name}>
                                    <Link
                                        key={"categoriesList_" + mainCategory.name}
                                        as={`/${mainCategory.name}`}
                                        href={`/category?main=${mainCategory.name}`}>
                                        <a>
                                            {/* <i className="fa fa-cogs"></i> */}
                                            <span> {mainCategory.name}</span>
                                        </a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div style={{ textAlign: "center", marginTop: "auto", marginBottom: "15px", fontSize: "12px" }}>
                    <div style={{ flex: "auto", flexDirection: "column", justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ flex: 'auto', flexDirection: 'row', justifyContent: 'flex-start' }} >
                                <i style={{ color: '#777' }} className="fa fa-home" aria-hidden="true"></i>
                                <span style={{ color: "#777" }}>  Bornstraße 37 <br /> 56379 Singhofen</span>
                            </div>
                            <div style={{ flex: 'auto', flexDirection: 'row', justifyContent: 'flex-start' }} >
                                <i style={{ color: '#777' }} className="fa fa-phone" aria-hidden="true"></i>
                                <span style={{ color: "#777" }}> (+49) 2604 8443</span>
                            </div>
                            <div style={{ flex: 'auto', flexDirection: 'row', justifyContent: 'flex-start' }} >
                                <i style={{ color: '#777' }} className="fa fa-envelope" aria-hidden="true"></i>
                                <a style={{ textDecoration: 'none' }} href="mailto:christianoesterle@gmx.de"> <span style={{ color: "#777" }}> christianoesterle@gmx.de</span> </a>
                            </div>
                        </div>

                        <ul style={{ padding: "0", listStyle: "none" }}>
                            {staticTexts ?
                                staticTexts.map((staticTextElement) => (
                                    <li>
                                        <Link
                                            key={"categoriesList_static" + staticTextElement.title}
                                            as={`/${staticTextElement.path}`}
                                            href={`/${staticTextElement.path}`}>
                                            <a style={{ textDecoration: "none", color: "#aeb2b7" }}>
                                                {staticTextElement.title}
                                            </a>
                                        </Link>
                                    </li>
                                )) : null
                            }
                        </ul>


                        <span style={{ color: "#777" }}> ©Copyright {new Date().getFullYear()} Cintamani. </span>
                    </div>
                </div>
            </aside>
        )
    }
}

export default CategoriesList;