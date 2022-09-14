import GenshinData from 'genshin-data';
import { localLocale } from '../../lib/localLocale';
import Head from 'next/head';
import { Avatar, Grid } from '@nextui-org/react';
import { useState } from 'react';
import { Modal, useModal, Button, Text } from '@nextui-org/react';
import { skillFunction } from '../../lib/skillFunction';
import CharacterSkill from '../../components/CharacterSkill';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper';
import Link from 'next/link';

const menuItems = [
    { id: 0, name: 'Thuộc Tính' },
    { id: 1, name: 'Vũ Khí' },
    { id: 2, name: 'Thánh Di Vật' },
    { id: 3, name: 'Cung Mệnh' },
    { id: 4, name: 'Thiên Phú' },
    { id: 5, name: 'Tài Liệu' },
];

export function ItemModal({ bindings, setVisible, characterId, item, selectedItem, isConstellation = false }) {
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
                        {item.name}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex justify-center">
                        <Avatar
                            size="lg"
                            src={`/images/characters/skills/${characterId}/${item.id}.webp`}
                            color="primary"
                            bordered
                        />
                    </div>
                    {isConstellation && <div className="">Cung Mệnh Tầng {selectedItem + 1}</div>}
                    <div dangerouslySetInnerHTML={skillFunction(item.description)}></div>
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

export function SkillModal({ isOpenedSkills, setIsOpenedSkills, characterId, item }) {
    return (
        <div>
            <Modal
                closeButton
                open={isOpenedSkills}
                onClose={() => setIsOpenedSkills(false)}
                scroll
                width="1200px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Modal.Header>
                    <Text id="modal-title" size={18} weight="bold">
                        {item.name}
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex justify-center">
                        <Avatar
                            size="lg"
                            src={`/images/characters/skills/${characterId}/${item.id.replace(
                                'normal_attack_',
                                '',
                            )}.webp`}
                            color="primary"
                            bordered
                        />
                    </div>
                    <div dangerouslySetInnerHTML={skillFunction(item.description)}></div>
                    <CharacterSkill id={characterId} skill={item} />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={() => setIsOpenedSkills(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default function CharacterDetail({ character, characterIndex, characters, region, basePath }) {
    // console.log(character);
    const [tab, setTab] = useState(0);
    const [selectedItem, setSelectedItem] = useState(0);
    const [isConstellation, setIsConstellation] = useState(0);
    const [selectedSkill, setSelectedSkill] = useState(0);
    const [isOpenedSkills, setIsOpenedSkills] = useState(false);
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
                <div className="lg:flex flex-row-reverse items-center my-4">
                    <div className="lg:w-96">
                        <ItemModal
                            bindings={bindings}
                            setVisible={setVisible}
                            characterId={character.id}
                            item={
                                isConstellation
                                    ? character.constellations[selectedItem]
                                    : character.passives[selectedItem]
                            }
                            selectedItem={selectedItem}
                            isConstellation={isConstellation}
                        />
                        <SkillModal
                            isOpenedSkills={isOpenedSkills}
                            setIsOpenedSkills={setIsOpenedSkills}
                            characterId={character.id}
                            item={character.skills[selectedSkill]}
                        />
                    </div>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={10}
                        freeMode={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            480: {
                                slidesPerView: 7,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 9,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 11,
                                spaceBetween: 10,
                            },
                        }}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        // navigation={true}
                        modules={[FreeMode, Pagination, Navigation]}
                        className="select-none "
                        initialSlide={characterIndex}
                    >
                        {characters.map((char, key) => (
                            <SwiperSlide key={key}>
                                <Link href={`/characters/${char.id}`}>
                                    <Avatar
                                        size="lg"
                                        src={`/images/characters/avatar/${char.id}.png`}
                                        color={`${char.id == character.id ? 'error' : 'success'}`}
                                        bordered
                                        pointer
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="lg:w-48 lg:ml-10 text-center lg:text-left mt-4 font-bold text-xl lg:mt-0 lg:font-normal lg:text-base">
                        {character.element} / {character.name}
                    </div>
                </div>
                <div className="lg:flex">
                    <div className="lg:w-48 lg:ml-10 lg:text-xl flex justify-around text-center lg:text-left lg:block">
                        {menuItems.map((item, key) => (
                            <div
                                className={`cursor-pointer hover:font-semibold ${tab == key ? 'font-bold' : ''}`}
                                onClick={() => setTab(item.id)}
                                key={key}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-full flex justify-center">
                        {tab === 0 && (
                            <div>
                                <img className="lg:h-[40rem]" src={`/images/characters/ingame/${character.id}.webp`} />
                            </div>
                        )}
                        {tab === 1 && (
                            <div>
                                <img className="lg:h-[40rem]" src={`/images/characters/ingame/${character.id}.webp`} />
                            </div>
                        )}
                        {tab === 2 && (
                            <div>
                                <img className="lg:h-[40rem]" src={`/images/characters/ingame/${character.id}.webp`} />
                            </div>
                        )}
                        {tab === 3 && (
                            <div>
                                <img className="lg:h-[40rem]" src={`/images/characters/wish/${character.id}.webp`} />
                            </div>
                        )}
                        {tab === 4 && (
                            <div>
                                <img className="lg:h-[40rem]" src={`/images/characters/wish/${character.id}.webp`} />
                            </div>
                        )}
                        {tab === 5 && (
                            <div>
                                <img className="lg:h-[40rem]" src={`/images/characters/wish/${character.id}.webp`} />
                            </div>
                        )}
                    </div>
                    <div className="mx-4 lg:w-96 lg:mr-10">
                        {tab === 0 && (
                            <div className="">
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
                                    <div className="flex justify-center border rounded-xl">Đột Phá</div>
                                </div>
                            </div>
                        )}
                        {tab === 3 && (
                            <div className="flex flex-col justify-between">
                                {character.constellations.map((constellation, key) => (
                                    <div className="flex items-center my-2" key={key}>
                                        <div className="mx-2 flex items-center">
                                            <Avatar
                                                size="lg"
                                                src={`/images/characters/skills/${character.id}/${constellation.id}.webp`}
                                                color="primary"
                                                bordered
                                                pointer
                                                onClick={() => {
                                                    setVisible(true);
                                                    setSelectedItem(key);
                                                    setIsConstellation(true);
                                                }}
                                            />
                                            <div className="mx-2">{constellation.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {tab === 4 && (
                            <div className="flex flex-col justify-between">
                                {character.skills.map((skill, key) => (
                                    <div className="flex items-center my-2" key={key}>
                                        <div className="mx-2 flex items-center">
                                            <div className="w-60 mx-2 text-right">{skill.name}</div>
                                            <Avatar
                                                size="lg"
                                                src={`/images/characters/skills/${character.id}/${skill.id.replace(
                                                    'normal_attack_',
                                                    '',
                                                )}.webp`}
                                                color="primary"
                                                bordered
                                                pointer
                                                onClick={() => {
                                                    setIsOpenedSkills(true);
                                                    setSelectedSkill(key);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {character.passives.map((passive, key) => (
                                    <div className="flex items-center my-2" key={key}>
                                        <div className="mx-2 flex items-center">
                                            <div className="w-60 mx-2 text-right">{passive.name}</div>
                                            <Avatar
                                                size="lg"
                                                src={`/images/characters/skills/${character.id}/${passive.id}.webp`}
                                                color="primary"
                                                bordered
                                                pointer
                                                onClick={() => {
                                                    setVisible(true);
                                                    setSelectedItem(key);
                                                    setIsConstellation(false);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {tab === 5 && (
                            <div className="flex flex-col justify-between">
                                <div className="">
                                    <div>{character.name}</div>
                                    <div>Lồng Tiếng:</div>
                                    <div>Chinese: {character.cv.chinese}</div>
                                    <div>English: {character.cv.english}</div>
                                    <div>Japanese: {character.cv.japanese}</div>
                                    <div>Korean: {character.cv.korean}</div>
                                    <div className="border-b mb-2" />
                                    <div className="flex justify-between">
                                        <div className="">Sinh Nhật</div>
                                        <div>
                                            Ngày {character.birthday[0]} tháng {character.birthday[1]}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">Thuộc</div>
                                        <div>{character.affiliation}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">Vision</div>
                                        <div>{character.element}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">Cung Mệnh</div>
                                        <div>{character.constellation}</div>
                                    </div>
                                    <div className="">{character.description}</div>
                                </div>
                                <div className="flex">
                                    <div className="flex justify-center border rounded-xl w-1/2 mx-2">Câu Chuyện</div>
                                    <div className="flex justify-center border rounded-xl w-1/2 mx-2">Lồng Tiếng</div>
                                </div>
                            </div>
                        )}
                    </div>
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

    let characterIndex = 0;
    characters.forEach((c, key) => {
        if (c.id === character.id) {
            characterIndex = key;
        }
    });

    return {
        props: {
            character,
            characterIndex,
            characters,
            region,
            basePath: process.env.NEXT_PUBLIC_BASE_PATH,
        },
    };
}
