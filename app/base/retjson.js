function RetJson(){
    this.errcode = arguments[0] || 0;
    this.errmsg = arguments[1] || '';
    this.retobj = arguments[2] || '';
}

module.exports = exports = RetJson;