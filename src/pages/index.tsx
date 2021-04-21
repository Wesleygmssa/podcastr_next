//SPA
//SSR
//SSG

import { useEffect } from "react";

export default function Home(props) {
  console.log(props);
  // useEffect(() => {
  //   fetch("http://localhost:3333/episodes")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);
  return <div>{JSON.stringify(props)}</div>;
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
