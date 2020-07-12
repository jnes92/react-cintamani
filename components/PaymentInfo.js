import React from 'react'
import { connect } from "react-redux";
import StaticPage from "../components/StaticPage";
const paymentPath = "payment"

const PaymentInfo = (text) => (
    <div className="content">
        <StaticPage content={text.content} />
    </div>
)


const mapStateToProps = ({ staticTexts }) => {
    return staticTexts.filter(texts => texts.path == paymentPath)[0]
};

export default connect(mapStateToProps)(PaymentInfo);