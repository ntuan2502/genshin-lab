import { Navbar, Dropdown, Button, Link as NextUILink, Text } from '@nextui-org/react';
import { AcmeLogo } from './AcmeLogo.js';
import { Box } from './Box.js';
import DarkMode from './DarkMode.js';
import Language from './Language.js';
import Link from 'next/link';
import { useRouter } from 'next/router.js';
import useTrans from '../hooks/useTrans.js';
import { useEffect, useRef, useState } from 'react';

function isRoute(route, string) {
    return route.includes(string);
}

export default function AppLayout({ children }) {
    const router = useRouter();
    const { locale } = useRouter();
    const trans = useTrans();
    const route = router.route;
    const toggleButtonRef = useRef();
    const [selectedToggle, setSelectedToggle] = useState(false);
    const [previousPath, setPreviousPath] = useState(router.asPath);

    const collapseMenuItems = [
        {
            url: '/',
            label: trans.sidebar.home,
        },
        {
            url: '/characters',
            label: trans.sidebar.character,
        },
        {
            url: '/artifacts',
            label: trans.sidebar.artifacts,
        },
        {
            url: '/foods',
            label: trans.sidebar.foods,
        },
    ];

    useEffect(() => {
        if (previousPath != router.asPath) {
            setPreviousPath(router.asPath);
            //xu ly sau
        }
    }, [router, selectedToggle, previousPath]);

    return (
        <div>
            <Navbar isBordered variant="sticky">
                <Navbar.Brand>
                    <Navbar.Toggle
                        showIn="xs"
                        aria-label="toggle navigation"
                        onChange={() => setSelectedToggle(!selectedToggle)}
                        ref={toggleButtonRef}
                    />
                    <AcmeLogo />
                    <Text b color="inherit" hideIn="xs">
                        ACME
                    </Text>
                </Navbar.Brand>
                <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                    {collapseMenuItems.map((item, key) => (
                        <Link key={key} href={item.url}>
                            <Navbar.Link isActive={router.asPath == item.url ? true : false} href="#">
                                {item.label}
                            </Navbar.Link>
                        </Link>
                    ))}
                </Navbar.Content>
                <Navbar.Content>
                    <DarkMode />
                    <Language />
                </Navbar.Content>
                <Navbar.Collapse>
                    {collapseMenuItems.map((item, key) => (
                        <Navbar.CollapseItem key={key}>
                            <Link href={item.url}>
                                <NextUILink
                                    color="inherit"
                                    css={{
                                        minWidth: '100%',
                                    }}
                                    href="#"
                                >
                                    {item.label}
                                </NextUILink>
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            </Navbar>
            <Box
                css={{
                    maxW: '100%',
                }}
            >
                {children}
            </Box>
        </div>
    );
}
