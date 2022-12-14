import { TestResult } from "./test-result";
import { TestState } from "./teststate";

export class Testable {
    run(): void | Promise<void> {};
    getResult(): TestResult[] { return [] };

    get state(): TestState {
        if (!this.isTestResultExist())
            return TestState.NotBeTested;
        if (this.isFailedTestResultExist())
            return TestState.Failed;
        return TestState.Succeeded;
    }

    private isTestResultExist(): boolean {
        return this.getResult().length > 0;
    }

    private isFailedTestResultExist(): boolean {
        const failedTest = this.getResult().find(test => test.isSuccess === false);
        const isFailedTestExist = failedTest !== undefined;
        return isFailedTestExist;
    }

    static getTestName(test: Testable): string {
        return test.constructor
            .toString()
            .split(' ')[1]
            .slice(0, -2);
    }
}
