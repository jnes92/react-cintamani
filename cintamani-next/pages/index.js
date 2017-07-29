import Layout from '../components/MyLayout.js'
import Link from 'next/link'

import products from '../data/products/products-test.json';

import ArticleItem from '../components/Articles/ArticleItem';



export default () => (
    <Layout>
        <h1>My Shop</h1>
        <ul>
            {products.map((article, index) => (
                <ArticleItem article={article} />
            ))}
        </ul>
        <style jsx>{`
   
    `}</style>
    </Layout>
)