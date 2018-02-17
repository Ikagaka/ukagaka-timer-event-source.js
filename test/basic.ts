/// <reference types="mocha" />
// tslint:disable no-implicit-dependencies
import { TimerEventSource } from "../lib/ukagaka-timer-event-source";

import * as assert from "power-assert";
import * as sinon from "sinon";

/** @test {TimerEventSource} */
describe("TimerEventSource", () => {
  let timer: sinon.SinonFakeTimers;
  before(() => timer = sinon.useFakeTimers());
  after(() => timer.restore());

  /** @test {GhostKernel#constructor} */
  context("constructor", () => {
    it("basic", () => { assert(new TimerEventSource() instanceof TimerEventSource); });
  });
});
