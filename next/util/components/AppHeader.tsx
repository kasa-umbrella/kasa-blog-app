import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const AppHeader = () => {
    return (
        <>
            <AppBar position="static" elevation={2}>
                <Toolbar>
                    <Link href="/">
                        <Image
                            src="/headerImage.png"
                            alt="ヘッダーロゴ"
                            priority
                            unoptimized
                            height={35}
                            width={236}
                        />
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default AppHeader;