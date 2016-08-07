import {TimerEventSource} from '../src/lib/timer-event-source';

import assert from 'power-assert';

/** @test {TimerEventSource} */
describe('TimerEventSource', function() {
  lazy('instance', function() { return new TimerEventSource() });
  /** @test {GhostKernel#constructor} */
  context('constructor', function() {
    it('basic', function() { assert(this.instance instanceof TimerEventSource) });
  });
});
