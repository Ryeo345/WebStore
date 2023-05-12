import React from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addToCart} from '../../store';


const Saucydias = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state);

    const saucydias = products.filter(product => product.category === 'Saucydias')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { saucydias.map(saucydia => {
                        return(

                                <div className='product-container' key={ saucydia.id }>
                                    <div  onClick={() => {dispatch(addToCart(saucydia, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${saucydia.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ saucydia.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                    <div className='product-name'>
                                            <Link to={`/products/${saucydia.id}`}>
                                                { saucydia.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ saucydia.price }
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

export default Saucydias;