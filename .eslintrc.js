module.exports = {
  extends: [
    "react-app",
    "react-app/jest"
  ],
  rules: {
    "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true, varsIgnorePattern: "React" }]
  },
  // Disable warnings as errors in CI environment
  overrides: [
    {
      files: ["**/*"],
      rules: {
        "no-warnings-as-errors": process.env.CI ? "off" : "error"
      }
    }
  ]
};
