import { createRequestFunc } from '../../common/ajax';
import { baseUrl } from '../base';

const home = {
    /**
     * 标记玩家分享
     */
    shareGet:{
        path:'record/share',
        method:'get',
    },
}

export default createRequestFunc(home, baseUrl);