import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      position: relative;

      display: flex;
      flex-direction: column;
      gap: 8px;

      height: 100%;
      padding: 12px 0 16px;
    `,
    footerBar: css`
      display: flex;
      flex: none;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;

      padding: 0 24px;
    `,
    hovering: css`
      background: ${token.colorPrimaryBorder};
    `,
    textarea: css`
      height: 100% !important;
      padding: 0 24px;
      line-height: 1.5;
    `,
    textareaContainer: css`
      position: relative;
      flex: 1;
      border: 1px solid red;
    `,
  };
});
