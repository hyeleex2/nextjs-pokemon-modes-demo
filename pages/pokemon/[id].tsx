import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Details.module.css";
// import { Head } from "next/document";
import Link from "next/link";
import { Pokemon as PokemonType } from "..";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

type Stats = {
  name: string;
  value: number;
};
interface Pokemon {
  name: string;
  type: string[];
  stats: Stats[];
  image: string;
}

export async function getStaticPaths() {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
  );
  const pokemon: PokemonType[] = await resp.json();
  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params?.id}.json`
  );
  const pokemon: Pokemon = await resp.json();
  return {
    props: {
      pokemon,
    },
  };
}

export default function Details({
  pokemon,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <div>
      {/* <Head>
        <title>{pokemon?.name}</title>
      </Head> */}
      <div>
        <Link href="/">Back to home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`}
            alt={pokemon?.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon?.name}</div>
          <div className={styles.type}>{pokemon?.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
