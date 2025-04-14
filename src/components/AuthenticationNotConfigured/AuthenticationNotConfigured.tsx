import { Stack } from "@fluentui/react"
import { ShieldLockRegular } from "@fluentui/react-icons"

import styles from './AuthenticationNotConfigured.module.css';

export const AutenticationNotConfigured = () => {

    return(
        <Stack className={styles.chatEmptyState}>
            <ShieldLockRegular className={styles.chatIcon} style={{color: 'darkorange', height: "200px", width: "200px"}}/>
            <h1 className={styles.chatEmptyStateTitle}>Authentication Not Configured</h1>
            <h2 className={styles.chatEmptyStateSubtitle}>This app does not have authentication configured. Please add an identity provider</h2>
            <h2 className={styles.chatEmptyStateSubtitle} style={{fontSize: "20px"}}><strong>Authentication configuration takes a few minutes to apply. </strong></h2>
            <h2 className={styles.chatEmptyStateSubtitle} style={{fontSize: "20px"}}><strong>If you deployed in the last 10 minutes, please wait and reload the page after 10 minutes.</strong></h2>
        </Stack>
    )
}