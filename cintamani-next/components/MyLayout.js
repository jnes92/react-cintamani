import React from 'react'
import CategoriesList from './CategoriesList'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Head from 'next/head'

const layoutStyle = {
  height: "100vh",
  padding: "0",
}

const Layout = (props) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    {/* Overwrite User-Agent-Stylesheet */}
    <style jsx global>{`
      body { 
        margin:0 ; 
        overflow: hidden
      }
    `}</style>

    <Grid fluid style={layoutStyle}>
      <Row style={{height: "100vh"}}>
        {/* <Col xs={0} md={3} lg={2}>
          <CategoriesList categories={props.categories} />
        </Col> */}
        <Col xs={12} md={9} lg={10}>
          {props.children}
        </Col>
      </Row>
    </Grid>
  </div>
)

export default Layout