import validator from 'validator';

function validateCustomerData({phone, email}){
    if(validator.isMobilePhone(phone,'vi-VN') && validator.isEmail(email))
        return true
    return false
}

function validatePhone(phone){
    return validator.isMobilePhone(phone,'vi-VN')
}

function validateEmail(email){
    return validator.isEmail(email)
}
export {validateCustomerData, validateEmail, validatePhone}