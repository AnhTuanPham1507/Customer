import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import {categoryAPI, wareHouseAPI} from '../api/api';
import Helmet from '../components/Helmet'
import InfinityList from '../components/InfinityList'



const Catogory = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([])

    const [categories, setCategories] = useState([])


    useEffect(() => {
        async function getCategories() {
            try {
                const response = await categoryAPI.getAll();
                if(response.status === 200) {
                    const categories = response.data
                    setCategories(categories)
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    },[])

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await wareHouseAPI.getCategoryById(id);
                if(response.status === 200) {
                    console.log(response.data)
                    setProducts(response.data)
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    },[id])


    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__content">
                    
                    <InfinityList
                        products={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catogory
