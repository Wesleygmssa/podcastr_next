import { GetStaticProps } from "next";
import { api } from "../service/api";
import { format, parseISO } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { ptBR } from "date-fns/locale";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
//SPA
//SSR
//SSG => só funciona em produção

type Episodes = {
  id: string;
  title: string;
  members: string;
  published_at: string;
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
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  return {
    props: {
      episodes: episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};

//yarn start => build
