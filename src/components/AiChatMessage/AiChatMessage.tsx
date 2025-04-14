

import { Stack } from '@fluentui/react';
import { ChatMessage, Citation, ToolMessageContent } from '../../api';
import { Answer } from '../Answer';
import styles from './AiChatMessage.module.css'
import { ErrorCircleRegular } from '@fluentui/react-icons';

interface Props {
    messages?: ChatMessage[];
    onShowCitation: (citation: Citation) => void;
    parseCitationFromMessage: (message: ChatMessage) => Citation[];
    showLoadingMessage: boolean;
}

export const AiChatMessage = ({messages, onShowCitation, parseCitationFromMessage, showLoadingMessage} : Props) => {

  return (
    <div className={styles.chatContainer}>
    {messages&&messages.map((answer, index) => (
        <>
            {answer.role === "user" ? (
                <div className={styles.chatMessageUser} tabIndex={0}>
                    <div className={styles.chatMessageUserMessage}>{answer.content}</div>
                </div>
            ) : (
                answer.role === "assistant" ? <div className={styles.chatMessageGpt}>
                    <Answer
                        answer={{
                            answer: answer.content,
                            citations: parseCitationFromMessage(messages[index - 1]),
                        }}
                        onCitationClicked={c => onShowCitation(c)}
                    />
                </div> : answer.role === "error" ? <div className={styles.containerError}>
                    <div className={styles.chatMessageError}>
                    <Stack horizontal className={styles.chatMessageErrorContent}>
                        <ErrorCircleRegular className={styles.errorIcon} />
                        <span>Error</span>
                    </Stack>
                    <span className={styles.chatMessageErrorContent}>{answer.content}</span>
                    </div>
                </div> : null
            )}
        </>
    ))}
    {showLoadingMessage && <div className={styles.chatMessageGpt}>
                                            <Answer
                                                answer={{
                                                    answer: "Generating answer...",
                                                    citations: []
                                                }}
                                                onCitationClicked={() => null}
                                            />
                                        </div>}
    </div>
  )
}
