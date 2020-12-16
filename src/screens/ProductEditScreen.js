import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [catagory, setCatagory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productUpdate = useSelector((state) => state.productUpdate);
    const {loading: loadingUpdate,error: errorUpdate,success: successUpdate,} = productUpdate;

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product} = productDetails;

    useEffect(() => {
            if (successUpdate) {
                props.history.push('/productlist');
            }
            if (!product || product._id !== productId || successUpdate) {
                dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
            } else {
                setName(product.name);
                setAddress(product.address);
                setImage(product.image);
                setCatagory(product.catagory);
                setCountInStock(product.countInStock);
                setBrand(product.brand);
                setDescription(product.description);
            }
    }, [product, dispatch, productId,successUpdate, props.history]);

    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
    updateProduct({
        _id: productId,
        name,
        address,
        image,
        catagory,
        brand,
        countInStock,
        description,
    })
    );
    };

    return (
            <div>
        <form className="form signin" onSubmit={submitHandler}>
            <div>
            <h1>Edit Product {productId}</h1>
            </div>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <>
                <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                </div>
                <div>
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></input>
                </div>
                <div>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="text"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                ></input>
                </div>
                <div>
                <label htmlFor="catagory">Category</label>
                <input
                    id="catagory"
                    type="text"
                    placeholder="Enter category"
                    value={catagory}
                    onChange={(e) => setCatagory(e.target.value)}
                ></input>
                </div>
                <div>
                <label htmlFor="brand">Brand</label>
                <input
                    id="brand"
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                ></input>
                </div>
                <div>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                    id="countInStock"
                    type="number"
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                ></input>
                </div>
                <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    rows="3"
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                </div>
                <div>
                <label></label>
                <button className="primary" type="submit">
                    Update
                </button>
                </div>
            </>
            )}
        </form>
        </div>
    )
}
