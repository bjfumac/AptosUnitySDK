import { requestAnimationFrame, cancelAnimationFrame } from './requestAnimationFrame.js';
var Game;
(function(Game) {
    /**
     * 轮循环执行器
     */ class Ticker {
        get maxFps() {
            return this._maxFps;
        }
        set maxFps(val) {
            this._maxFps = val;
            this.maxIntervalTime = 1000 / val;
        }
        start() {
            this.isPlay = true;
            this.time = requestAnimationFrame(this.loop.bind(this), this.maxIntervalTime);
        }
        stop() {
            this.isPlay = false;
            cancelAnimationFrame(this.time);
        }
        loop(deltaTime, performance) {
            if (!this.isPlay) {
                return;
            }
            if (deltaTime) {
                for(let i = 0, len = Ticker.tasks.length; i < len; i++){
                    const run = Ticker.tasks[i];
                    run(deltaTime, performance);
                }
            }
            if (Ticker.tempTasks) {
                // 本轮执行完成，如果有新任，则将临时队列替换为要正式执行的任务
                Ticker.tasks = Ticker.tempTasks;
                Ticker.tempTasks = null;
            }
            this.time = requestAnimationFrame(this.loop.bind(this), this.maxIntervalTime);
        }
        static add(fn) {
            if (Ticker.tasks.indexOf(fn) < 0) {
                Ticker.tasks.push(fn);
            }
        }
        static remove(fn) {
            const index = Ticker.tasks.indexOf(fn);
            if (index > -1) {
                // 将新的执行任务临时存放起来，防止当前任务未结束前修改任务列表导致的其它问题
                Ticker.tempTasks = [
                    ...Ticker.tasks.slice(0, index),
                    ...Ticker.tasks.slice(index + 1)
                ];
            }
        }
        constructor(maxFps){
            this.isPlay = true;
            this.maxFps = maxFps;
        }
    }
    Ticker.tasks = [];
    Game.Ticker = Ticker;
})(Game || (Game = {}));
export default Game.Ticker;

//# sourceMappingURL=Ticker.js.map