import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useTrans from '../../hooks/useTrans';
import { arrayLanguagesData } from '../../lib/languagesData';
import { localLocale } from '../../lib/localLocale';
import GenshinData from 'genshin-data';
import { CharacterAvatar } from '../../components/CharacterAvatar';
import Link from 'next/link';

export default function Characters({ characters, charactersElement }) {
    const trans = useTrans();
    // console.log(characters);
    return (
        <>
            <Head>
                <title>{trans.sidebar.character} | Paimon Data</title>
            </Head>
            <div className="flex flex-wrap justify-center">
                <CharacterAvatar id="nilou" name="Nilou" element="hydro" rarity={5} />
                <CharacterAvatar id="cyno" name="Cyno" element="electro" rarity={5} />
                <CharacterAvatar id="candace" name="Candace" element="hydro" rarity={4} />
                {characters.map((character, key) => (
                    <Link key={key} href={`/characters/${character.id}`}>
                        <a>
                            <CharacterAvatar
                                id={character.id}
                                name={character.name}
                                element={charactersElement[key].element}
                                rarity={character.rarity}
                            />
                        </a>
                    </Link>
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps(ctx) {
    const genshinData = new GenshinData({ language: localLocale(ctx.locale) });
    const characters = await genshinData.characters({
        select: ['id', 'name', 'rarity'],
    });

    const genshinData2 = new GenshinData();
    const charactersElement = await genshinData2.characters({
        select: ['id', 'element'],
    });

    return {
        props: {
            characters,
            charactersElement,
        },
    };
}
