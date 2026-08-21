import { ToastProvider } from "@blue-jump/design-system/toast";
import basePreview from "@blue-jump/storybook-config/preview";

import "../src/app/globals.css";

const baseDecorators = Array.isArray(basePreview.decorators)
  ? basePreview.decorators
  : basePreview.decorators
    ? [basePreview.decorators]
    : [];

const preview: typeof basePreview = {
  ...basePreview,

  parameters: {
    ...basePreview.parameters,

    nextjs: {
      ...basePreview.parameters?.nextjs,
      appDirectory: true,
      navigation: {
        ...basePreview.parameters?.nextjs?.navigation,
        pathname: "/",
        segments: [],
      },
    },
  },

  decorators: [
    ...baseDecorators,
    (Story) => (
      <>
        <Story />
        <ToastProvider />
      </>
    ),
  ],
};

export default preview;
