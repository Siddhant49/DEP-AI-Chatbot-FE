import { IconButton, Stack } from "@fluentui/react";
import ReactMarkdown from "react-markdown";
import styles from "./CitationPanel.module.css";
import { ChatMessage } from "../../api";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
    messages: ChatMessage[];
    isCitationPanelOpen: boolean;
    activeCitation: [
        content: string,
        id: string,
        title: string,
        filepath: string,
        url: string,
        metadata: string
    ] | undefined;
    setIsCitationPanelOpen: (value: boolean) => void;
    blob: (props: object) => JSX.Element;
}

export const CitationPanel = ({ messages, isCitationPanelOpen, activeCitation, setIsCitationPanelOpen, blob }: Props) => {
    return (
        <>
            {messages && messages.length > 0 && isCitationPanelOpen && activeCitation && (
                <Stack.Item className={styles.citationPanel} tabIndex={0} role="tabpanel" aria-label="Citations Panel">
                    <Stack aria-label="Citations Panel Header Container" horizontal className={styles.citationPanelHeaderContainer} horizontalAlign="space-between" verticalAlign="center">
                        <span aria-label="Citations" className={styles.citationPanelHeader}>Citations</span>
                        <IconButton iconProps={{ iconName: "Cancel" }} aria-label="Close citations panel" onClick={() => setIsCitationPanelOpen(false)} />
                    </Stack>
                    <h5 className={styles.citationPanelTitle} tabIndex={0}>{activeCitation[2]}</h5>
                    <div tabIndex={0}>
                        <ReactMarkdown
                            linkTarget="_blank"
                            className={styles.citationPanelContent}
                            children={activeCitation[0]}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{ img: blob }}
                        />
                    </div>
                </Stack.Item>
            )}
        </>
    );
};