import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useTrans from '../hooks/useTrans';
import { arrayLanguagesData } from '../lib/languagesData';

async function getNews(setNews, arrayLanguagesData) {
    const res = await axios.get(
        `https://genshin.hoyoverse.com/content/yuanshen/getContentList?pageSize=10&pageNum=1&channelId=${arrayLanguagesData[0].channelId}`,
    );
    if (res.data.retcode === 0) {
        setNews(res.data.data.list);
    }
}
export default function HomePage() {
    const [news, setNews] = useState([]);
    const trans = useTrans();
    const { locale } = useRouter();
    useEffect(() => {
        getNews(
            setNews,
            arrayLanguagesData.filter((channel) => channel.id == locale),
        );
    }, [locale]);
    return (
        <div>
            <Head>
                <title>{trans.sidebar.home}</title>
            </Head>

            {news.map((item, key) => (
                <a
                    href={`https://genshin.hoyoverse.com/${
                        locale == 'chs' || locale == 'cht' ? 'zh-tw' : locale
                    }/news/detail/${item.id}`}
                    target="_blank"
                    key={key}
                    rel="noreferrer"
                >
                    <div className="bg-white mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none hover:bg-gray-50">
                        <div className="h-52 sm:h-full sm:w-96 rounded-xl bg-gray-200 flex items-center ">
                            <Image
                                className="object-cover"
                                width={384}
                                height={192}
                                src={
                                    item?.ext[1]?.value[0]?.url ||
                                    'https://uploadstatic-sea.mihoyo.com/contentweb/20220127/2022012718144475978.jpg'
                                }
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col flex-1 gap-5 sm:p-2">
                            <div className="flex flex-1 flex-col gap-3">
                                <div className="bg-gray-200 w-full h-full rounded-2xl flex items-center">
                                    <div className="p-4 font-bold">{item.title}</div>
                                </div>
                                <div className="px-2">{item.intro}</div>
                            </div>
                            <div className="mt-auto flex gap-3">
                                <div className="bg-gray-200 w-48 h-8 rounded-full ml-auto flex justify-center items-center font-bold text-blue-500">
                                    {item.start_time}
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
