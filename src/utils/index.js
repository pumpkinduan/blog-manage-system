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