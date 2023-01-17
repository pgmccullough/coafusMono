import { Link, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const content = css`
  position: relative;
  top: 6.5rem;
  width: 80vw;
  margin: auto;
  margin-bottom: 10rem;
  font-family: 'COAF Sans';
  padding-top: 4rem;
  line-height: 1.5rem;
  min-height: 50vh;
  & h1 {
    font-family: 'COAF Serif';
    font-weight: 300;
  }
  ${screen.tablet} {
    top: 7rem;
  }
`;

const matchStyle = `
  background: yellow;
`;

const matchH1 = css`
  color: #000;
  & h1 {
    font-size: 1.5rem;
    margin: 1rem 0 0 0;
  }
`;

const matchP = css`
  margin: 0.5rem 0 2rem;
`;

export default function Search() {

  const [ searchResults, setSearchResults ] = useState([])

  const searchQuery = decodeURIComponent(useLocation().search.split("?q=")[1]).replaceAll("+"," ");

  const searchQueryArray = searchQuery.toLowerCase().split(" ");

  useEffect(() => {
    const fetchContent = async () => {
      const data = await fetch('/api/pages/');
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
        const cleanQuery = searchQuery.toLowerCase();
        let matchQuality = 0;
        let matchInst = -1;
        if(page.title.toLowerCase().includes(cleanQuery)||rawData.toLowerCase().includes(cleanQuery)) {
          matchQuality = 100;
          matchInst = rawData.toLowerCase().indexOf(cleanQuery);
        } else if(searchQueryArray.length > 1) {
          const sqWeight = (100/searchQueryArray.length)-1;
          searchQueryArray.forEach((sqBit,i) => {
            if(i===0) matchInst = rawData.toLowerCase().indexOf(cleanQuery);
            if(page.title.toLowerCase().includes(sqBit)||rawData.toLowerCase().includes(sqBit)) matchQuality += sqWeight;
          })
        }
        if(matchQuality > 0) {
          pageArray.push(
            {
              title: page.title,
              id: page.id,
              slug: page.slug,
              rawData,
              matchQuality,
              matchInst
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
        {searchResults?.map((result:any) => {
          let snippet = "";

          console.log(result.matchInst);
          console.log(result.rawData.length);
          let startSnip = 0;
          let endSnip = result.rawData.length;
          if(result.matchInst-85 > -1) {
            startSnip = result.matchInst-85;
          }
          if(result.matchInst+85 < endSnip) {
            endSnip = result.matchInst+85;
          }
          
          let trimmed = result.rawData.slice(startSnip, endSnip);

          let snippetArray = trimmed.split(" ");
          snippetArray.pop();
          snippetArray.shift();

          snippetArray.forEach((snipWord : string) => {
            searchQueryArray.forEach(sqBit => {
              if(snipWord.toLowerCase().includes(sqBit)) {
                snipWord = `<span style="${matchStyle}">${snipWord}</span>`;
              }
            });
            snippet += snipWord+" ";
          })

          return (
            <div key={result.id}>
              <Link css={matchH1} to={`/${result.slug}`}><h1>{result.title}</h1></Link>
              <p css={matchP} dangerouslySetInnerHTML={{__html: snippet}} />
            </div>
          )
        })}
      </>
    </main>
  );
}
