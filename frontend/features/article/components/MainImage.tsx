import Image from 'next/image';
import { Box } from "@mui/material";

interface MainImageProps {
    imageUrl: string;
    alt?: string;
}

const MainImage = ({ imageUrl, alt = "Article image" }: MainImageProps) => {
    return (
        <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, sm: 300, md: 400 } }}>
            <Image
                src={imageUrl}
                alt={alt}
                fill
                style={{ objectFit: 'cover' }}
                priority
            />
        </Box>
    );
};

export default MainImage;