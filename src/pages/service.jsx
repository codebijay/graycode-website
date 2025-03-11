import React from 'react';
import Wrapper from '../layout/wrapper';

import htmlcontentservice from '../service/htmlcontentservice';
import Seo from '../common/seo';
import ServiceArea from '../components/service/service-area';
import Sevice from '../components/service';

export default function index(meta,url){
    return (
      <>
      <Seo meta={meta} url={"service"} />
        <Wrapper>
          <Sevice/>
            {/* <ServiceArea /> */}
        </Wrapper>
        </>
    );
};
export async function getServerSideProps(context) {
    var url = context.resolvedUrl;
    let meta = await htmlcontentservice.getSeoByPage(url);
    return {
      props: {
        meta,
        url,
      },
    };
  }