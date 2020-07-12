import React from 'react'
import ReactMarkdown from "react-markdown";

export default ({ content }) => {
    return (
        <div className="container">
            <div className="content">
                <ReactMarkdown source={content} />
            </div>
        </div>
    )
}