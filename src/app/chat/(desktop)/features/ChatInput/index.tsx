import { DraggablePanel } from '@lobehub/ui';
import { memo, useState } from 'react';

import { CHAT_TEXTAREA_HEIGHT, HEADER_HEIGHT } from '@/const/layoutTokens';
import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';

import ChatInputArea from './Desktop';
import Footer from './Footer';

const ChatInputDesktopLayout = memo(() => {
  const [expand, setExpand] = useState<boolean>(false);
  const [message, setMessage] = useState('');

  const [inputHeight, updatePreference] = useGlobalStore((s) => [
    s.preference.inputHeight,
    s.updatePreference,
  ]);

  const [isLoading, sendMessage, stopGenerateMessage] = useSessionStore((s) => [
    !!s.chatLoadingId,
    s.sendMessage,
    s.stopGenerateMessage,
  ]);

  return (
    <DraggablePanel
      fullscreen={expand}
      headerHeight={HEADER_HEIGHT}
      minHeight={CHAT_TEXTAREA_HEIGHT}
      onSizeChange={(_, size) => {
        if (!size) return;

        updatePreference({
          inputHeight: typeof size.height === 'string' ? Number.parseInt(size.height) : size.height,
        });
      }}
      placement="bottom"
      size={{ height: inputHeight, width: '100%' }}
      style={{ zIndex: 10 }}
    >
      <ChatInputArea
        expand={expand}
        footer={<Footer />}
        loading={isLoading}
        minHeight={CHAT_TEXTAREA_HEIGHT}
        onExpandChange={setExpand}
        onInputChange={setMessage}
        onSend={sendMessage}
        onStop={stopGenerateMessage}
        value={message}
      />
    </DraggablePanel>
  );
});

export default ChatInputDesktopLayout;
