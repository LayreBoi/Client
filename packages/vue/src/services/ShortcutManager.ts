import { onKeyStroke, useKeyModifier } from "@vueuse/core";
import router from "/@/router";
import { isElectron } from "/@/services/logic";
import type { WindowState } from "/@/services/state/WindowState";

export class ShortcutManager {
	public ctrl = useKeyModifier("Control");
	public shift = useKeyModifier("Shift");

	constructor(public windowState: WindowState) {
		isElectron()
			? onKeyStroke("P", () => this.ctrl.value && (this.windowState.isShowingCommandPallete = true))
			: onKeyStroke("k", (e) => { this.ctrl.value && e.preventDefault(); this.ctrl.value && (this.windowState.isShowingCommandPallete = true); });
		onKeyStroke("1", (e) => { this.ctrl.value && e.preventDefault(); this.ctrl.value && router.push({ name: "machines" }); });
		onKeyStroke("2", (e) => { this.ctrl.value && e.preventDefault(); this.ctrl.value && router.push({ name: "settings" }); });
		onKeyStroke("3", (e) => { this.ctrl.value && e.preventDefault(); this.ctrl.value && router.push({ name: "profile" }); });
	}
}
