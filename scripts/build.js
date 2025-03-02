#!/usr/bin/env node
const { dirname } = require("path");
const { build } = require("vite");

/** @type 'production' | 'development' */
const mode = (process.env.MODE = process.env.MODE || "production");

const packagesConfigs = ["packages/electron/vite.config.js", "packages/preload/vite.config.js", "packages/vue/vite.config.js"];

/**
 * Run `vite build` for config file
 */
const buildByConfig = configFile => build({ configFile, mode });
(async() => {
	try {
		const totalTimeLabel = "Total bundling time";
		console.time(totalTimeLabel);

		for (const packageConfigPath of packagesConfigs) {
			const consoleGroupName = `${dirname(packageConfigPath)}/`;
			console.group(consoleGroupName);

			const timeLabel = "Bundling time";
			console.time(timeLabel);

			await buildByConfig(packageConfigPath);

			console.timeEnd(timeLabel);
			console.groupEnd();
			console.log("\n"); // Just for pretty print
		}
		console.timeEnd(totalTimeLabel);
	}
	catch (e) {
		console.error(e);
		process.exit(1);
	}
})();
