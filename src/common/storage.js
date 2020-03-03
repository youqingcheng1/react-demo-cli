/**
 * 操作storage
 */
const storage = {
    _typeMap: {
        local: 'localStorage',
        session: 'sessionStorage'
    },
    /**
     * 储存Storage
     * @param {String} type 要设置的类型 session/local
     * @param {Object|String} key 要设置的key值或者一个对象
     * @param {String} value 要设置的值
     */
    setItem(type = 'session', key, value) {
        if(typeof key === 'object') {
            for (const item in key){
                if(key.hasOwnProperty(item)){
                    const element = key[item];
                    window[storage._typeMap[type]].setItem(item, element);
                }
            }
        } else {
            if(typeof value === "object") {
                window[storage._typeMap[type]].setItem(key, JSON.stringify(value));
            } else {
                window[storage._typeMap[type]].setItem(key, value);
            }
        }
    },

    /**
     * 获取值
     * @param {String} type 要设置的类型 session/local
     * @param {String} key 要设置的key值
     */
    getItem(type = 'session', key) {
        return window[storage._typeMap[type]].getItem(key)
            ?JSON.parse(window[storage._typeMap[type]].getItem(key))
            :null;
    },

    /**
     * 删除值
     * @param {String} type 要删除的类型 session/local
     * @param {String} key 要删除的数据
     */
    removeItem(type = 'session', key) {
        window[storage._typeMap[type]].removeItem(key);
    }
} 

export default storage;