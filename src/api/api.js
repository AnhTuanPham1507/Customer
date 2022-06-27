import axios from 'axios';

const axi =  axios.create({
  baseURL: `http://127.0.0.1:3001`
});

const brandAPI = {
  getAll: () => axi.get('/brand'),
  update: (brand) => 
    axi.put(`/brand/${brand.get('_id')}`, 
      brand,
      {headers: { 'content-type': `multipart/form-data; boundary=${brand._boundary}` }}
    ),
}

const categoryAPI = {
  getAll: () => axi.get('/category'),
  update: (category) => {
    return axi.put(`/category/${category._id}`,{
      categoryName:category.categoryName,
      categoryImage:category.categoryImage
    })
  }
}

const customerAPI = {
  login: (inputLogin) => axi.post('/customer/login',inputLogin),
  register: (inputRegister) => axi.post('/customer',inputRegister)
}

const employeeAPI = {
  getAll: () => axi.get('/employee'),
  update: (employee) => {
    return axi.put(`/employee/${employee._id}`,{
      employeeName:employee.employeeName,
      employeePhone:employee.employeePhone,
      employeeEmail:employee.employeeEmail,
      employeeRole:employee.employeeRole,
      employeeActive:employee.employeeActive,
      employeePassword:employee.employeePassword,
    })
  }
}

const wareHouseAPI = {
  getAll: () => axi.get(`/warehouse`),
  search: (searchTerm) => axi.get(`/warehouse?searchTerm=${searchTerm}`),
  getById: (id) => axi.get(`/warehouse/${id}`)
}

const supplierAPI = {
  getAll: () => axi.get('/supplier'),
  update: (supplier) => {
    return axi.put(`/supplier/${supplier._id}`,{
      supplierName:supplier.supplierName,
      address:supplier.address,
      phone:supplier.phone})
  }
}

const exportOrderAPI = {
  getAll: () => axi.get('/exportOrder'),
  getByCustomerId: (token) => axi.get('/exportOrder/customer',{
    headers: {
      "x-access-token": token
    }
  }),
  create: (inputExportOrder) => {
    return axi.post(`/exportOrder`,inputExportOrder)
  }
}
export {brandAPI, categoryAPI, customerAPI, employeeAPI, wareHouseAPI, supplierAPI, exportOrderAPI};