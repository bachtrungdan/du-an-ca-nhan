import React, { useState } from 'react'
import './Card.css'
import { json, Link, useParams } from "react-router-dom";
import { Empty, Button, notification, message } from 'antd';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { removeAmount } from '../../redux-toolkit/indexSlice';
import LazyLoad from 'react-lazy-load';

function Card() {
    const dispatch  = useDispatch()
    let id = useParams()
    let backbtn = id.nameProductDetail ? id.nameProductDetail : ''

    let data = JSON.parse(window.localStorage.getItem('oderData')) ? JSON.parse(window.localStorage.getItem('oderData')) : []

    window.localStorage.getItem('totalPrice') ?  window.localStorage.getItem('totalPrice') : window.localStorage.setItem('totalPrice', 20000)
    function getAllPrice(newdata){
        let a = 0
        newdata ?  newdata.map(value => a += (value.amountOrder * value.price)) : data.map(value => a += (value.amountOrder * value.price))
        return a
    }
    let PriceAll =getAllPrice()

    const [price, setPrice] = useState(PriceAll)

    window.localStorage.setItem('totalPrice', PriceAll)

    const handleCount = (e) => {
        let arrSlpit = (e.target.id).split('-')
        let index = data.findIndex(value => value._id == arrSlpit[0])
        if (arrSlpit[1] == 0) {
            if (data[index].amountOrder < 1 || data[index].amountOrder == 1 ) {
                notification.open({
                    message: 'Notification Title',
                    description:
                        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
                return ''
            }
            data[index].amountOrder -=1
            window.localStorage.setItem('oderData', JSON.stringify(data))
            setPrice(getAllPrice())
            window.localStorage.setItem('totalPrice', getAllPrice())
        } else {
            data[index].amountOrder +=1
            window.localStorage.setItem('oderData', JSON.stringify(data))
            setPrice(getAllPrice())
            window.localStorage.setItem('totalPrice', getAllPrice())
        }
    }

    const handleDelete = (e)=>{

        dispatch(removeAmount(1))
        let newdataOrder = data.filter((value,index) => index !== e)
        window.localStorage.setItem('oderData', JSON.stringify(newdataOrder))
        setPrice(getAllPrice(newdataOrder))
        message.error('san pham da dc xoa !!!')
        // window.location.assign('/card')
    }

    return (
       <LazyLoad>
         <div>
            <div className='Cart__content'>
                {data.length >0 ?
                    <div className='Cart__content__lists'>
                        <div className="Cart__content__lists__back">
                            <h3>Gi??? h??ng <div className="backs"><Link to={`/${backbtn}`}><p> <LeftOutlined />Tr??? v???</p></Link></div></h3>
                        </div>
                        {data.map((value, index) => {
                            return (
                              
                                 <div className='Cart__content__list' key={value._id}>
                                    <div className='Cart__content__list__img'> <img src={`https://shope-b3.thaihm.site/${value.thumbnail}`} alt="" /></div>
                                    <div className='Cart__content__list__detail'>
                                        <h3>{value.productName} <button className='btndeleteCard' onClick={function(){handleDelete(index)}}><i ><CloseOutlined /></i></button></h3>
                                        <p className='Cart__content__list__price'>{(value.price*1).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                        <div className="Cart__content__list__choose"><p>Ch???n s??? l?????ng: </p>
                                            <div className="Cart__content__list__choose__btns">
                                                <div className="Cart__content__list__choose__btn" id={`${value._id}-0`}  onClick={handleCount}>-</div>
                                                <div className='Cart__content__list__choose__btn'>{value.amountOrder}</div>
                                                <div className="Cart__content__list__choose__btn" id={`${value._id}-1`}  onClick={handleCount}>+</div>
                                            </div>
                                        </div>
                                        <div className="Cart__content__list__seller">
                                            <p className='Cart__content__list__seller__title' >- Ch????ng tr??nh khuy???n m???i:</p>
                                            <ul className='block__seller__carts' >
                                                <div className="block__seller__cart">
                                                    <li className="Cart__content__list__seller__"><p>Thu c?? l??n ?????i - tr??? gi?? ?????n 3 tri???u</p></li>
                                                    <li className="Cart__content__list__seller__"><p>Gi???m th??m ?????n 2 tri???u khi thanh to??n qua v??/ng??n h??ng Moca, VNPAY, Nam ??, STANDARD CHATERED,...</p></li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                              
                            )
                        })}

                        <div className="Cart__content__list__buy">
                            <div className="Cart__content__list__buy__price">
                                <p>T???ng ti???n t???m t??nh: </p>
                                <p>{(window.localStorage.getItem('totalPrice') * 1).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            <div className='Cart__content__list__buy__btns'>
                                <Link to={'/payment-info'}> <p className='Cart__content__list__buy__btn1'>Ti???n h??nh ?????t h??ng</p></Link>
                                <Link to={'/home'}> <p className='Cart__content__list__buy__btn2'>Ch???n th??m s???n ph???m kh??c</p></Link>
                            </div>
                        </div>
                    </div>
                    : <div> <Empty /> <Link to={'/home'}> <p className='Cart__content__list__buy__btn2 noempty'>Ch???n th??m s???n ph???m kh??c</p></Link></div>}
            </div>
        </div>
       </LazyLoad>
    )
}

export default Card