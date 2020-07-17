// 公用的工具函数库
export const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key))
export const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))
export const removeLocalStorage = key => window.localStorage.removeItem(key)

// 全屏显示
export const setFullScreenStatus = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
    // 获取随机索引，索引值在[min,max]范围之间
export const createRandomInclusive = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min;

// 随机生成颜色
export const createRandomColor = () => {
    let red = createRandomInclusive(0, 255);
    let green = createRandomInclusive(0, 255);
    let blue = createRandomInclusive(0, 255);
    // 避免生成白色
    if (red === green === blue === 255) { createRandomColor() } else {
        return `rgba(${red},${green},${blue})`
    }
}