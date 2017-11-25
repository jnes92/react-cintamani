import React from 'react'
import CategoriesList from './CategoriesList'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Head from 'next/head'

import main from "../styles/main.css"
import normalize from "../styles/normalize.css"

const Layout = (props) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <Grid fluid className='main-grid'>
      <Row style={{ height: "100vh" }}>
        <Col xs={0} md={3} lg={2}>
          <CategoriesList categories={props.categories} />
        </Col>
        <Col xs={12} md={9} lg={10}>
          {props.children}
        </Col>
      </Row>
    </Grid>

    <style global="true">
      {`
    ${main}
    ${normalize}
    `}
    </style>
  </div>
)

export default Layout