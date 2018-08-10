import React from "react";
import _ from "lodash";

import cellNames from "../data/productsCellNames";
import ImageHelper from "../api/ImageHelper";
import PaymentInfo from "./PaymentInfo";
import CategoryText from "./categoryText";
import ProductDetailsImages from "./ProductDetailsImages";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: ImageHelper.getAllImages(props.product, true),
      activeImage: ImageHelper.getAllImages(props.product, true)[0]
    };
  }

  setActiveImage(imagePath) {
    this.setState({ activeImage: imagePath });
  }

  render() {
    const { product } = this.props;
    const emailSubject = encodeURIComponent(
      "cintamani-buddhas.de: Kaufanfrage"
    );
    const emailStartText =
      "Ich interessiere mich für den folgenden Artikel: \r\n";
    const articleInfoLine =
      "Artikelnummer: " +
      product[cellNames.ID] +
      " Name: " +
      product[cellNames.Name] +
      " Preis: " +
      product[cellNames.Price];

    const emailEndText =
      "Bitte geben Sie nachfolgend ihre Kontaktinformationen und ihre Adressdaten ein:";
    const emailBody = encodeURIComponent(
      emailStartText + articleInfoLine + "\r\n \r\n \r\n" + emailEndText
    );
    const sendToLink = `mailto:christianoesterle@gmx.de?subject=${emailSubject}&body=${emailBody}`;

    return (
      <div className="container">
      <div className="section">
        <h1 className="title has-text-centered"> {product[cellNames.Name]} </h1>
        <div className="columns is-multiline">
          <div className="column is-half-tablet is-full-mobile">
            <div id="mainImage">
              <img
                className="img img-responsive"
                src={this.state.activeImage}
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>

          <div className="column is-half-tablet is-full-mobile">
            <div className="content" style={{ padding: "10px" }}>
              <p className="info" style={{ fontWeight: "bold" }}>
                Kategorie: {product[cellNames.Category]}
              </p>
              <CategoryText name={this.props.category} />
    
              <h4> Beschreibung </h4>
              <p>
                <em> {product[cellNames.Description]} </em>
              </p>
              <p className="info"> Anzahl: {product[cellNames.Quantity]}</p>
              <p className="price">Preis : {product[cellNames.Price]} </p>
              <p className="text-center">
                <button type="submit" className="button is-rounded is-info is-outlined">
                  <a href={sendToLink}>
                    <i className="fa fa-shopping-cart" /> Artikel anfragen
                  </a>
                </button>
              </p>
            </div>
            <div className="section">
              <ProductDetailsImages
                images={this.state.images}
                setActiveImage={this.setActiveImage.bind(this)}
              />
              <PaymentInfo />
            </div>
          </div>
        </div>
      </div>
      </div>

    );
  }
}

export default ProductDetails;
