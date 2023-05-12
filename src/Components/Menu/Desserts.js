import React from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addToCart} from '../../store';


const Desserts = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);

    const desserts = products.filter(product => product.category === 'Desserts')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { desserts.map(dessert => {
                        return(

                                <div className='product-container' key={ dessert.id }>
                                    <div  onClick={() => {dispatch(addToCart(dessert, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${dessert.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ dessert.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                    <div className='product-name'>
                                            <Link to={`/products/${dessert.id}`}>
                                                { dessert.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ dessert.price }
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

export default Desserts;