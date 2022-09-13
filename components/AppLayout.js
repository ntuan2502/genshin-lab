import { Navbar, Dropdown, Button, Link as NextUILink, Text } from '@nextui-org/react';
import { AcmeLogo } from './AcmeLogo.js';
import { Box } from './Box.js';
import DarkMode from './DarkMode.js';
import Language from './Language.js';
import Link from 'next/link';
import { useRouter } from 'next/router.js';
import useTrans from '../hooks/useTrans.js';

function isRoute(route, string) {
    return route.includes(string);
}

export default function AppLayout({ children }) {
    const router = useRouter();
    const { locale } = useRouter();
    const trans = useTrans();
    const route = router.route;

    const collapseItems = [
        'Features',
        'Customers',
        'Pricing',
        'Company',
        'Legal',
        'Team',
        'Help & Feedback',
        'Login',
        'Sign Up',
    ];

    return (
        <div>
            <Navbar isBordered variant="sticky">
                <Navbar.Brand>
                    <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
                    <AcmeLogo />
                    <Text b color="inherit" hideIn="xs">
                        ACME
                    </Text>
                </Navbar.Brand>
                <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                    <Link href="/">
                        <Navbar.Link isActive href="#">
                            {trans.sidebar.home}
                        </Navbar.Link>
                    </Link>
                    <Link href="/characters">
                        <Navbar.Link href="#">{trans.sidebar.character}</Navbar.Link>
                    </Link>
                    <Link href="/artifacts">
                        <Navbar.Link href="#">{trans.sidebar.artifacts}</Navbar.Link>
                    </Link>
                    <Link href="/foods">
                        <Navbar.Link href="#">{trans.sidebar.foods}</Navbar.Link>
                    </Link>
                </Navbar.Content>
                <Navbar.Content>
                    <DarkMode />
                    <Language />
                </Navbar.Content>
                <Navbar.Collapse>
                    {collapseItems.map((item, index) => (
                        <Navbar.CollapseItem key={item}>
                            <NextUILink
                                color="inherit"
                                css={{
                                    minWidth: '100%',
                                }}
                                href="#"
                            >
                                {item}
                            </NextUILink>
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
