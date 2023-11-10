import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  textarea: css`
    height: 100% !important;
    padding: 0 24px;
    line-height: 1.5;
  `,
  textareaContainer: css`
    position: relative;
    flex: 1;
  `,
}));
