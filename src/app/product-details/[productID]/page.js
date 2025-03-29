'use client'
import ProductAPIs from '@/utils/ProductAPIs'
import React, { useEffect, useState } from 'react'

const ProductDetails = ({params}) => {

    const[productDetails, setProductDetails] = useState({});
    const resolvedParams = React.use(params)

    const getProductDetails = () => {
        ProductAPIs.getProductById(resolvedParams.productID).then((res) => {
            console.log(res)
            // setProductDetails(res.data.data);
        })
    }
    useEffect(() => {
        getProductDetails();
    },[])

  return (
    <div>
        {params.productID}
    </div>
  )
}

export default ProductDetails
