import GenshinData from 'genshin-data';
import { localLocale } from '../../lib/localLocale';
import Head from 'next/head';
import { Avatar, Grid } from '@nextui-org/react';
import { useState } from 'react';
import { Modal, useModal, Button, Text } from '@nextui-org/react';

const menuItems = [
    { id: 0, name: 'Thuộc Tính' },
    { id: 1, name: 'Vũ Khí' },
    { id: 2, name: 'Thánh Di Vật' },
    { id: 3, name: 'Cung Mệnh' },
    { id: 4, name: 'Thiên Phú' },
    { id: 5, name: 'Tài Liệu' },
];

export function skillFunction(markup) {
    var temp = markup;
    for (let i = 0; i < 50; i++) {
        if (i % 2 == 0) temp = temp.replace(/\*\*/, '<span style="color: #FFD780FF;">');
        else temp = temp.replace(/\*\*/, '</span> ');
    }
    temp = temp
        .replace(/·/g, '- ')
        .replace(/<span>/g, '<span style="font-weight: bold;">')
        .replace(/\n/g, '<br>');
    return { __html: temp };
}

export function ConstellationModal({ bindings, setVisible, characterId, constellation, selectedConstellation }) {
    return (
        <div>
            <Modal
                scroll
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18} weight="bold">
                        {constellation.name}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex justify-center">
                        <Avatar
                            size="lg"
                            src={`/images/characters/skills/${characterId}/constellation_${constellation.id}.webp`}
                            color="primary"
                            bordered
                        />
                    </div>
                    <div className="">Cung Mệnh Tầng {selectedConstellation + 1}</div>
                    <div dangerouslySetInnerHTML={skillFunction(constellation.description)}></div>
                    {/* <Text id="modal-description"></Text> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={() => setVisible(false)}>
                        Close
                    </Button>
                    {/* <Button auto onClick={() => setVisible(false)}>
                        Agree
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default function CharacterDetail({ character, region, basePath }) {
    console.log(character);
    const [tab, setTab] = useState(0);
    const [selectedConstellation, setSelectedConstellation] = useState(0);
    const { setVisible, bindings } = useModal();
    return (
        <div>
            <Head>
                <title>{character.name}</title>
                <meta itemProp="name" content={`${character.name} - ${character.title}`} />
                <meta itemProp="description" content={character.description} />
                <meta itemProp="image" content={`${basePath}/images/characters/backgrounds/${character.id}.png`} />

                <meta itemProp="name" content={`${character.name} - ${character.title}`} />
                <meta itemProp="description" content={character.description} />
                <meta itemProp="image" content={`${basePath}/images/characters/backgrounds/${character.id}.png`} />

                <meta property="og:url" content="https://paimon.vercel.app" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${character.name} - ${character.title}`} />
                <meta property="og:description" content={character.description} />
                <meta property="og:image" content={`${basePath}/images/characters/backgrounds/${character.id}.png`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${character.name} - ${character.title}`} />
                <meta name="twitter:description" content={character.description} />
                <meta name="twitter:image" content={`${basePath}/images/characters/backgrounds/${character.id}.png`} />
            </Head>
            <div>
                <div className="flex items-center">
                    <div className="w-1/5 flex justify-center">
                        {character.element} / {character.name}
                    </div>
                    <Grid.Container gap={2} className="flex justify-center ">
                        <Grid>
                            <Avatar
                                size="lg"
                                src={`/images/characters/avatar/${character.id}.png`}
                                color="error"
                                bordered
                                pointer
                            />
                        </Grid>
                        <Grid>
                            <Avatar
                                size="lg"
                                src={`/images/characters/avatar/${character.id}.png`}
                                color="success"
                                bordered
                                pointer
                            />
                        </Grid>
                    </Grid.Container>
                    <div className="w-1/5">
                        <ConstellationModal
                            bindings={bindings}
                            setVisible={setVisible}
                            characterId={character.id}
                            constellation={character.constellations[selectedConstellation]}
                            selectedConstellation={selectedConstellation}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/4 flex-col justify-center pl-20 text-2xl">
                        {menuItems.map((item, key) => (
                            <div
                                className={`cursor-pointer hover:font-bold ${tab == key ? 'scale-110' : ''}`}
                                onClick={() => setTab(item.id)}
                                key={key}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <div className="w-1/2 flex justify-center">
                        {tab === 0 && (
                            <div>
                                <img src={`/images/characters/ingame/${character.id}.webp`} />
                            </div>
                        )}
                        {tab === 3 && (
                            <div>
                                <img src={`/images/characters/ingame/${character.id}.webp`} />
                            </div>
                        )}
                    </div>
                    {tab === 0 && (
                        <div className="w-1/4 mx-4 flex flex-col justify-between">
                            <div className="">
                                <div>{character.name}</div>
                                <div>Đột phá</div>
                                <div>Cấp 90 / 90</div>
                                <div className="border-b-2 mb-2" />
                                <div className="flex justify-between">
                                    <div className="">Giới Hạn HP</div>
                                    <div>50.000</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Tấn Công</div>
                                    <div>2.000</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Phòng Ngự</div>
                                    <div>1.000</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Tinh Thông Nguyên Tố</div>
                                    <div>0</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Giới Hạn Thể Lực</div>
                                    <div>240</div>
                                </div>
                                <div className="flex justify-center border rounded-xl">Thông Tin Chi Tiết</div>
                                <div className="">Yêu Thích</div>
                                <div className="border-b-2 mb-2" />
                                <div className="">{character.description}</div>
                            </div>
                            <div>
                                <div className="flex justify-center border rounded-xl mx-20">Đột Phá</div>
                            </div>
                        </div>
                    )}
                    {tab === 3 && (
                        <div className="flex flex-col justify-between">
                            {character.constellations.map((constellation, key) => (
                                <div className="flex items-center" key={key}>
                                    <div className="mx-2">
                                        <Avatar
                                            size="lg"
                                            src={`/images/characters/skills/${character.id}/constellation_${constellation.id}.webp`}
                                            color="primary"
                                            bordered
                                            pointer
                                            onClick={() => {
                                                setVisible(true);
                                                setSelectedConstellation(key);
                                            }}
                                        />
                                        {constellation.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const genshinData = new GenshinData({ language: localLocale(ctx.locale) });
    const characters = await genshinData.characters();
    const character = characters.find((c) => c.id === ctx.params.name);

    const genshinData1 = new GenshinData();
    const characters1 = await genshinData1.characters();
    const character1 = characters1.find((c) => c.id === ctx.params.name);
    var region = 'Mondstadt';
    if (character1.region) region = character1.region;

    return {
        props: {
            character,
            region,
            basePath: process.env.NEXT_PUBLIC_BASE_PATH,
        },
    };
}
