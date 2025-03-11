import htmlcontentservice from '@/src/service/htmlcontentservice';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SiteInfoContext = createContext();
export const SiteInfoProvider = ({ children }) => {
    const [siteInfo, setSiteInfo] = useState(null);
    const [siteMenu,setSiteMenu]=useState("")
    //fetch siteinfo
    const fetchSiteInfo = async () => {
        try {
            var response = await htmlcontentservice.GetSiteInfo();
            if (response.Code == 200) {
                setSiteInfo(response.Data);
            }
        } catch (error) {
            console.error("Failed to fetch site info:", error);
        }
    };
    // fetch sitemenu
    const fetchSitemenu=async()=>{
        try{
        var response=await htmlcontentservice.GetSiteMenu(1,99, "Graycode-menu", "en")
        if(response.Code==200){
            setSiteMenu(response.Data.MenuOutputVM)
        }
        else{
            setSiteMenu([])
        }
    }
    catch(error){
        console.error("Failed to fetch menu data",error)
        setSiteMenu([])
    }
    }
// call APIs
    useEffect(() => {
        fetchSiteInfo();
        fetchSitemenu()
    }, []);
     return (
        <SiteInfoContext.Provider value={{siteInfo,siteMenu}}>
            {children}
        </SiteInfoContext.Provider>
    );
};
export const useSiteInfo = () => {
    return useContext(SiteInfoContext);
};