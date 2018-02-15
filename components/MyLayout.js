import React from 'react'
import CategoriesList from './CategoriesList'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import Head from 'next/head'

import main from "../styles/main.scss"
import normalize from "../styles/normalize.css"
import menuStyle from "../styles/menu.scss";


const Layout = (props) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <script src="https://use.fontawesome.com/7e6f9ff058.js"></script>
        <style global="true">
          {`
    ${main}
    ${normalize} ${menuStyle}
    `}
        </style>
      </Head>
      <Grid fluid className='main-grid'>
        <Row>
          <Col xs={0} md={3} lg={2} className="no-padding">
            <CategoriesList categories={props.categories} staticTexts={props.staticTexts} />
          </Col>
          <Col xs={12} md={9} lg={10} className="no-padding">
            {props.children}
          </Col>
        </Row>
      </Grid>

    </div>
  )
}

export default Layout