import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";

const AppHeader = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Image
                        src="/headerImage.png"
                        alt="ヘッダーロゴ"
                        loading="eager"
                        height={35}
                        width={236}
                    />
                </Toolbar>
            </AppBar>
        </>
    );
};

export default AppHeader;