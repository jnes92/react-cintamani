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
                <div id="leftside-navigation" className="nano">
                    <ul className="nano-content">
                        <li>
                            <Link href={`/`}>
                                <a><i className="fa fa-home"></i><span>Home</span> </a>
                            </Link>
                        </li>

                        {categories.map((mainCategory) => {
                            const menuStyle = (this.state.activeMain === mainCategory.name) ? "sub-menu active" : "sub-menu";
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
                            )
                        })}
                    </ul>
                </div>
                <div style={{ textAlign: "center", marginTop: "auto" }}>
                    Static Pages:
                    <ul>
                        {staticTexts ?
                            staticTexts.map((staticTextElement) => (
                                <Link
                                    key={"categoriesList_static" + staticTextElement.title}
                                    as={`/static/${staticTextElement.title}`}
                                    href={`/static?title=${staticTextElement.title}`}>
                                    <a style={{textDecoration: "none", color: "black"}}>
                                        <li> {staticTextElement.title}</li>
                                    </a>
                                </Link>
                            )) : console.log(this.props)
                        }
                    </ul>
                </div>
            </aside>
        )
    }
}

export default CategoriesList;