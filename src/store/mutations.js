import {DEFAULT_CAT_ID, GET_BOOKLIST, INIT_BOOKLIST} from './mutations-types';
import {getStore, setStore} from "../config/mUtil";
export default {
  [DEFAULT_CAT_ID] (state, payload) {
    state.defaultCatId = +payload.catId;
    setStore('defaultCatId', state.defaultCatId);
  },
  [GET_BOOKLIST] (state, payload){
    state.bookList = [...payload];
    console.log('state.bookList', state.bookList);
    setStore('bookList', state.bookList);
  },
  //网页初始化时从本地缓存获取事业部数据
  [INIT_BOOKLIST](state) {
    let bookList = getStore('bookList');
    if (bookList) {
      state.bookList = JSON.parse(bookList);
    }
  },
}
