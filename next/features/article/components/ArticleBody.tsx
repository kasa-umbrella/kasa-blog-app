import { Box } from "@mui/material";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import Heading from "./body/Heading";
import Paragraph from "./body/Paragraph";
import remarkBreaks from "remark-breaks";

const ArticleBody = ({ body }: { body: string }) => {

    return (
        <Box>
            <ReactMarkDown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                    h1: ({ node, ...props }) => <Heading>{props.children}</Heading>,
                    h2: ({ node, ...props }) => <Heading>{props.children}</Heading>,
                    h3: ({ node, ...props }) => <Heading>{props.children}</Heading>,
                    h4: ({ node, ...props }) => <Heading>{props.children}</Heading>,
                    h5: ({ node, ...props }) => <Heading>{props.children}</Heading>,
                    h6: ({ node, ...props }) => <Heading>{props.children}</Heading>,
                    img: ({ node, ...props }) => (
                        <Box
                            component="img"
                            sx={{ width: "100%", height: "auto", my: 2 }}
                            src={typeof props.src === "string" ? props.src : undefined}
                            alt={typeof props.alt === "string" ? props.alt : undefined}
                        />
                    ),
                    p: ({ node, ...props }) => <Paragraph>{props.children}</Paragraph>,
                }}
            >
                {body}
            </ReactMarkDown>
        </Box>
    );
};

export default ArticleBody;