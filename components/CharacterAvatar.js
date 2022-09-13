import { Star } from './Star';

export function CharacterAvatar({ id, name, element, rarity }) {
    return (
        <div className="inline-block">
            <div name="Amber Icon">
                <div className="amberHover h-26 relative m-2 inline-block w-24 rounded-lg bg-itemBGR md:w-32 lg:h-auto lg:w-32 xl:w-32 hover:scale-110 ease-in">
                    <div
                        className={`flex flex-row justify-center rounded-t-lg rounded-br-3xl bg-itemShade ${
                            rarity == 5 ? 'bg-rarityFifth' : 'bg-rarityFourth'
                        }`}
                    >
                        <span>
                            <img
                                src={`/images/element/color/${element}.png`}
                                alt="Effect Icon"
                                className="absolute top-1 left-1 w-8"
                            />
                            <img
                                src={`/images/characters/avatar/${id}.png`}
                                alt="Item Icon"
                                className="h-24 rounded-t-lg rounded-br-3xl md:h-32 lg:h-32 xl:h-32"
                            />
                        </span>
                        <div className="absolute top-20.3 flex flex-row md:top-28 lg:top-28 xl:top-28">
                            <Star number={rarity} />
                        </div>
                    </div>
                    <div className=" no-scrollbar flex h-9 items-center justify-center overflow-auto rounded-b-lg bg-amberItemBGR text-center text-xs text-amberBlack lg:text-sm">
                        <span className="font-whitney leading-none">{name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
