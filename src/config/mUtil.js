//存localstorage
export const setStore = (key, value) => {
  if(!key) return;
  if(typeof value !== 'String'){
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key,value);
}
//取localstorage
export const getStore = (key) => {
  if(!key) return;
  return window.localStorage.getItem(key);
}
//删除localstorge中的一项
export const delStore = (key) => {
  if(!key) return;
  window.localStorage.removeItem(key);
}


