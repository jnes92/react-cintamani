import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import withRedux from 'next-redux-wrapper'

import ReactMarkdown from "react-markdown";

export default ({content}) => {
    return (
        <ReactMarkdown source={content} />
    )
}