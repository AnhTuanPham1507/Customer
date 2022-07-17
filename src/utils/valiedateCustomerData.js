import validator from 'validator';

function validateCustomerData({phone, email}){
    if(validator.isMobilePhone(phone,'vi-VN'))
        return true
    return false
}

function validatePhone(phone){
    return validator.isMobilePhone(phone,'vi-VN')
}


export {validateCustomerData, validatePhone}