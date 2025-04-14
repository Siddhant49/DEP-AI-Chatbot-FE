import { CommandBarButton, Dialog, DialogType, Stack } from "@fluentui/react"
import { SquareRegular } from "@fluentui/react-icons"
import { QuestionInput } from "../QuestionInput"
import styles from './AiSectionInput.module.css'
import { Action, AppState } from "../../state/AppProvider";
import { DBStatus } from "../../api";

interface Props {
    isLoading: boolean;
    stopGenerating: () => void;
    appStateContext: {
        state: AppState;
        dispatch: React.Dispatch<Action>;
    } | undefined
    newChat: () => void;
    disabledButton: () => boolean;
    clearChat: () => Promise<void>;
    hideErrorDialog: boolean;
    handleErrorDialogClose: () => void;
    errorDialogContentProps: {
        type: DialogType;
        title: string | undefined;
        closeButtonAriaLabel: string;
        subText: string | undefined;
    }
    modalProps: {
        titleAriaId: string;
        subtitleAriaId: string;
        isBlocking: boolean;
        styles: {
            main: {
                maxWidth: number;
            };
        };
    }
    makeApiRequestWithDB: (question: string, conversationId?: string) => Promise<void>;
    makeApiRequestWithoutDB: (question: string, conversationId?: string) => Promise<void>;
}

export const AiSectionInput = ({ isLoading, stopGenerating, appStateContext, newChat, disabledButton, clearChat, hideErrorDialog, handleErrorDialogClose, errorDialogContentProps, modalProps, makeApiRequestWithDB, makeApiRequestWithoutDB }: Props) => {
    return (
        <div className={styles.chatInput}>
            {isLoading && (
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                <Stack
                    horizontal
                    className={styles.stopGeneratingContainer}
                    role="button"
                    aria-label="Stop generating"
                    tabIndex={0}
                    onClick={stopGenerating}
                    onKeyDown={e => e.key === "Enter" || e.key === " " ? stopGenerating() : null}
                >
                    <SquareRegular className={styles.stopGeneratingIcon} aria-hidden="true" />
                    <span className={styles.stopGeneratingText} aria-hidden="true">Stop generating</span>
                </Stack>
                </div>
            )}
            <div className={styles.container}>
                <div className={styles.buttonContainer} >
                    {appStateContext?.state.isDBAvailable?.status !== DBStatus.NotConfigured && <CommandBarButton
                        role="button"
                        styles={{
                            icon: {
                                color: '#FFFFFF',
                            },
                            root: {
                                color: '#FFFFFF',
                                background: "radial-gradient(109.81% 107.82% at 100.1% 90.19%, #0F6CBD 33.63%, #2D87C3 70.31%, #8DDDD8 100%)"
                            },
                            rootDisabled: {
                                background: "#BDBDBD"
                            }
                        }}
                        className={styles.chatIcon}
                        iconProps={{ iconName: 'Add' }}
                        onClick={newChat}
                        disabled={disabledButton()}
                        aria-label="start a new chat button"
                    />}
                    {appStateContext?.state.isDBAvailable?.status !== DBStatus.NotConfigured && <CommandBarButton
                        role="button"
                        styles={{
                            icon: {
                                color: '#FFFFFF',
                            },
                            root: {
                                color: '#FFFFFF',
                                background: disabledButton() ? "#BDBDBD" : "radial-gradient(109.81% 107.82% at 100.1% 90.19%, #0F6CBD 33.63%, #2D87C3 70.31%, #8DDDD8 100%)",
                                cursor: disabledButton() ? "" : "pointer"
                            },
                        }}
                        className={styles.chatIcon}
                        iconProps={{ iconName: 'Broom' }}
                        onClick={clearChat}
                        disabled={disabledButton()}
                        aria-label="clear chat button"
                    />}
                </div>
                <Dialog
                    hidden={hideErrorDialog}
                    onDismiss={handleErrorDialogClose}
                    dialogContentProps={errorDialogContentProps}
                    modalProps={modalProps}
                >
                </Dialog>
                <QuestionInput
                clearOnSend
                placeholder="Type a new question..."
                disabled={isLoading}
                onSend={(question, id) => {
                    appStateContext?.state.isDBAvailable?.DB ? makeApiRequestWithDB(question, id) : makeApiRequestWithoutDB(question, id)
                }}
                conversationId={appStateContext?.state.currentChat?.id ? appStateContext?.state.currentChat?.id : undefined}
            />
            </div>
        </div>
    )
}