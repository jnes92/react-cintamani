import React from 'react'
import _ from "lodash";
import { Grid, Col, Row } from 'react-styled-flexboxgrid'


import cellNames from "../data/productsCellNames";
import ImageHelper from "../api/ImageHelper";


const ProductDetails = ({ product }) => {
  const mainCategory = _.trim(product[cellNames.Category].split("-")[0]);
  const sideCategory = _.trim(product[cellNames.Category].split("-")[1]);

  const firstImage = product[cellNames.Images];

  const imagePath = ImageHelper.getImagePath(mainCategory, sideCategory, firstImage);

  return (
    <div>
      <h1> {product[cellNames.Name]} </h1>
      <Row>
        <Col xs={12} md={6}>
          <div id="mainImage">
            <img className="img img-responsive" src={imagePath} style={{ maxWidth: "100%" }} />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="box" style={{padding: "10px"}}>

            <form lpformnum="1">
              <p className="info"> Kategorie: {product[cellNames.Category]}</p>

              <h4> Beschreibung </h4>
              <blockquote>
                <p><em> {product[cellNames.Description]} </em> </p>
              </blockquote>
              <p className="info"> Anzahl: {product[cellNames.Quantity]}</p>


              <p className="price">Preis : {product[cellNames.Price]} €</p>

              <p className="text-center">
                <button type="submit" className="btn btn-template-main"><i className="fa fa-shopping-cart"></i> Artikel anfragen</button>
              </p>
            </form>
          </div>

          <Row>
            <Col xs={4}>
              <a href="img/detailbig3.jpg" className="thumb active">
                <img className="img img-responsive" src={imagePath} style={{ maxWidth: "100%" }} />
              </a>
            </Col>
            <Col xs={4}>
              <a href="img/detailbig3.jpg" className="thumb active">
                <img className="img img-responsive" src={imagePath} style={{ maxWidth: "100%" }} />
              </a>
            </Col>
            <Col xs={4}>
              <a href="img/detailbig3.jpg" className="thumb active">
                <img className="img img-responsive" src={imagePath} style={{ maxWidth: "100%" }} />
              </a>
            </Col>
          </Row>
        </Col>

      </Row>
    </div>
  )
}

export default ProductDetails;