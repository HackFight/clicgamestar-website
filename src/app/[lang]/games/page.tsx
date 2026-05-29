import { directus } from "@/directus";
import { capitalize, queryTranslations, useTranslationTable } from "@/locales";
import { readItems } from "@directus/sdk";
import { GameStarGame } from "@/types/aliases";
import { GameCard } from "@/components/Cards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  return {
    title: `${capitalize(tt["games"])} | Game*`,
  };
}

export default async function Games({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const tt = await useTranslationTable(lang);

  let games = (await directus().request(
    readItems("game_star_games", {
      filter: { published: { _eq: true } },
      ...queryTranslations,
    }),
  )) as GameStarGame[];

  return (
    <div className="content">
      <h1>{capitalize(tt["games"])}</h1>
      <div className="cards-list">
        {games.reverse().map((game) => (
          <GameCard key={game.slug} game={game} lang={lang} />
        ))}
      </div>
      {games.length === 0 ? <p>{tt["gamestar.comingSoon"]} !</p> : null}
    </div>
  );
}
