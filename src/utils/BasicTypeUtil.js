

const BasicTypeUtil = {


  telephoneValidate: (value) => {
    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$|^((0[0-9]{2,3}\-)|(\(0[0-9]{2,3}\)))?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
    if (!reg.test(value)) {
      return false
    } else {
      return true
    }
  },

}

export default Object.assign({}, BasicTypeUtil)

