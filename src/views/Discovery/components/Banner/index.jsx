import React, { useState, useEffect, memo } from 'react'
import { Carousel } from 'antd'
import { getBanner } from 'api/discovery'
import './index.scss'

function Banner() {
  const [bannerList, setBannerList] = useState([])
  const getBannerList = async () => {
    const { banners: banner } = await getBanner(0)
    setBannerList(banner)
  }

  useEffect(() => {
    getBannerList()
  }, [])

  return (
    <Carousel autoplay className='banner-carousel'>
      {
        bannerList.length && bannerList.map((banner) => {
          return (
            <img
              className='banner-img'
              src={banner.imageUrl}
              key={banner.targetId}
              alt=""
            />
          )
        })
      }
    </Carousel>
  )
}

export default memo(Banner)
