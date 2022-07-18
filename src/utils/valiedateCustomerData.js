import validator from 'validator';

<<<<<<< HEAD
function validateCustomerData({phone}){
=======
function validateCustomerData({phone, email}){
>>>>>>> 190ef3b503fc71fbc399721ea0c068fa73a4ab54
    if(validator.isMobilePhone(phone,'vi-VN'))
        return true
    return false
}

function validatePhone(phone){
    return validator.isMobilePhone(phone,'vi-VN')
}

<<<<<<< HEAD
=======

>>>>>>> 190ef3b503fc71fbc399721ea0c068fa73a4ab54
export {validateCustomerData, validatePhone}