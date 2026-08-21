import nextJsConfig from "@blue-jump/eslint-config/nextjs";
import testConfig from "@blue-jump/eslint-config/test";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  ...testConfig,

  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^@blue-jump/design-system/web(?:/|$)",
              message:
                "apps/admin에서는 @blue-jump/design-system/web을 import할 수 없습니다. admin UI는 @blue-jump/design-system/admin을 사용하세요.",
            },
          ],
        },
      ],
    },
  },
];
