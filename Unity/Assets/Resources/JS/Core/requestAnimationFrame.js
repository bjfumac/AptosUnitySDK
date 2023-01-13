const obj = globalThis || window || {};
const _requestAnimationFrame = obj.requestAnimationFrame || obj.setTimeout;
const _cancelAnimationFrame = obj.cancelAnimationFrame || obj.clearTimeout;
let lastTime;
const customRequestAnimationFrame = (callback, intervalTime)=>{
    const fun = ()=>{
        const currentTime = performance.now();
        // 当前时间
        lastTime = lastTime || currentTime;
        // 防止首次执行无历史时间
        const timeCouse = currentTime - lastTime;
        // 距离上一帧时间
        const isNext = intervalTime - timeCouse <= 0 || timeCouse === 0;
        // 判断是否执行下一帧
        if (isNext) {
            lastTime = currentTime;
            callback(timeCouse, currentTime);
        } else {
            callback();
        }
    };
    return _requestAnimationFrame(fun);
};
const customCancelAnimationFrame = (timer)=>{
    _cancelAnimationFrame(timer);
};
export const requestAnimationFrame = customRequestAnimationFrame;
export const cancelAnimationFrame = customCancelAnimationFrame;

//# sourceMappingURL=requestAnimationFrame.js.map