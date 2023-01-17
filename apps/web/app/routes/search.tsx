import { useLocation } from '@remix-run/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { css } from '@emotion/react';

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const content = css`
  position: relative;
  top: 6.5rem;
  margin-bottom: 10rem;
  font-family: 'COAF Sans';
  & h1 {
    font-family: 'COAF Serif';
    font-weight: 300;
  }
  ${screen.tablet} {
    top: 7rem;
  }
`;

export default function Search() {

  const [ searchResults, setSearchResults ] = useState([])

  const searchQuery = decodeURIComponent(useLocation().search.split("?q=")[1]).replaceAll("+"," ");

  // useEffect(() => {
  //   console.log("in search: ",searchQuery);
  // },[ searchQuery ])

  useEffect(() => {
    const fetchContent = async () => {
      const data = await fetch('http://localhost:3000/api/pages/');
      const json = await data.json();
      const pages = json.docs;
      const pageArray:any = [];
      pages.forEach((page : any) => {
        let rawData = page.title;
        page.layout.forEach((block : any) => {
          block.content?.map((text : any) => {
            rawData += " "+text.children[0].text;
          })
        })
        console.log(rawData);
        const cleanQuery = searchQuery.toLowerCase();
        if(page.title.toLowerCase().includes(cleanQuery)||rawData.toLowerCase().includes(cleanQuery)) {
          pageArray.push(
            {
              title: page.title,
              id: page.id,
              slug: page.slug,
              rawData
            }
          )
        }
      });
      setSearchResults(pageArray)
    };
    fetchContent()
    .catch(console.error);
  },[ searchQuery ])

  return (
    <main css={content}>
      <>
        Showing {searchResults.length} results for {searchQuery}
        {searchResults?.map((result:any) =>
          <div key={result.id}>
            {result.title}
          </div>
        )}
      </>
    </main>
  );
}
