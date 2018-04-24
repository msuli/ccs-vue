export default {
  getDefaultCatId (state, payload) {
    console.log('payload', payload);
    state.defaultCatId = payload.catId;
  }
}
