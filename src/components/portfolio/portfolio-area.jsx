import { ApiEndPoints } from '@/src/config/apiconfig';
import htmlcontentservice from '@/src/service/htmlcontentservice';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PortfolioArea = () => {
    const [isPortfolio,setIsPortfolio]=useState("")
    // const GetPortfolioList=async()=>{
    //     var response=await htmlcontentservice.GetNewsbyKey(1,99,"Graycode-Portfolio","en")
    //     if(response.Code==200){
    //         setIsPortfolio(response?.Data?.NewsOutputVM)
    //     }
    // }
    // useEffect(()=>{GetPortfolioList()},[])
    const GetPortfolioList=async()=>{
        var response=await htmlcontentservice.GetHtmlContentListbyKey(1,99,"gray-portfolio", "en")
        if(response.Code==200){
            setIsPortfolio(response.Data?.HtmlContentVM)
        }
    }
    useEffect(()=>{GetPortfolioList()},[])
    return (
        <>
            <section className="tp-portfolio-area pt-120 pb-60">
            <div className="container">
               <div className="row">
                {isPortfolio && isPortfolio.length>0 && isPortfolio.map((item, i) => 
                    <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                        <div className="tp-portfolio-item-wrapper">
                        <div className="tp-portfolio-item-thumb">
                            {item?.BackgroundImagesArray?<Image src={ApiEndPoints.baseUrl + item.BackgroundImagesArray} alt="theme-pure" height={388.25} width={373.33}/>:""}
                        </div>
                        <div className="tp-portfolio-item-content">
                            <span className="tp-portfolio-item-subtitle">{item.Title}</span>
                            <h3 className="tp-portfolio-item-title">
                                <Link href="/portfolio">{item?.PageName}</Link></h3>
                            <div className="tp-portfolio-item-content-btn">
                                <Link href={`/portfolio/${item?.PageName}`}>View Projects 
                                    <i className="fa-regular fa-arrow-right"></i>
                                </Link>

                            </div>
                        </div>
                        </div>
                    </div>
                )} 
               </div>
            </div>
         </section>
        </>
    );
};

export default PortfolioArea;