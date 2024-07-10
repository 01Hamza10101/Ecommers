import React, { useState, useEffect } from 'react';
import './Order.css';
import {GetOrder} from "../../Redux/Userslice.jsx";
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    
    useEffect(()=>{
        console.log(Order);
    },[Order]);

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

    function SetColor(data){
        if(data === "Pending" || data === "Order Confirmed" || data === "In Progress" || data === "Out for Delivery" || data === "Delivered"){
            return "#26a541";
        }
        // if(data == "Order Confirmed"){
        //     return "#26a541";
        // }
        // if(data == "In Progress"){
        //     {return "#26a541";
        // }
        
    }
    function isTrans(data,i){
        if(i == "2"){
            console.log("running",data,i)
            setTimeout(() => {
                return ({background:SetColor(data?.Status[1]?.status),transform: "scaleX(1)"})
            }, 500);
        }
    }
    const [message , setMessage] = useState("");
    
    return (
        <div className="order-container">
            <h4>Your Order Details</h4>
            {ordrobj && ordrobj.map((data,i)=>{
            return(
            <div className="order-details" key={i}>
                <div>
                    <img src={data.Image1} alt="img" />
                    <h4>₹{data.CurrentPrice}</h4>
                    <h5>Delivered on {data.Status[0].Date}</h5>
                    <h6>Your item has been delivered</h6>
                </div>
                <div>
                    <h4>{data.Title}</h4>
                    <h5>{data.Highlight}</h5>
                    <div className='Order-status'>
                     <div className='status-1' >
                        <div className='_1'>
                            <div style={{background:SetColor(data.Status[0].status)}} onMouseEnter={() => setMessage({message:data.Status[0].message,date:data.Status[0].Date,Pointer:"0px"})}>
                              <h6 style={{color:SetColor(data.Status[0].status)}}>Pending</h6>
                              <h5>{data.Status[0]?.Date}</h5>
                            </div>
                            <div style={{background:SetColor(data.Status[0].status)}}>
                            </div>
                        </div>
                        <div className='_2'>
                            <div style={{background:SetColor(data?.Status[1]?.status)}} onMouseEnter={() => setMessage({message:data.Status[1].message,date:data.Status[1].Date,Pointer:"87px"})}>
                              <h6 style={{color:SetColor(data.Status[1].status)}}> Order Confirmed</h6>
                              <h5>{data.Status[1]?.Date}</h5>
                            </div>
                            <div style={isTrans(data,2)}>
                            </div>
                        </div>
                        <div className='_3'>
                            <div style={{background:SetColor(data?.Status[2]?.status)}} onMouseEnter={() => setMessage({message:data.Status[2].message,date:data.Status[2].Date,Pointer:"178px"})}>
                              <h6 style={{color:SetColor(data?.Status[2]?.status)}}>In Progress</h6>
                              <h5>{data.Status[2]?.Date}</h5>
                            </div>
                            <div style={{background:SetColor(data?.Status[2]?.status)}}>
                            </div>
                        </div>
                        <div className='_4'>
                            <div style={{background:SetColor(data.Status[3]?.status)}} onMouseEnter={() => setMessage({message:data.Status[3].message,date:data.Status[3].Date,Pointer:"267px"})}>
                                <h6 style={{color:SetColor(data.Status[3]?.status)}}>Out for Delivery</h6>
                                <h5>{data.Status[3]?.Date}</h5>
                            </div>
                            <div style={{background:SetColor(data.Status[4]?.status)}}>
                            </div>
                            <div style={{background:SetColor(data.Status[4]?.status)}} onMouseEnter={() => setMessage({message:data.Status[4].message,date:data.Status[4].Date,Pointer:"346px"})}>
                                <h5>{data.Status[4]?.Date}</h5>
                                <h6 style={{color:SetColor(data.Status[4]?.status)}}>Delivered</h6>
                                {/* <h6>Cancelled</h6> */}
                            </div>
                        </div>
                     </div>
                        <div className='status-2'>
                            <div className='status-2-1' style={{marginLeft:message.Pointer}}>
                            </div>
                            <h5>{message.message || data.Status[0].message}</h5>
                            <h6>{message.date || data.Status[0].Date}</h6>
                        </div>
                        {/* <div className='_5'>
                            <div>
                            <h5>Wed, 2nd Nov</h5>
                            </div>
                            <div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div>
                    <h5>Message</h5>
                    {data.Note.map((data,i) => {
                        return (
                            <h6 key={i}>{data.message}</h6>
                        )
                    })}
                </div>
            </div>)})}
        </div>
    );
};

export default OrderPage;
