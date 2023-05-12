import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Nutrition = () => {
    const { products } = useSelector(state => state);

    const { id } = useParams();
    const product = products.find(product => product.id === id);

    console.log(product.totalCal);

    return(
        <div id='nutrition-outer-container'>

                    <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Total Calories:
                        </div>
                        <div className='nutrition-value'>
                            { product.totalCal }
                        </div>
                    </div>
                    {product.category === 'Drinks' ? '' : <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Calories from Fat:
                        </div>
                        <div className='nutrition-value'>
                            { product.calFat }
                        </div>
                    </div>}
                    {product.category === 'Drinks' ? '' : <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Total Fat:
                        </div>
                        <div className='nutrition-value'>
                            { product.totalFat } g
                        </div>
                    </div>}
                    {product.category === 'Drinks' ? '' : <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Saturated Fat:
                        </div>
                        <div className='nutrition-value'>
                            { product.satFat } g
                        </div>
                    </div>}
                    {product.category === 'Drinks' ? '' : <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Trans Fat:
                        </div>
                        <div className='nutrition-value'>
                            { product.transFat } g
                        </div>
                    </div>}
                    {product.category === 'Drinks' ? '' : <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Cholesterol:
                        </div>
                        <div className='nutrition-value'>
                            { product.cholesterol } mg
                        </div>
                    </div>}
                    <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Sodium:
                        </div>
                        <div className='nutrition-value'>
                            { product.sodium } mg
                        </div>
                    </div>
                    <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Total Carbs:
                        </div>
                        <div className='nutrition-value'>
                            { product.totalCarbs } g
                        </div>
                    </div>
                    {product.category === 'Drinks' ? '' : <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Dietary Fiber:
                        </div>
                        <div className='nutrition-value'>
                            { product.fiber } g
                        </div>
                    </div>}
                    <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Sugars:
                        </div>
                        <div className='nutrition-value'>
                            { product.sugars } g
                        </div>
                    </div>
                    {product.category === 'Drinks' ? '' : <div className='nutrition-list-item'>
                        <div className='nutrition-title'>
                            Protein:
                        </div>
                        <div className='nutrition-value'>
                            { product.protein } g
                        </div>
                    </div>}
        </div>
    )
}

export default Nutrition;