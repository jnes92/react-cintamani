import React from 'react'

const ArticleItem = ({ article }) => {
  return (
    <li>
      {/* <Link as={`/p/${article.sku}`} href={`/article?title=${article.name}`}> */}
      {/* <a> */}
      <p>
        <span> ID: {article.ID} </span>
        <br />
        <span> Name: {article.Name} </span>
        <br />

        <span> Preis: {article.Price} </span>
        <br />

        <span> Menge: {article.Quantity} </span>
        <br />

        <span> Images: {article.Images} </span>
        <br />

      </p>
      {/* </a> */}
      {/* </Link> */}
    </li>
  )
}

export default ArticleItem;