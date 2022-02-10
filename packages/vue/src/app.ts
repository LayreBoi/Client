// This is where all the different modules of the frontend
// live and talk to each other, the reason for this file is to avoid
// conflicting circular dependancies of modules requiring each other to be
// initialized before themselves which is a massive code structure issue

import { ShortcutManager } from "/@/services/ShortcutManager";
import { API } from "/@/services/api";
import { SoundManager } from "/@/services/SoundManager";
import { AppState } from "/@/services/state/AppState";

/**
 * This is the middle-end that connects all the modules together so they have
 * a common ground to talk to each other with the dependency injection paradigm
 *
 * hopefully this code structure will scale well in the end
 */
export class Xornet {
	private api: API = new API();
	public state: AppState = new AppState(this.api);
	public shortcutManager: ShortcutManager = new ShortcutManager(this.state.window);
	public soundManager: SoundManager = new SoundManager(this.state);

	constructor() {
		this.state.sync();
		this.state.machines.fetchMachines();
		this.api.createWebsocketConnection(this.state);
	}
}

// Alias function for scope bounds
const xornet = new Xornet();

// Alias function for scope bounds
export const useState = () => xornet.state;
export const useSoundManager = () => xornet.soundManager;

// Export the middle-end as a default export
export default xornet;
