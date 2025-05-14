module.exports = {
	presets: [
		["@babel/preset-typescript"],
		[
			"@babel/preset-react",
			{
				runtime: "classic",        // 👈 nécessaire pour utiliser jsxFactory
				pragma: "h",               // 👈 ta fonction JSX (comme React.createElement)
				pragmaFrag: "Fragment",    // 👈 optionnel si tu utilises les `<>...</>`
			},
		],
	],
};
