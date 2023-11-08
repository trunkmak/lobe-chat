import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    hoverContainer: css`
      pointer-events: none;

      position: absolute;
      z-index: 100;

      width: 100%;
      height: 100%;

      background: ${token.colorFillSecondary};
      border: 4px solid ${token.colorBorder};
      border-radius: 2px;
    `,
    hovering: css``,
    textarea: css`
      height: 100% !important;
      padding: 0 24px;
      line-height: 1.5;
    `,
    textareaContainer: css`
      position: relative;
      flex: 1;
    `,
  };
});
