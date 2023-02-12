import React, {useState} from 'react';
import {useGetProductsQuery} from "../../state/api";
import Header from 'components/Header'
import Product from "../../components/Product";
import {
    Box, Card,
    CardActions, CardContent,
    Collapse, Button,
    Typography, Rating,
    useTheme, useMediaQuery
} from '@mui/material';
const Products = () => {
    const {data: products, isLoading} = useGetProductsQuery();
    const isNonMobile = useMediaQuery('(min-width: 1000px)');

    return (
        <Box m='1.5rem 2.5rem' >
            <Header title='Products' subTitle='See your list of products.' />
            {
                products || !isLoading ? (
                    <Box
                        mt='20px'
                        display='grid'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        justifiycontent='space-between'
                        rowGap='20px'
                        columnGap='1.33%'
                        sx={{
                            '& > div': {gridColumn: isNonMobile ? undefined : 'span 4'}
                        }}
                    >
                        {products && products.map(({_id, name, description, price, rating, category, supply, stat})=>(
                            <Product
                                key={_id}
                                _id={_id}
                                category={category}
                                description={description}
                                name={name}
                                price={price}
                                rating={rating}
                                stat={stat}
                                supply={supply}
                            />
                        ))}
                    </Box>
                ): (
                    // TODO Add A fancy loader or a spinner
                    <>Loading....</>
                )
            }
        </Box>
    )
}

export default Products;