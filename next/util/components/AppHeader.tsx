import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const AppHeader = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/">
                        <Image
                            src="/headerImage.png"
                            alt="ヘッダーロゴ"
                            loading="eager"
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