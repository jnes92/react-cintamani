import React from 'react'
import Header from './Header'
import CategoriesList from './CategoriesList'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    <CategoriesList categories={props.categories} />
    {props.children}
  </div>
)

export default Layout