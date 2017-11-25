import React from 'react'
import Link from 'next/link'


const CategoriesList = ({ categories }) => {
    if (!categories) return (<div> Please import categories </div>);
    return (
        <ul>
            {categories.map((mainCategory) =>
                <li key={"categoriesList_" + mainCategory.name}>
                    {mainCategory.name}
                    <ul> {mainCategory.subCategories.map((sideCategory) =>

                        <Link 
                        key={"categoriesList_" + mainCategory.name + "_" + sideCategory} 
                        as={`/${mainCategory.name}/${sideCategory}`} 
                        href={`/category?main=${mainCategory.name}&side=${sideCategory}`}>
                            <a>
                                <li>
                                    {sideCategory} </li>

                            </a>
                        </Link>)}
                    </ul>
                </li>
            )}
        </ul>
    )
}

export default CategoriesList;