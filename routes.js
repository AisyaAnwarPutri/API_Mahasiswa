'use strict';

module.exports = function(app) {
 var todoList = require('./controller');
 
 //routing untuk user
 app.route('/mahasiswa').get(todoList.mahasiswa);
 
 app.route('/mahasiswa/:nim').get(todoList.findMahasiswa);
 
 app.route('/mahasiswa').post(todoList.registerMahasiswa);

 app.route('/mahasiswa/:nim').put(todoList.updateMahasiswa);
 
 app.route('/mahasiswa/:nim').delete(todoList.deleterMahasiswa);
 
//  //routing untuk jasa
//  app.route('/services')
//  .post(todoList.addService);
 
//  app.route('/services')
//  .get(todoList.getServices);
 
//  app.route('/services/:id')
//  .get(todoList.getUserServices);
 
//  app.route('/services/:id_jasa')
//  .delete(todoList.deleteService);
 
//  app.route('/services')
//  .put(todoList.editServiceReplaceImage);
 
//  app.route('/services/:id_jasa')
//  .put(todoList.editService);
};