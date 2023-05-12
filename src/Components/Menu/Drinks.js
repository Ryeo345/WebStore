import React, {useState} from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {addToCart} from '../../store';


const Drinks = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(state => state);

    const drinks = products.filter(product => product.category === 'Drinks')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { drinks.map(drink => {
                        return(

                                <div className='product-container' key={ drink.id }>
                                    <div onClick={() => {dispatch(addToCart(drink, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${drink.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ drink.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                        <div className='product-name'>
                                            <Link to={`/products/${drink.id}`}>
                                                { drink.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ drink.price }
                                        </div>
                                    </div>
                                </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
}

export default Drinks;