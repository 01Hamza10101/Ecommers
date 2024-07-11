
import React, { useEffect, useState } from "react";

function OrderCard({data}) {
    const [Pointer,setPointer] = useState("0px");
    const [transform,setTransform] = useState({
        _0:false,
        _1:false,
        _2:false,
        _3:false,
        _4:false
    });
    useEffect(() => {
        data.Status.forEach((statusItem, index) => {
    
            setTimeout(() => {
                setTransform(prevState => {
                    const newState = {
                        ...prevState,
                        [`_${index}`]: statusItem.status
                    };
                    return newState;
                });
            }, (index + 1) * 1000);
        });
    }, [data.Status]);
    
    function ShowMessage(){
        console.log("showMessage")
        if(Pointer === "0px" && data.Status[0]?.message ){
            return data.Status[0].message
        }if(Pointer === "87px" && data.Status[1]?.message){
            return data.Status[1].message
        }if(Pointer === "178px" && data.Status[2]?.message){
            return data.Status[2].message
        }if(Pointer === "267px" && data.Status[3]?.message){
            return data.Status[3].message
        }if(Pointer === "346px" && data.Status[4]?.message){
            return data.Status[4].message
        }
    }
    function ShowDate(){
        console.log("showDate")
        if(Pointer === "0px" && data.Status[0]?.Date ){
            return data.Status[0].Date
        }if(Pointer === "87px" && data.Status[1]?.Date){
            return data.Status[1].Date
        }if(Pointer === "178px" && data.Status[2]?.Date){
            return data.Status[2].Date
        }if(Pointer === "267px" && data.Status[3]?.Date){
            return data.Status[3].Date
        }if(Pointer === "346px" && data.Status[4]?.Date){
            return data.Status[4].Date
        }
    }

    return(
        <>
        <div className="order-details" >
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
                            <div style={{background:transform._0 === "Pending" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}} onMouseEnter={() => setPointer("0px")}>
                              <h6 style={{color:transform._0 === "Pending" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}}>Pending</h6>
                              <h5>{data.Status[0]?.Date}</h5>
                            </div>
                            <div style={{background:transform._1 === "Order Confirmed" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)",transform:transform._1  === "Order Confirmed" ? "scaleX(1)" : "scaleX(0)"}}>
                            </div>
                        </div>
                        <div className='_2'>
                            <div style={{background:transform._1 === "Order Confirmed" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}} onMouseEnter={() => setPointer("87px")}>
                              <h6 style={{color:transform._1 === "Order Confirmed" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}}> Order Confirmed</h6>
                              <h5>{data.Status[1]?.Date}</h5>
                            </div>
                            <div style={{ background:transform._2 === "In Progress" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)" , transform: transform._2 === "In Progress" ? "scaleX(1)" : "scaleX(0)" }}>
                            </div>
                        </div>
                        <div className='_3'>
                            <div style={{background:transform._2 === "In Progress" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}} onMouseEnter={() => setPointer("178px")}>
                              <h6 style={{color:transform._2 === "In Progress" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}}>In Progress</h6>
                              <h5>{data.Status[2]?.Date}</h5>
                            </div>
                            <div style={{background:transform._3 === "Out for Delivery" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)",transform: transform._3 === "Out for Delivery" ? "scaleX(1)" : "scaleX(0)"}}>
                            </div>
                        </div>
                        <div className='_4'>
                            <div style={{background:transform._3 === "Out for Delivery" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}} onMouseEnter={() => setPointer("267px")}>
                                <h6 style={{color:transform._3 === "Out for Delivery" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}}>Out for Delivery</h6>
                                <h5>{data.Status[3]?.Date}</h5>
                            </div>
                            <div style={{background:transform._4 === "Delivered" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)",transform: transform._4 === "Delivered" ? "scaleX(1)" : "scaleX(0)"}}>
                            </div>
                            <div style={{background:transform._4 === "Delivered" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}} onMouseEnter={() => setPointer("346px")}>
                                <h5>{data.Status[4]?.Date}</h5>
                                <h6 style={{color:transform._4 === "Delivered" ? "rgb(38, 165, 65)" : "rgb(135 135 135 / 32%)"}}>Delivered</h6>
                                {/* <h6>Cancelled</h6> */}
                            </div>
                        </div>
                     </div>
                        <div className='status-2'>
                            <div className='status-2-1' style={{marginLeft:Pointer}}>
                            </div>
                            <h5>{ShowMessage()}</h5>
                            <h6>{ShowDate()}</h6>
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
            </div>
        </>
    )
}



export default OrderCard;