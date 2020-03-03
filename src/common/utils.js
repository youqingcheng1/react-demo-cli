/**
 * 
 * @param {string} key 
 */
export const queryURLParam = (key)=>{
    let val = new RegExp('[?&]' + key + '=([^&]*)(&?)', 'i').exec(
        window.location.href
    );
    return val ? val[1] : val;
};

/**
 * 判断是否在游戏浏览器
 */
export const isMiniWorldGame = /miniworldgame/ig.test(navigator.userAgent);

/**
 * @param {Number|Object} headInfo 
 * 说明：
 * 1、游戏登录态参数，取登录态中的headIndex
 * 2、密码登录取得的baseinfo，取baseinfo.RoleInfo
 * 3、验证码登录，取返回值中的Model和SkinID参数，组装成字面量对象
 */
export const getAvatarUrl = (headInfo) => {
    // 如果是从游戏内带的登录态，则直接使用带出来的id，因为游戏内已经算好id
    if (typeof headInfo === 'number'){
        // if(headInfo>71){
        //     return `https://image.mini1.cn/roleicon/1.png`;
        // } else {
            return `https://image.mini1.cn/roleicon/${headInfo}.png`;
        // }
    } else if(headInfo !== null && typeof headInfo == 'object'){
        //皮肤id映射
        const skinHeadIdMap = {
            10: 39,
            9: 38,
            8: 37,
            6: 35,
            7: 36,
            5: 34,
            4: 33,
            3: 30,
            2: 32,
            1: 31
        };

        let resultID = 0;
        let skinID = +headInfo.SkinID;

        if(skinID <= 0){
            // 没有皮肤使用Model
            resultID = +headInfo.Model;
        } else {
            // 有皮肤且存在于映射表中使用映射表中的id
            if(skinHeadIdMap[skinID]){
                resultID = skinHeadIdMap[skinID];
            } else {
                // 不存在则使用skinid + 29
                resultID = skinID + 29;
            }
        }
        return `https://image.mini1.cn/roleicon/${resultID}.png`;
    } else {
        return 'https://image.mini1.cn/roleicon/1.png';
    }
}
