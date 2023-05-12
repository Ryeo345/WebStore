import React, { useState, useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Nutrition from './Nutrition';
import {addToCart} from '../../store';

const Item = () => {
    const { products } = useSelector(state => state);
    const { id } = useParams();
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();


    const product = products.find(product => product.id === id);

    useEffect(() => {
        if(product){
            setName(product.name);
            setImg(product.image);
            setPrice(product.price);
        }
    }, []);

    if(!product){
        return null;
    }

    const countDec = () => {
        if(count > 0){
            setCount(prevCount => prevCount - 1)
        }
    }

    const countInc = () => {
        if(count < 20){
            setCount(prevCount => prevCount + 1)
        }
    }

    return(
        <div id='detail-content'>
            <div id='detail-outer-body'>
                <div id='detail-inner-body'>
                    <div id='detail-namePrice-container'>
                        <div id='detail-name'>
                                { product.name } {product.category === 'Pizza' ? '(8 Slices)' : ''}
                        </div>
                        <div id='detail-price'>
                                ${ product.price }
                        </div>
                    </div>
                    <div id='detail-container'>
                        <div id='detail-img-container'>
                                <img src={ product.image }/>
                        </div>
                        <div id='nutrition-container'>
                            <div id='detail-nutrition'>
                                <Nutrition />
                            </div>
                        </div>
                    </div>
                    <div id='detail-add-container'>
                        <div id='counter-container'>
                            <span id='counter-dec'>
                                <button className='count-button' onClick={ countDec }>
                                    -
                                </button>
                            </span>
                            <span id='counter'>
                                { count }
                            </span>
                            <span id='counter-inc'>
                                <button className='count-button' onClick={ countInc }>
                                    +
                                </button>
                            </span>
                        </div>
                        <div id='detail-add'>
                            <Link>
                                <button onClick ={() => dispatch(addToCart(product, count))} id='add-button'>Add to Order</button>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;