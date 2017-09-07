const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const urlRegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const twoDecimalPlacesRegExp = /^[0-9]+(\.[0-9]{1,2})?$/i;
const positiveIntegerRegExp = /^[0-9]*[1-9][0-9]*$/i;
const phoneRegExp = /^1[34578]\d{9}$/i;

export default {
    /**
     * 验证日期范围必选
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    dateRangeRequired: (rule, value, callback) => {
        if (!value || !value.length || value.length !== 2 || !value[0] || !value[1]) {
            callback(new Error('请选择时间范围'));
        }
        else{
            callback();
        }
    },
    /**
     * 验证“文本框”输入的值必须为正数且最多2位小数
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    twoDecimalPlaces: (rule, value, callback) => {

        if (value && value.toString().match(twoDecimalPlacesRegExp)) {
            callback();
        }
        else{
            callback(new Error('必须为正数且最多2位小数'));
        }
    },
    /**
     * 验证“文本框”输入的值必须为正数且最多2位小数
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    positiveInteger: (rule, value, callback) => {
        if (value && value.match(positiveIntegerRegExp)) {
            callback();
        }
        else{
            callback(new Error('输入的值必须为正整数'));
        }
    },
    /**
     * 验证“文本框”输入的值必须为正数且最多2位小数
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    positiveInteger: (rule, value, callback) => {
        if (value && value.match(positiveIntegerRegExp)) {
            callback();
        }
        else{
            callback(new Error('输入的值必须为正整数'));
        }
    },
    /**
     * 用于验证“文本框”必填，只输入空格等同于没填
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    noEmpty: (rule, value, callback) => {
        if (value && value.trim() !== '') {
            callback();
        }
        else{
            callback(new Error('不能为空'));
        }
    },
    /**
     * 用于验证“文本框”输入的是否是合法的email
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    email: (rule, value, callback) => {
        if (value && value.match(emailRegExp)) {
            callback();
        }
        else{
            callback(new Error('邮件格式不合法'));
        }
    },
    /**
     * 用于验证“文本框”输入的是否是合法的手机号码
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    phone: (rule, value, callback) => {
        if (value && value.match(phoneRegExp)) {
            callback();
        }
        else{
            callback(new Error('手机号码不合法'));
        }
    },
    /**
     * 用于验证“文本框”输入的是否是合法的数字
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    digit: (rule, value, callback) => {
        if (value && !isNaN(value) && isFinite(value)) {
            callback();
        }
        else{
            callback(new Error('不是合法的数字'));
        }
    },
    /**
     * 用于验证“文本框”输入的是否是合法的URL
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    url: (rule, value, callback) => {
        if (value && value.match(urlRegExp)) {
            callback();
        }
        else{
            callback(new Error('不是合法的URL'));
        }
    },
    /**
     * 用于验证“文本框”输入的是否是合法的日期
     * @param  {} rule
     * @param  {} value
     * @param  {} callback
     */
    date: (rule, value, callback) => {
        let parsedDate = new Date(value);

        if (parsedDate.toString() !== 'Invalid Date' && !isNaN(parsedDate.valueOf())) {
            callback();
        }
        else{
            callback(new Error('不是合法的日期'));
        }
    },

}