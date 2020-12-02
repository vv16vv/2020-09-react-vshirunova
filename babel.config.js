module.exports = {
    presets: [
        ["@babel/preset-env",
        {
            targets: {
                esmodules: true,
            },
        }],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
    ],
};
