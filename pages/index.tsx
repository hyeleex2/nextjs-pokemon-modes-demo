import Head from "next/head";
// import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface Pokemon {
  id: string;
  name: string;
  image: string;
}

export async function getServerSideProps() {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Home({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <>
      <Head>
        <title>Pokemon List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h2>Pokemon List</h2>
        <div className={styles.grid}>
          {pokemon.map((pokemon) => (
            <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
