export function getSliderService (http) {
  return http.get('/static/mocks/slider.json')
    .then(res => {
      return res.body.sliderList
    }, error => {
      console.log(error)
    })
}
export const getBookListService = (http) => {
  return http.get('/static/mocks/bookList.json')
    .then(res => {
      let data = res.body
      let bookList = data.bookList
      let result = []
      if (bookList && bookList.length > 0) {
        bookList.forEach(function (t) {
          t.children = []
          let repeatFound = false
          result.forEach(function (m) {
            if (m.booksId === t.booksId) {
              m.children.push({catName: m.catName, catId: m.catId},
                {catName: t.catName, catId: t.catId})
              repeatFound = true
            }
          })
          if (!repeatFound) {
            result.push(t)
          }
        })
      }
      return result
    }, error => {
      console.log(error)
    })
}
export const getNewGoodsService = (http) => {
  return http.get('/static/mocks/newGoodsList.json')
    .then(res => {
      let data = res.body
      if (data.header.resultCode === '0000') {
        return data.content.rcmdList
      } else {
        throw new Error(res)
      }
    }, error => {
      console.log(2, error)
    })
}
export const getHotSaleListService = http => {
  return http.get('/static/mocks/hotGoodsSaleList.json')
    .then((res) => {
      let data = res.body
      if (data.header.resultCode === '0000') {
        return data.content.rcmdList
      } else {
        throw new Error(res)
      }
    }, error => {
      throw new Error(error)
    })
}
export const getSpecialPriceService = (http, params) => {
  return http.get('http://localhost:3006/specialPrice/specialPrice', {params: {'catId': params.catId},})
    .then((res) => {
      let data = res.body;
      console.log(2323, data);
      if (data.code === 1) {
        return data.data;
      } else {
        throw new Error(res);
      }
    }, error => {
      throw new Error(error);
    })
}
