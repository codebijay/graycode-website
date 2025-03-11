import { ApiEndPoints } from '@/src/config/apiconfig';
import htmlcontentservice from '@/src/service/htmlcontentservice';
import AngleArrow from '@/src/svg/angle-arrow';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSiteInfo } from '../siteinfocontext/SiteInfoContext';

const ServiceArea = () => {
    const siteInfo=useSiteInfo()
    const [servicePage,setServicePage]=useState("")
    const GetServicePageList=async()=>{
        var response=await htmlcontentservice.GetHtmlContentListbyKey(1,99,"gray_professional","en")
        if(response.Code==200){
            setServicePage(response.Data)
        }
    }
    useEffect(()=>{GetServicePageList()},[])
    return (
        <>
           <section className="tp-service-breadcrumb-area p-relative pt-120">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="tp-service-breadcrumb-title-wrapper">
                            <span className="tp-section-title__pre">
                                service <span className="title-pre-color">IT Solutions</span>
                                <AngleArrow /> 
                            </span>
                            <h3 className="tp-section-title">
                                {servicePage && servicePage?.SettingTitle} <br /><span className="title-color">{servicePage && servicePage?.SettingSubTitle}</span> 
                            </h3>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-service-breadcrumb-title-wrapper justify-content-start justify-content-xl-end d-flex">
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        {servicePage?.HtmlContentVM && servicePage.HtmlContentVM?.length>0 && servicePage.HtmlContentVM.map((item, i) => 
                            <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                                <div className="tp-service-3-content breadcrumb-item mb-30">
                                <div className="tp-service-3-content-thumb">
                                  {item?.BackgroundImagesArray?<Image src={ApiEndPoints.baseUrl + item.BackgroundImagesArray} alt="theme-pure" height={44} width={44} />:""}
                                </div>
                                <h4 className="tp-service-breadcrumb-title">
                                    <Link href="/service-details">{item.Title}</Link></h4>
                                <p>{item.Subtitle}</p>
                                <div className="tp-service-btn">
                                    <Link href={`/services/${item.PageName}`}>
                                        Read More 
                                        <i className="fa-solid fa-arrow-up-right"></i>
                                    </Link>
                                </div>
                                </div>
                            </div>
                        )} 
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <div className="tp-about-call fadeUp">
                                <a href="tel:01310-069824">
                                    <p><i className="fa-solid fa-phone"></i> 
                                    Provide IT services to hundreds customers <span>{siteInfo && siteInfo?.PhoneNumber1}</span>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        </>
    );
};

export default ServiceArea;