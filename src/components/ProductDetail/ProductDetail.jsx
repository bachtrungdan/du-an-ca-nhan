import React from 'react'
import './ProductDetail.css'
import { PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import HomeContentSlider__1 from './HomeContentSlider__1';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pushAmount } from '../../redux-toolkit/indexSlice';
import { message } from 'antd';

function ProductDetail() {
    const nav = useNavigate()
    let idDetail = useParams().nameProductDetail
    const [data, setData] = useState([])
    const [dataDt, setDataDt] = useState([])
    const [idOnDetail, setIdOnDetail] = useState([])


    const dispatch = useDispatch()

    const buynow = () => {
        if (idOnDetail.length > 0) {
            data.amountOrder = 1
            let cloneOder = JSON.parse(window.localStorage.getItem('oderData'))
            if (cloneOder) {
                if (!cloneOder.find(value => value._id == data._id)) {
                    dispatch(pushAmount(1))
                    let newCloneOder = [...cloneOder, data]
                    localStorage.setItem('oderData', JSON.stringify(newCloneOder));
                    message.success('da them san pham')
                    nav('/card')

                } else {
                     message.success('da them san pham trc do')
                      nav('/card') }
            } else {
                dispatch(pushAmount(1))
                localStorage.setItem('oderData', JSON.stringify([data]))
                nav('/card')
                message.success('da them san pham')
            }
        } else {
            message.error('vui long chon san pham')
        }

    }
    function pushData() {
        if (idOnDetail.length > 0) {
            data.amountOrder = 1
            let cloneOder = JSON.parse(window.localStorage.getItem('oderData'))
            if (cloneOder) {
                if (!cloneOder.find(value => value._id == data._id)) {
                    dispatch(pushAmount(1))
                    let newCloneOder = [...cloneOder, data]
                    localStorage.setItem('oderData', JSON.stringify(newCloneOder));
                    message.success('da them san pham')
                } else { message.success('da them san pham trc do') }
            } else {
                dispatch(pushAmount(1))

                localStorage.setItem('oderData', JSON.stringify([data]))
                message.success('da them san pham')
            }
        } else {
            message.error('vui long chon san pham')
        }


    }
    useEffect(function () {
        window.scrollTo(0, 0)
        axios.get(`https://shope-b3.thaihm.site/api//product/get-one-product/${idDetail}`)
            .then(function (res) {
                setDataDt(res.data.product.listDtail)
                setData(res.data.product)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    let img = `https://shope-b3.thaihm.site/${data.thumbnail}`

    const handleChoose = (id) => {
        setIdOnDetail([id])
        console.log(id);
    }
    return (
        <div style={{ margin: '30px' }}>
            <div id='title'>
                <h2>{data.productName}</h2>
                <i className='start'>
                    <i class="fa-solid fa-star yellow" > </i> &ensp;
                    <i class="fa-solid fa-star yellow" ></i>&ensp;
                    <i class="fa-solid fa-star yellow" ></i>&ensp;
                    <i class="fa-solid fa-star yellow" ></i>&ensp;
                    <i class="fa-solid fa-star white" ></i>&ensp;
                    <b> ??a??nh gia??</b>
                </i>

            </div>

            <div id='detail'>

                <div className='detail-box1'>

                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <i class="fa-solid fa-heart heart"></i> y??u thi??ch
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={img} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/3/_/3_51_1_10.jpg" class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/2/_/2_61_8_2_1_15.jpg" class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>


                        <div className="detail-box2-item">
                            <div className="detail-box2-item1">
                                <button>tra?? go??p 0%</button>
                                <div className='detail-box2-item1-price'>
                                    <b>{(data.price * 1).toLocaleString()}</b> <br />
                                    <del>40.990.000 ??</del>
                                </div>
                            </div>
                            <div className="detail-box2-item2">

                                <ul className='flex'>
                                    {dataDt.map(value => {
                                        return (
                                            <li onClick={() => handleChoose(value._id)} key={value._id} className={`detail__product ${idOnDetail == value._id ? 'detailchoosed' : ''}`}>
                                                <b>{value.rom}</b>
                                                <b>--{value.ram}</b>
                                                <p>{(value.price * 1).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                            <b>Ch???n m??u ????? xem gi?? v?? chi nh??nh c?? h??ng</b>
                        </div>
                    </div>
                </div>

                <div className='detail-box2'>
                    <div className='detail-box2-item3' >
                        <div className="detail-box2-item3-progam">
                            <i className="fa-solid fa-gift"></i><b>Khuy????n ma??i</b>
                        </div>
                        <span>
                            <p>
                                <button className='detail-box2-item3-button'>1</button>   Nh???p m?? CPSONL500 khi thanh to??n VNPAY qua website ho???c CPS500
                                qua QR Offline t???i c???a h??ng ????? gi???m th??m 500k khi mua s???n ph???m
                                Apple t??? 17 tri???u (Xem chi ti???t).
                            </p>
                        </span>
                        <span>

                            <p>
                                <button className='detail-box2-item3-button'>2 </button>  Thu c?? l??n ?????i - Tr??? gi?? 1 tri???u (Xem chi ti???t).
                            </p>
                        </span>
                    </div>
                    <div className='detail-box2-item4'>
                        <div className='detail-box2-item4-ant1'>
                            <button className='detail-box2-item4-ant1-button1' onClick={buynow}> <h5 style={{ color: 'white' }}>mua ngay</h5>(giao t????n n??i ho????c l????y ta??i c????a ha??ng)</button>
                            <button className='detail-box2-item4-ant1-button2' onClick={pushData}>
                                <img src="https://static-product.cellphones.com.vn/img/add-to-cart.97145ab.png" alt="" />
                                <br />
                                <span className='cart-tex'>th??m va??o gio?? ha??ng </span>
                            </button>
                        </div>
                        <div className='detail-box2-item4-ant2'>
                            <button>
                                <b>tra?? go??p 0%</b> <br />( xe??t duy????t qua ??i????n thoa??i)
                            </button>
                            <button>
                                <b>tra?? go??p qua the??</b> <br />(visa, mastercard, JBC)
                            </button>
                        </div>
                    </div>
                    <div className="detail-box2-item-ant3">
                        <b>??U ??A??I TH??M : </b>
                        <ul>
                            <li>Gi???m th??m t???i 1% cho th??nh vi??n Smember (??p d???ng t??y s???n ph???m)</li>
                            <li> Gi???m th??m 5% t???i ??a 1 tri???u khi thanh to??n qua Kredivo</li>
                            <li>VNPAY Nh???p QRCPS gi???m ?????n 300.000?? ??p d???ng c??c ????n h??ng t???
                                4 tri???u tr??? l??n khi thanh to??n qua VNPAY t???i c???a h??ng</li>
                            <li>VPBank M??? th??? t??n d???ng Citibank - Nh???n voucher 2 tri???u</li>
                            <li>??u ????i m??? th??? TP Bank Evo - ??u ????i ?????n 6.6 tri???u ?????ng (cellphones.com.vn)</li>
                        </ul>

                    </div>
                </div>

                <div className='detail-box3'>
                    <div className='detail-box3-item1'>
                        <button>Ha?? N????i</button>
                        <select name="cars" id="cars">
                            <option value="volvo">??i??a chi??</option>
                            <option value="saab">qu????n Thanh Xu??n</option>
                            <option value="opel">qu????n Ba ??i??nh </option>
                            <option value="audi">qu????n Hai Ba?? Tr??ng</option>
                            <option value="audi">qu????n Hoa??n ki????m </option>
                            <option value="audi">qu????n Ha?? ????ng</option>
                            <option value="audi">qu????n Thanh Tri??</option>
                            <option value="audi">qu????n Hoa??ng mai </option>
                            <option value="audi">qu????n Long Bi??n</option>
                            <option value="audi">qu????n Nam T???? Li??m</option>
                        </select>
                    </div>
                    <b>sa??n ph????m hi????n co?? ta??i ca??c c????a ha??ng :</b>
                    <div className='detail-box3-item2' >
                        <ul>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                            <li><span><PhoneOutlined /> 02871000218218-220</span> - <span className='detail-box3-item2-address'><i class="fa-sharp fa-solid fa-location-pin"></i> Tr???n Quang Kh???i, Ph?????ng T??n </span> </li>
                        </ul>
                    </div>
                    <div className='detail-box3-item3' >
                        <b>Th??ng tin s???n ph???m</b>
                        <ul>
                            <li><i class="fa-solid fa-mobile-screen-button"></i>
                                M??y m???i 100% , ch??nh h??ng Apple Vi???t Nam.
                                CellphoneS hi???n l?? ?????i l?? b??n l??? u??? quy???n
                                iPhone ch??nh h??ng VN/A c???a Apple Vi???t Nam</li>
                            <li> <i class="fa-thin fa-gift"></i>
                                iPhone 13 Pro Max 128GB, c??p USB-C sang Lightning</li>
                            <li> <i class="fa-solid fa-shield-halved"></i>
                                1 ?????I 1 trong 30 ng??y n???u c?? l???i ph???n c???ng nh?? s???n xu???t.
                                B???o h??nh 12 th??ng t???i trung t??m b???o h??nh ch??nh h??ng Apple :
                                ??i???n Tho???i Vui ASP (Apple Authorized Service Provider)(xem chi ti???t)</li>
                        </ul>

                    </div>
                </div>

            </div>
            <div className='detail1-box1-Homecontent'>         
                <div className='detail1-box1-Homecont'>
                    <HomeContentSlider__1 />
                </div>
            </div>

            <div className='detail1-box1'>
                <div className="detail1-box1-item1">
                    <h4>?????C ??I???M N???I B???T</h4>
                    <ul>
                        <li>M??n h??nh Dynamic Island - S??? bi???n m???t c???a m??n h??nh tai th??? thay th??? b???ng thi???t
                            k??? vi??n thu???c, OLED 6,7 inch, h??? tr??? always-on display</li>
                        <li>C???u h??nh iPhone 14 Pro Max m???nh m???, hi???u n??ng c???c kh???ng t??? chipset A16 Bionic</li>
                        <li>L??m ch??? c??ng ngh??? nhi???p ???nh - Camera sau 48MP, c???m bi???n TOF s???ng ?????ng</li>
                        <li>Pin li???n lithium-ion k???t h???p c??ng c??ng ngh??? s???c nhanh c???i ti???n</li>
                        <li>
                            K??ch th?????c m??n h??nh iPhone 14 Pro Max v???n l?? 6.1 inch tuy nhi??n ph???n ???tai th?????? ???? ???????c
                            thay th??? b???ng m???t ???????ng c???t h??nh vi??n thu???c. Apple g???i ????y l?? Dynamic Island - n??i ch???a
                            camera Face ID v?? m???t ???????ng c???t h??nh tr??n th??? hai cho camera tr?????c.</li>
                        <li>
                            Ngo??i ra, iPhone 14 Pro Max c?? t??nh n??ng m??n h??nh lu??n b???t ho???t ?????ng (Always-on Display)
                            v???i ti???n ??ch m??n h??nh kh??a m???i tr??n iOS 16. Ng?????i d??ng c?? th??? xem c??c th??ng tin nh?? l???i
                            nh???c, s??? ki???n l???ch v?? th???i ti???t m?? kh??ng c???n b???t m??y l??n ????? xem. Th???m ch??, c?? m???t tr???ng
                            th??i ng??? cho h??nh n???n, tr???ng th??i n??y s??? l??m t???i h??nh n???n ????? s??? d???ng ??t pin h??n</li>
                        <li>
                            iPhone 14 Pro Max c?? s??? c???i thi???n l???n m??n h??nh so v???i iPhone 13 Pro Max. S??? kh??c bi???t
                            gi??? phi??n b???n iPhone 14 Pro Max 256GB v?? b???n ti??u chu???n 128GB ch??? l?? b??? nh??? trong. D?????i
                            ????y l?? m???t s??? c???i ti???n n???i b???t tr??n iPhone 14 Pro Max m?? c?? th??? b???n ch??a bi???t!
                        </li>
                    </ul>
                </div>
                <div className="detail1-box1-item2">
                    <h4>Th??ng s??? k??? thu???t</h4>
                    <ul>
                        <li>
                            <p>K??ch th?????c m??n h??nh</p>
                            <span>6.7 inches</span>
                        </li>
                        <li>
                            <p>????? ph??n gi???i m??n h??nh</p>
                            <span>2796 x 1290-pixel</span>
                        </li>
                        <li>
                            <p>H??? ??i???u h??nh</p>
                            <span>iOS 16</span>
                        </li>
                        <li>
                            <p>C??ng ngh??? m??n h??nh</p>
                            <span>Super Retina XDR OLED</span>
                        </li>
                        <li>
                            <p>Camera sau</p>
                            <span>
                                Camera ch??nh: 48 MP, f/1.8, 24mm, OIS
                                Camera g??c si??u r???ng: 12 MP, f/2.2, 13mm, 120??
                            </span>
                        </li>
                        <li>
                            <p>Camera tr?????c</p>
                            <span>Camera selfie: 12 MP, f/1.9, 23mm, PDAF</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default ProductDetail