import { TextArea } from '@lobehub/ui';
import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';

import { useStyles } from './style';
import { useSendMessage } from './useSend';

const InputArea = memo(() => {
  const { t } = useTranslation('common');
  const [isDragHovering, setDragHovering] = useState(false);
  const isChineseInput = useRef(false);

  const { cx, styles } = useStyles();

  const [loading, message, updateInputMessage] = useSessionStore((s) => [
    !!s.chatLoadingId,
    s.inputMessage,
    s.updateInputMessage,
  ]);

  const handleSend = useSendMessage();

  return (
    <div
      className={cx(styles.textareaContainer, isDragHovering && styles.hovering)}
      onDragEnd={() => {
        setDragHovering(false);
      }}
      onDragExit={() => {
        setDragHovering(false);
      }}
      onDragLeave={() => {
        setDragHovering(false);
      }}
      onDragOver={() => {
        if (!isDragHovering) setDragHovering(true);
      }}
    >
      <TextArea
        className={styles.textarea}
        onBlur={(e) => {
          updateInputMessage(e.target.value);
        }}
        onChange={(e) => {
          updateInputMessage(e.target.value);
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
        value={message}
      />
    </div>
  );
});

export default InputArea;
