import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import {brandAPI, categoryAPI, wareHouseAPI} from '../api/api';
import CheckBox from '../components/CheckBox';
import Helmet from '../components/Helmet'
import InfinityList from '../components/InfinityList'
import ListProduct from '../components/ListProduct';



const Catogory = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([])

    const [categories, setCategories] = useState([])

    const initFilter = {
        brands: []
    }

    const [productFilter, setProductFilter]= useState([])

    const [filter, setFilter] = useState(initFilter)

    const [brands, setBrands] = useState([])

    

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
        async function getBrands() {
            try {
                const response = await brandAPI.getAll();
                if(response.status === 200) {
                    const brands = response.data
                    setBrands(brands)
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBrands()
    },[])

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "BRAND":
                    setFilter({...filter, brands: [...filter.brands, item._id]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "BRAND":
                        const newBrand = filter.brands.filter(e => e !== item._id)
                        setFilter({...filter, brands: newBrand})
                        break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    useEffect(
        () => {
            try {
                let temp = [...products]

                if (filter.brands.length > 0) {
                    temp = temp.filter(e => filter.brands.includes(e.product.brand))
                }
                setProductFilter(temp)
            } catch(err) {} 
        },
        [filter]
    )

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')



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
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Hãng
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                brands.map((item) => (
                                    <div key={item._id} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterSelect("BRAND", input.checked, item)}
                                            checked={filter.brands.includes(item._id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <ListProduct
                        products={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catogory
