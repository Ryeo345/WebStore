import React from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addToCart} from '../../store';


const Wings = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);

    const wings = products.filter(product => product.category === 'Wings')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { wings.map(wing => {
                        return(

                                <div className='product-container' key={ wing.id }>
                                    <div  onClick={() => {dispatch(addToCart(wing, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${wing.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ wing.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                    <div className='product-name'>
                                            <Link to={`/products/${wing.id}`}>
                                                { wing.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ wing.price }
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

export default Wings;