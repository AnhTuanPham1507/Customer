import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {wareHouseAPI, categoryAPI} from '../api/api';

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Carousel from '../components/Carousel'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'

import banner from '../assets/images/banner.png'

const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await wareHouseAPI.getAll();
                if(response.status === 200) {
                    const products = response.data
                    setProducts(products)
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    },[])

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

    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            {/* <Carousel /> */}
            <HeroSlider
                data={heroSliderData}
                control={true}
                auto={false}
                timeOut={5000}
            />
            {/* end hero slider */}

            {/* policy section */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => <Link key={index} to="/policy">
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>)
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end policy section */}
            <Section>
                <SectionTitle>
                    Danh mục sản phẩm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={8}
                        mdCol={4}
                        smCol={4}
                        gap={20}
                    >
                        {
                            categories.map((item) => (
                                <Link to={`/category/${item._id}`}>
                                    <CategoryCard
                                        key={item._id}
                                        item={item}
                                />
                                </Link>
                                
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* best selling section */}
            <Section>
                <SectionTitle>
                    Sản phẩm 
                </SectionTitle>
                
                <SectionBody>
                    <Grid
                        col={5}
                        mdCol={3}
                        smCol={2}
                        gap={20}
                    >
                        {
                            products.map((item) => (
                                <ProductCard
                                    key={item._id}
                                    item={item}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end best selling section */}

            {/* new arrival section */}
                        
            {/* end new arrival section */}
            
            {/* banner */}
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" />
                    </Link>
                </SectionBody>
            </Section>
            {/* end banner */}

            {/* popular product section */}
            <Section>
                <SectionTitle>
                    phổ biến
                </SectionTitle>
            </Section>
            {/* end popular product section */}
        </Helmet>
    )
}

export default Home
