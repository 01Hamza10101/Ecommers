import React, { useState, useEffect } from 'react';
import './Order.css';
import {GetOrder} from "../../Redux/Userslice.jsx";
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderCard from "../../components/Order/ordercard.jsx";
const OrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Order = useSelector((state) => state.User.Order);

    useEffect(()=>{
    const token = localStorage.getItem('token');
            if(token){
                dispatch(GetOrder());
            }
            if(!token){
                navigate("/login")
            }
    },[]);
    
    
    const [ordrobj , setOrderobj] = useState([{
        Title:"Title",
        Highlight:"highlight",
        CurrentPrice:123,
        Image1:"https://rukminim2.flixcart.com/image/200/200/xif0q/lungi/u/4/h/free-lungi-2-10mts-sgreen-mintgreen-bblue-grey-4-gowri-tex-original-imagdd6eytav7rhg-bb.jpeg?q=90",
        Note:[{
            message:"started"
        }],
        Status:[{
            status:"Pending",
            Date:"Tue, 6th Jun",
            message:"Your order is put on hold"
        },{
            status:"Order Confirmed",
            Date:"Tue, 6th Jun",
            message:"Your order is confirmed"
        },
        {
            status:"In Progress",
            Date:"Thu, 8th Jun",
            message:"Your order is in progress"
        },
        {
            status:"Out for Delivery",
            Date:"Sun, 11th Jun",
            message:"Your order is out of delivery"
        },
        {
                status:"Delivered",
                Date:"Sun, 11th Jun",
                message:"Your order is delivered"
            }
        ]
    }]);
    
    useEffect(()=>{
        setOrderobj(Order);
    },[Order]);

    return (
        <div className="order-container">
            <h4>Your Order Details</h4>
            {!ordrobj && <>loading..</>}
            <div>
                {ordrobj?.map((data,i)=>{
                    return <OrderCard data={data} key={i}/>
                })}
            </div>
        </div>
    );
};

export default OrderPage;
