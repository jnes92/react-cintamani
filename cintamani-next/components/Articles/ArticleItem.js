const ArticleItem = ({ article }) => {
  console.log(article);
  
  return (
    <li>
      {/* <Link as={`/p/${article.sku}`} href={`/article?title=${article.name}`}> */}
      {/* <a> */}
     <p className="category-header"> {article._category} </p> 
        <p className="article-header"> {article.name} </p>
        <p className="article-description"> {article.description} </p>
      {/* </a> */}
      {/* </Link> */}
      <style jsx>{`
        .category-header{
          
        }

        .article-header{

        }

        .article-description{

        }
    `}</style>
    </li>
  )
}

export default ArticleItem;