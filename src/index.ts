import VM from 'vm';
import JestUtils from 'jest-util';
import { ModuleMocker } from 'jest-mock';
import { JestFakeTimers } from '@jest/fake-timers';
import { JestEnvironment, EnvironmentContext } from '@jest/environment';
import { AsyncWindow } from 'happy-dom';
import { Script } from 'vm';
import { Global, Config } from '@jest/types';

/**
 * Happy DOM Jest Environment.
 */
export default class HappyDOMEnvironment implements JestEnvironment {
	public fakeTimers: JestFakeTimers<number> = null;
	public global: Global.Global = <Global.Global>this.createContext();
	public moduleMocker: ModuleMocker = new ModuleMocker(this.global);

	/**
	 * Constructor.
	 *
	 * @param {Config} config Jest config.
	 * @param {EnvironmentContext} options Options.
	 */
	constructor(config: Config.ProjectConfig, options: EnvironmentContext = {}) {
		const global = this.global;
		const timerConfig = {
			idToRef: (id: number) => id,
			refToId: (ref: number) => ref
		};

		// Node's error-message stack size is limited at 10, but it's pretty useful
		// to see more than that when a test fails.
		global.Error.stackTraceLimit = 100;
		
		JestUtils.installCommonGlobals(this.global, config.globals);

		if (options.console) {
			global.console = options.console;
			global.window.console = options.console;
		}

		this.fakeTimers = new JestFakeTimers({
			config,
			global,
			moduleMocker: this.moduleMocker,
			timerConfig
		});
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
		this.fakeTimers.dispose();
		this.global.window.dispose();

		this.global = null;
		this.moduleMocker = null;
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
		return script.runInContext(this.global);
	}

	/**
	 * Creates a context.
	 *
	 * @return {VM.Context} Context.
	 */
	private createContext(): VM.Context {
		const window = new AsyncWindow();
		return VM.createContext(Object.assign({}, global, window, { window }));
	}
}
