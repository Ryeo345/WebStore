import React from 'react';
import CategoriesSubMenu from '../CategoriesSubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {addToCart} from '../../store';


const Sides = () => {
     const dispatch = useDispatch();
    const { products } = useSelector(state => state);

    const sides = products.filter(product => product.category === 'Sides')

    return(
        <div>
            <CategoriesSubMenu />
            <div id='content-outer-body'>
                <div id='content-container'>
                    { sides.map(side => {
                        return(

                                <div className='product-container' key={ side.id }>
                                    <div onClick={() => {dispatch(addToCart(side, Number(1)))}} className='product-add-title'>
                                        <Link>
                                            Add to Order 
                                            <i id='product-add-cart' className="fa-solid fa-cart-plus fa-xs"></i>
                                        </Link>
                                    </div>
                                    <div className='product-img-container'>
                                        <Link to={`/products/${side.id}`} title='View Product Detail'>
                                            <img className='product-img' src={ side.image }/>
                                        </Link>
                                    </div>
                                    <div className='product-name-container'>
                                    <div className='product-name'>
                                            <Link to={`/products/${side.id}`}>
                                                { side.name }
                                            </Link>
                                        </div>
                                        <div className='product-price'>
                                            ${ side.price }
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

export default Sides;