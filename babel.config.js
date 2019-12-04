module.exports = api => {
  api.cache(true);
  const presets = ["next/babel"];
  const plugins = [
    "relay",
    "ts-optchain",
    [
      "transform-imports",
      {
        lodash: {
          transform: "lodash/${member}",
          preventFullImport: true,
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
