import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './GetAllProduct.css'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import LazyLoad from 'react-lazy-load';

import HomeContentSlider__1 from '../components/ProductDetail/HomeContentSlider__1'



function GetAllProduct() {
  let token = window.localStorage.getItem('token')
  const [dataProduct, setDataProduct] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const [dataparam, setDataparam] = useSearchParams()



  const getdataFilter = (value) => {

    // setTimeout(function(){  document.getElementById(`${value}`).classList.add('active__option') },300)
    if (value == 'caothap') {
      return setDataFilter(dataProduct.sort(function (a, b) { return a.price - b.price }))
    }
    if (value == 'thapcao') {
      return setDataFilter(dataProduct.sort(function (a, b) { return b.price - a.price }))
    }

    axios.get(`https://shope-b3.thaihm.site/api/product/find-products-by-name?productName=${value}`)
      .then(value => {
        setDataFilter(value.data.products)
      })
      .catch(value => {
        console.log(value);
      })
  }

  useEffect(() => {
    axios.get('https://shope-b3.thaihm.site/api/product/get-all-products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(value => {
      setDataProduct(value.data.products)
    })
      .catch(value => {
        console.log(value);
      })
    getdataFilter(dataparam.get('filter'))
  }, [])


  let brand = []
  brand = dataProduct.map(value => {
    return value.brand
  })
  brand = brand.filter((value, index) => brand.indexOf(value) == index)



  const handleFilter = (value) => {
    if (document.querySelector('.active__option')) {
      document.querySelector('.active__option').classList.remove('active__option')
    }
    document.getElementById(`${value}`).classList.add('active__option')
    setDataparam({ filter: value })
    getdataFilter(value)
  }
  return (
    <div className='GetAllProduct'>
      <Header></Header>
      <div className="GetAllProduct__content__img">
        <img src="https://cellphones.com.vn/media/wysiwyg/slide/khai-tr_ng.jpg" alt="" />
      </div>
      <div className='GetAllProduct__content'>
        <div className="GetAllProduct__content__slider">
          <HomeContentSlider__1></HomeContentSlider__1>
        </div>
        <div className="GetAllProduct__content__slider__option1">
          <h2>Ch???n theo lo???i</h2>
          {brand.map(value => {
            return (
              <button className='123' id={value} key={value} onClick={function () { handleFilter(value) }}><i class="fa-solid fa-flask-vial"></i><p>{value}</p></button>
            )
          })}

        </div>
        <div className="GetAllProduct__content__slider__option">
          <h2>S???p x???p theo</h2>
          <button className='123' id='caothap' onClick={function () { handleFilter('caothap') }}><i class="fa-solid fa-arrow-down-wide-short"></i><p>Gi?? cao - th???p</p></button>
          <button className='123' id='thapcao' onClick={function () { handleFilter('thapcao') }}> <i class="fa-solid fa-arrow-down-short-wide"></i><p>Gi?? th???p - cao</p></button>
        </div>
        <div className="home__content__list2__cart">
          {(dataFilter.length > 0 ? dataFilter : dataProduct).map(value => {
            let img = `https://shope-b3.thaihm.site/${value.thumbnail}`
            return (
              <LazyLoad >
                <div key={value._id}>
                  <Link to={`/ProductDetail/${value._id}`}>
                    <div className="home__content__list__cart">
                      <div className="home__content__list__cart__img"><img src={img} alt="" /></div>
                      <h3>{value.productName}</h3>
                      <p className='home__content__list__cart__price'>{(value.price * 1).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                      <div className="home__content__list__cart__sale">
                        Nh???p m?? CPSONL500 khi thanh to??n VNPAY qua website ho???c CPS500 qua QR Offline t???i c???a h??ng ????? gi???m th??m 500k khi mua s???n ph???m Apple t??? 17 tri???u v??
                      </div>
                      <div className='home__content__list__cart__star'> <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                      <div className='home__content__list__cart__Fav'><p>Y??u th??ch </p><i className="fa-regular fa-heart"></i></div>
                    </div>
                  </Link>
                </div>
              </LazyLoad>
            )
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>

  )
}

export default GetAllProduct