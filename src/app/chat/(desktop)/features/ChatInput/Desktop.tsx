import { ActionIcon, Icon, TextArea } from '@lobehub/ui';
import { Button } from 'antd';
import { Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { CSSProperties, ReactNode, memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useControlledState from 'use-merge-value';

import Action from '@/app/chat/features/ChatInput/ActionBar';
import { CHAT_TEXTAREA_HEIGHT } from '@/const/layoutTokens';

import { useStyles } from './style';

export type ChatInputAreaDesktop = {
  expand?: boolean;
  footer?: ReactNode;
  loading?: boolean;
  minHeight?: number;
  onExpandChange?: (expand: boolean) => void;
  onInputChange?: (value: string) => void;
  onSend?: (value: string) => void;
  onStop?: () => void;
  textareaStyle?: CSSProperties;
  value?: string;
};

const ChatInputArea = memo<ChatInputAreaDesktop>(
  ({
    footer,
    expand,
    onExpandChange,
    onSend,
    loading,
    onInputChange,

    onStop,
    value,
  }) => {
    const { t } = useTranslation('common');

    const [currentValue, setCurrentValue] = useControlledState<string>('', {
      onChange: onInputChange,
      value,
    });
    const { cx, styles } = useStyles();
    const isChineseInput = useRef(false);

    const handleSend = useCallback(() => {
      if (loading) return;
      if (onSend) onSend(currentValue);
      setCurrentValue('');
    }, [currentValue]);

    return (
      <section className={cx(styles.container)} style={{ minHeight: CHAT_TEXTAREA_HEIGHT }}>
        <Action
          message={currentValue}
          rightExtra={
            <ActionIcon
              icon={expand ? Minimize2 : Maximize2}
              onClick={() => {
                onExpandChange?.(!expand);
              }}
            />
          }
        />
        <div className={styles.textareaContainer}>
          <TextArea
            className={styles.textarea}
            onBlur={(e) => {
              setCurrentValue(e.target.value);
            }}
            onChange={(e) => {
              setCurrentValue(e.target.value);
            }}
            onCompositionEnd={() => {
              isChineseInput.current = false;
            }}
            onCompositionStart={() => {
              isChineseInput.current = true;
            }}
            onPressEnter={(e) => {
              if (!loading && !e.shiftKey && !isChineseInput.current) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t('sendPlaceholder', { ns: 'chat' })}
            resize={false}
            type="pure"
            value={currentValue}
          />
        </div>
        <div className={styles.footerBar}>
          {footer}
          {loading ? (
            <Button icon={loading && <Icon icon={Loader2} spin />} onClick={onStop}>
              {t('stop')}
            </Button>
          ) : (
            <Button onClick={handleSend} type={'primary'}>
              {t('send')}
            </Button>
          )}
        </div>
      </section>
    );
  },
);

export default ChatInputArea;
