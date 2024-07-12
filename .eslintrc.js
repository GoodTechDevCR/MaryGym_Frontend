module.exports = {
  extends: [
    "react-app",
    "react-app/jest"
  ],
  rules: {
    "no-unused-vars": ["error", { args: "none" }],
    "jsx-a11y/iframe-has-title": "off"
  },
  overrides: [
    {
      files: ["*"],
      rules: {
        "no-unused-vars": process.env.CI ? "off" : "error"
      }
    }
  ]
};
