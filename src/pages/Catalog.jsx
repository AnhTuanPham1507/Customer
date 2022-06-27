import React, { useState, useEffect, useRef } from 'react'

import {brandAPI, categoryAPI, wareHouseAPI} from '../api/api';
import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import useQuery from '../hooks/useQuery';


const Catalog = () => {
    const searchTerm = useQuery().get('searchTerm')

    const initFilter = {
        categories: [],
        brands: []
    }

    const [products, setProducts] = useState([])

    const [productFilter, setProductFilter]= useState([])

    const [filter, setFilter] = useState(initFilter)

    const [categories, setCategories] = useState([])

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
        async function getProducts() {
            try {
                const response = await wareHouseAPI.search(searchTerm);
                if(response.status === 200) {
                    console.log(response.data)
                    setProducts(response.data)
                    setProductFilter(response.data)
                } else {
                    console.log(response)
                }
            } catch(err) {
                console.log(err)
            }           
        }
        getProducts()
    },[searchTerm])

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
                case "CATEGORY":
                    setFilter({...filter, categories: [...filter.categories, item._id]})
                    break
                    case "BRAND":
                        setFilter({...filter, brands: [...filter.brands, item._id]})
                        break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.categories.filter(e => e !== item._id)
                    setFilter({...filter, categories: newCategory})
                    break
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

                if (filter.categories.length > 0) {
                    temp = temp.filter(e => filter.categories.includes(e.product.category))
                }
    
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

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                categories.map((item) => (
                                    <div key={item._id} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.categories.includes(item._id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
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
                        products={productFilter}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
