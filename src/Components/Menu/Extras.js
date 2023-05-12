import React from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addToCart} from '../../store';

const Extras = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);

    const extras = products.filter(product => product.category === 'Extras')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { extras.map(extra => {
                        return(

                                <div className='product-container' key={ extra.id }>
                                    <div onClick={() => {dispatch(addToCart(extra, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${extra.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ extra.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                    <div className='product-name'>
                                            <Link to={`/products/${extra.id}`}>
                                                { extra.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ extra.price }
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

export default Extras;