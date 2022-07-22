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
  register: (inputRegister) => axi.post('/customer',inputRegister),
  forgotPassword: (email) => axi.post('/customer/forgotpassword', {fromEmail:email}),
  getInfo: (token) => axi.get('/customer/info', {headers: {'x-access-token': token}}),
  updatePassword: (token, newPassword) => axi.patch('/customer/password',{newPassword},{headers: {'x-access-token': token}})
}

const wareHouseAPI = {
  getAll: () => axi.get(`/warehouse`),
  getAndSortBySoldQuantity: (limit) => axi.get(`/warehouse/top/${limit}`),
  search: (searchTerm) => axi.get(`/warehouse?searchTerm=${searchTerm}`),
  getById: (id) => axi.get(`/warehouse/${id}`),
  getByCategoryId : (id) => axi.get(`/warehouse/category/${id}`)
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
  create: (token, inputExportOrder) => {
    return axi.post(`/exportOrder`,inputExportOrder,{
      headers: {
        "x-access-token": token
      }
    })
  }
}
export {brandAPI, categoryAPI, customerAPI, wareHouseAPI, supplierAPI, exportOrderAPI};