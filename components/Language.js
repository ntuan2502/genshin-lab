import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Dropdown } from '@nextui-org/react';
import { arrayLanguagesData } from '../lib/languagesData';

export default function Language() {
    const router = useRouter();
    const changeLanguage = (e) => {
        router.push(router.asPath, router.asPath, { locale: e });
    };

    const [selected, setSelected] = useState(new Set([router.locale]));
    const selectedValue = useMemo(() => Array.from(selected).join(', ').replaceAll('_', ' '), [selected]);

    return (
        <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
                {arrayLanguagesData.map((language) => (language.id == selectedValue ? language.name : ''))}
            </Dropdown.Button>
            <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={(e) => {
                    setSelected(e);
                    changeLanguage(e.currentKey);
                }}
            >
                {arrayLanguagesData.map((language) => (
                    <Dropdown.Item key={language.id}>{language.name}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
