import nextJsConfig from "@blue-jump/eslint-config/nextjs";
import testConfig from "@blue-jump/eslint-config/test";

/** @type {import("eslint").Linter.Config[]} */
export default [...nextJsConfig, ...testConfig];
