import React from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addToCart} from '../../store';


const Pizza = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);

    const pizzas = products.filter(product => product.category === 'Pizza')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { pizzas.map(pizza => {
                        return(

                                <div className='product-container' key={ pizza.id }>
                                    <div  onClick={() => {dispatch(addToCart(pizza, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${pizza.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ pizza.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                        <div className='product-name'>
                                            <Link to={`/products/${pizza.id}`}>
                                                { pizza.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ pizza.price }
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

export default Pizza;