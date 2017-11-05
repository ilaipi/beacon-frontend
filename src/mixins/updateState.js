const mixin = {
  /**
   * react 更新state 方法
   * @param {string} state字段名称
   */
  updateState(field) {
    return (v) => {
      this.setState({
        [field]: v
      })
    }
  }
}
export default mixin
