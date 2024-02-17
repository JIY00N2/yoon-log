/** @type {import('next').NextConfig} */

const path = require("path");
const stylexPlugin = require("@stylexjs/nextjs-plugin");
const removeImports = require("next-remove-imports")();

module.exports = stylexPlugin({
  aliases: {
    "@/*": [path.join(__dirname, "*")],
  },
  rootDir: __dirname,
})(
  removeImports({
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "oxpdlbqcseajmjnxawbb.supabase.co",
        },
      ],
    },
  }),
);
