import htmlcontentservice from '@/src/service/htmlcontentservice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const Tags = () => {
    const [tag,setTags]=useState([])
    const GetRecentTags=async()=>{
        var response=await htmlcontentservice.GetBlogTags(1,99,"")
        if(response.Code==200){
            setTags(response.Data)
        }
    }
    useEffect(()=>{GetRecentTags()},[])
    console.log(tag);
    
    return (
        <>
            <div className="sidebar__widget mb-30">
                <h3 className="sidebar__widget-title">Tags</h3>
                <div className="sidebar__widget-content">
                    <div className="tagcloud">
                        {tag && tag.length>0 && tag?.split(",")?.map((item, i) =>  <Link href="#" key={i}>{item}</Link>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tags;