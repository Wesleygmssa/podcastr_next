import { GetStaticProps } from "next";
import { api } from "../service/api";
//SPA
//SSR
//SSG => só funciona em produção

type Episodes = {
  id: string;
  title: string;
  members: string;
};

type HomeProps = {
  episodes: Episodes[];
};

export default function Home(props: HomeProps) {
  console.log(props);
  // useEffect(() => {
  //   fetch("http://localhost:3333/episodes")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);
  return <div>{JSON.stringify(props)}</div>;
}

export const getStaticProps: GetStaticProps = async () => {
  //?_limit=12&_sort=published_at&_order=desc
  const response = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });
  const data = await response.data;

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};

//yarn start => build
