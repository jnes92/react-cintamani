import React from 'react'
import _ from "lodash";
import { Grid, Col, Row } from 'react-styled-flexboxgrid'


import cellNames from "../data/productsCellNames";
import ImageHelper from "../api/ImageHelper";


class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: ImageHelper.getAllImages(props.product,true),
      activeImage: ImageHelper.getAllImages(props.product,true)[0]
    }
  }


  setActiveImage(imagePath) {
    this.setState({ activeImage: imagePath });
  }

  render() {
    const { product } = this.props;
    const displayImageList = this.state.images.map((imgPath) => 
        <Col xs={6} md={4} lg={3} key={"imageGallery"+imgPath}>
          <a onClick={() => this.setActiveImage(imgPath)}>
            <img className="img img-responsive" src={imgPath} style={{ maxWidth: "100%" }} />
          </a>
        </Col>
        );

    return (
      <div>
        <h1> {product[cellNames.Name]} </h1>
        <Row>
          <Col xs={12} md={6}>
            <div id="mainImage">
              <img className="img img-responsive" src={this.state.activeImage} style={{ maxWidth: "100%" }} />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="box" style={{ padding: "10px" }}>

              <form lpformnum="1">
                <p className="info"> Kategorie: {product[cellNames.Category]}</p>

                <h4> Beschreibung </h4>
                <blockquote>
                  <p><em> {product[cellNames.Description]} </em> </p>
                </blockquote>
                <p className="info"> Anzahl: {product[cellNames.Quantity]}</p>


                <p className="price">Preis : {product[cellNames.Price]} </p>

                <p className="text-center">
                  <button type="submit" className="btn btn-template-main"><i className="fa fa-shopping-cart"></i> Artikel anfragen</button>
                </p>
              </form>
            </div>

            <Row>
              {this.state.images.length > 1 ? displayImageList :null}
            </Row>
          </Col>

        </Row>
      </div>
    )
  }
}


export default ProductDetails;