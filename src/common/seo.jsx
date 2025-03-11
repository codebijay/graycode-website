import { NextSeo } from "next-seo";
import { ApiEndPoints } from "../config/apiconfig";

 export default function Seo({ meta, url }){
  if (url && typeof url === "string") {
    url = url.split("?")[0];
  }

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };


  const Api = ApiEndPoints.baseUrl;
  let data;
  if (meta != undefined && meta != null) {
    if (isJsonString(meta)) {
      data = JSON.parse(meta);
    }
  }

  return (
    <>
      {data && (
        <>
          <NextSeo
            title={data?.MetaTitle ? data.MetaTitle : "Graycode"}
            description={
              data?.MetaDescription
                ? data.MetaDescription
                : "Best Web Solutions in Nepal"
            }
            canonical={`${ApiEndPoints.hostUrl}${url}`}
            facebook={{ appId: "" }}
            openGraph={{
              url: `${ApiEndPoints.hostUrl}${url}`,
              title: data?.MetaTitle,
              description: data?.MetaDescription,
              type: "website",
              images: [
                {
                  url: `${Api}${data?.Image}`,
                  width: 800,
                  height: 600,
                  alt: data?.Alt ? data.Alt : data.Title,
                  type: "image/jpeg,image/png",
                },
              ],
              siteName: "Graycode",
            }}
            twitter={{
              handle: data?.socialTwitter?.name,
              site: "@Graycode",
              cardType: "summary_large_image",
            }}
          />
        </>
      )}
    </>
  );
};

 