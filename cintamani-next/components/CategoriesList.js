import React from 'react'


const CategoriesList = ({ categories }) => {
    return (
        <ul>
            {categories.map((mainCategory) =>
                <li key={"categoriesList_" + mainCategory.name}>
                    {mainCategory.name}
                    <ul> {mainCategory.subCategories.map((sideCategory) =>
                        <li key={"categoriesList_" + mainCategory.name + "_" + sideCategory}>
                            {sideCategory} </li>)}
                    </ul>
                </li>
            )}
        </ul>
    )
}

export default CategoriesList;