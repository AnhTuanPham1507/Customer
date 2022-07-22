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
                const categories = response.data
                setCategories(categories)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getCategories()
    },[])



    useEffect(() => {
        async function getBrands() {
            try {
                const response = await brandAPI.getAll();
                const brands = response.data
                setBrands(brands)
            } catch (error) {
                alert(error.response.data.message)
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
            } catch(error) {} 
        },
        [filter]
    )

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')



    useEffect(() => {
        async function getProducts() {
            try {
                const response = await wareHouseAPI.getByCategoryId(id);
                setProducts(response.data)
            } catch (error) {
                alert(error.response.data.message)
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
                    <InfinityList
                        products={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catogory
