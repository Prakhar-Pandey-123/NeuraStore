export function Others({ websiteUrl }) {
  const domain = new URL(websiteUrl).hostname;
  const iconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

  return (
    <img
      className="w-[200px] h-[200px]"
      src={iconUrl}
      alt="site icon"
    />
  );
}

// import faviconFetch from "favicon-fetch";

// export function Others({ websiteUrl }) {
//   const iconUrl = faviconFetch({ uri: websiteUrl });
  
//   console.log("url inside others",websiteUrl);
//   console.log("icon url inside others",iconUrl);

//   return (<img className="w-[200px] h-[200px] flex item-center" src={iconUrl} alt="site icon" />);
// }
