import { EventEmitter } from "events";

/**
 * タイマーイベントエミッタ
 * TODO: 将来的にWebWorkerなどにして精度を担保する
 */
export class TimerEventSource extends EventEmitter {
  private _second: number;

  /**
   * constructor
   */
  constructor() {
    super();
    this._setInitialTimers();
  }

  private _setInitialTimers() {
    const _emitSecondEvent = this._emitSecondEvent.bind(this);
    setTimeout(() => this._setTimers(_emitSecondEvent), 1000 - new Date().getMilliseconds());
  }

  private _setTimers(_emitSecondEvent: () => void) {
    const time = new Date();
    // 9.999秒とかに最初に発火された時対策 初期誤差±500msにおさえる
    this._second = time.getSeconds() - 1 + time.getMilliseconds() > 500 ? 1 : 0;
    setTimeout(_emitSecondEvent, 0);
    setInterval(_emitSecondEvent, 1000);
  }

  private _emitSecondEvent() {
    this._second++;
    setTimeout(() => this.emit("second_change"), 0);
    if (this._second % 60 === 0) { // イベントが遅延する場合を考えて
      this._second = 0;
      setTimeout(() => this.emit("minute_change"), 0);
    }
  }
}
