import VM from 'vm';
import { ModuleMocker } from 'jest-mock';
import { JestFakeTimers as FakeTimers } from '@jest/fake-timers';
import { JestEnvironment, EnvironmentContext } from '@jest/environment';
import { Window } from 'happy-dom';
import { Script } from 'vm';
import { Global, Config } from '@jest/types';
import { installCommonGlobals } from 'jest-util';

/**
 * Happy DOM Jest Environment.
 */
export default class HappyDOMEnvironment implements JestEnvironment {
	public fakeTimers: FakeTimers<number> | null;
	public global: Global.Global;
	public moduleMocker: ModuleMocker | null;
	private context: VM.Context = this.createContext();

	/**
	 * Constructor.
	 *
	 * @param {Config} config Jest config.
	 * @param {EnvironmentContext} options Options.
	 */
	constructor(config: Config.ProjectConfig, options: EnvironmentContext = {}) {
		const global = <Global.Global>(<unknown>new Window());
		const moduleMocker = new ModuleMocker(global);
		const timerConfig = {
			idToRef: (id: number) => id,
			refToId: (ref: number) => ref
		};

		if (options.console) {
			global.console = options.console;
		}

		this.global = global;
		this.fakeTimers = new FakeTimers({
			config,
			global,
			moduleMocker,
			timerConfig
		});

		installCommonGlobals(this.global, config.globals);
	}

	/**
	 * Setup.
	 *
	 * @return {Promise<void>} Promise.
	 */
	public setup(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * Teardown.
	 *
	 * @return {Promise<void>} Promise.
	 */
	public teardown(): Promise<void> {
		if (this.fakeTimers) {
			this.fakeTimers.dispose();
		}

		if (this.global) {
			this.global.dispose();
		}

		this.global = null;
		this.fakeTimers = null;

		return Promise.resolve();
	}

	/**
	 * Runs a script.
	 *
	 * @param {Script} script Script.
	 * @returns {any} Result.
	 */
	public runScript(script: Script): null {
		if (this.context) {
			return this.context.runVMScript(script);
		}
		return null;
	}

	/**
	 * Creates a context.
	 *
	 * @return {VM.Context} Context.
	 */
	private createContext(): VM.Context {
		const window = new Window();
		const global = Object.assign({}, window, { window });
		return VM.createContext(global);
	}
}
