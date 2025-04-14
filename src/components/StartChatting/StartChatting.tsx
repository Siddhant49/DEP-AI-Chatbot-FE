import { Stack } from "@fluentui/react"

import styles from './StartChatting.module.css';

import Logo_CNH_Industrial from "../../assets/Logo_CNH_Industrial.svg";

export const StartChatting = () => {

    const title = import.meta.env.VITE_CHAT_TITLE || "Start chatting";
    const subTitle = import.meta.env.VITE_CHAT_SUBTITLE || "Ask your questions";

    return(
        <Stack className={styles.chatEmptyState}>
            <img src={Logo_CNH_Industrial} className={styles.chatIcon} aria-hidden="true" />
            <h1 className={styles.chatEmptyStateTitle}>{title}</h1>
            <h2 className={styles.chatEmptyStateSubtitle}>{subTitle}</h2>
        </Stack>
    )
}