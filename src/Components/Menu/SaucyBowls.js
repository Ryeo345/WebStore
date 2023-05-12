import React from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addToCart} from '../../store';

const SaucyBowls = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);

    const saucyBowls = products.filter(product => product.category === 'Saucy Bowls')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { saucyBowls.map(saucyBowl => {
                        return(

                                <div className='product-container' key={ saucyBowl.id }>
                                    <div  onClick={() => {dispatch(addToCart(saucyBowl, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${saucyBowl.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ saucyBowl.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                    <div className='product-name'>
                                            <Link to={`/products/${saucyBowl.id}`}>
                                                { saucyBowl.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ saucyBowl.price }
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

export default SaucyBowls;