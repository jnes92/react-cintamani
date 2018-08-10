import React, { Component } from 'react';
import Link from 'next/link'
import classnames from 'classnames';

const NavigationDropdownMenuEntry = ({ name, subMenus }) => {
    return (
        <div className="navbar-item has-dropdown is-hoverable" key={"menu_" + name}>
            <div className="navbar-link">
                {name}
            </div>
            <div className="navbar-dropdown ">
                {subMenus.map(subMenu => subMenu)}
            </div>
        </div>
    )
};

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false
        }
    }
    createMenuItems() {
        const { categories} = this.props;

        return categories.map(mainCategory => {
            if (mainCategory.subCategories) {
                let subMenus = this.createNavBarItems(mainCategory);
                return <NavigationDropdownMenuEntry
                    key={"main_" + mainCategory.name}
                    name={mainCategory.name}
                    subMenus={subMenus} />
            }
            else return this.createNavBarItem(mainCategory);
        })

    }

    createNavBarItems(mainCategory) {
        return mainCategory.subCategories.map(item => this.createNavBarItem(item, mainCategory.name));
    }

    createNavBarItem(item, parent = null) {
        if (parent) return (
            <Link
                key={"categoriesList_" + parent + "_" + item}
                as={`/${parent}/${item}`}
                href={`/category?main=${parent}&side=${item}`}>
                <a className="navbar-item">
                    {item}
                </a>
            </Link>
        );
        return (
            <Link
                key={"categoriesList_" + item}
                as={`/${item.name}`}
                href={`/category?main=${item.name}`}>
                <a className="navbar-item" key={item.name}>
                    {item.name}
                </a>
            </Link>)
    }

    toggleMenu = (e) => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    render() {
        return (
            <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">

                <div className="navbar-brand">
                    <Link href={`/`} >
                        <div className="navbar-item" >
                            <img src="/static/images/logo.png" alt="Cintamani-Buddhas.de" width="180px" />
                        </div>
                    </Link>
                    <a onClick={this.toggleMenu} role="button"
                        className={classnames(
                            "navbar-burger",
                            { "is-active": this.state.showMenu }
                        )} aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={classnames(
                    "navbar-menu",
                    { "is-active": this.state.showMenu }
                )}>
                    <div className="navbar-start">
                        {this.createMenuItems()}
                    </div>
                </div>
            </nav>)
    }
}

export default Navigation;