import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SocialLinksTwo } from '@/src/common/social-links';
// team members img 
import team_img_1 from '@assets/img/breadcrumb/team/img-1.jpg';
import team_img_2 from '@assets/img/breadcrumb/team/img-2.jpg';
import team_img_3 from '@assets/img/breadcrumb/team/img-3.jpg';
import team_img_4 from '@assets/img/breadcrumb/team/img-4.jpg';
import team_img_5 from '@assets/img/breadcrumb/team/img-5.jpg';
import team_img_6 from '@assets/img/breadcrumb/team/img-6.jpg'; 
import htmlcontentservice from '@/src/service/htmlcontentservice';
import { ApiEndPoints } from '@/src/config/apiconfig';


const TeamMembers = () => {
    const [teams,setTeams]=useState("")
    const GetTeamList=async()=>{
        var response=await htmlcontentservice.GetTeamsListbyKey(1, 99, "Graycode-Teams", "en")
        if(response.Code==200){
            setTeams(response.Data.TeamListVM)
        }
    }
    useEffect(()=>{GetTeamList()},[])
    return (
        <>
            <section className="tp-team-breadcrumb-area pt-120 pb-90">
            <div className="container">
               <div className="row">
                {teams && teams.length>0 && teams.map((item, i) => 
                    <div key={i} className="col-lg-4 col-sm-6">
                        <div className="tp-team-wrapper p-relative mb-30">
                        <div className="tp-team-wrapper-thumb ">
                            <Link href="/">
                              {item?.ProfileImagePath? <Image src={ApiEndPoints.baseUrl + item.ProfileImagePath} alt="theme-pure" width={373} height={411} />:""}
                            </Link>
                            <div className="tp-team-social-info">
                                <SocialLinksTwo />
                            </div>
                        </div>
                        <div className="tp-team-wrapper-content d-flex justify-content-between">
                            <div className="tp-team-wrapper-content-text">
                                <h3 className="team-title"><Link href="/">{item.FullName}</Link></h3>
                                <p>{item.MessageContent}</p>
                            </div>
                            <div className="tp-team-wrapper-icon">
                                <span className="tp-team-social">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.17963 0.813046L6.19966 6.20109L0.813128 6.17955L0.819197 7.81233L6.20573 7.83388L6.22576 13.2219L7.85808 13.2285L7.83805 7.84041L13.2246 7.86195L13.2185 6.22917L7.83198 6.20762L7.81195 0.819575L6.17963 0.813046Z" fill="currentColor"/>
                                    </svg>
                                </span>
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

export default TeamMembers;