'use strict';

var response = require('./res');
var connection = require('./conn');


exports.index = function(req, res) {
    response.ok("Hello, pesan ini dari sisi server NodeJS Restful API!", res)
};

exports.mahasiswa = function(req, res) {
    connection.query('SELECT * FROM tb_mahasiswa', function (error, rows, fields){
        var message;
        if(error){
            message = "Error ketika menampilkan semua data Mahasiswa!";
            response.gagal(message, res);
        } else{
            message = "Sukses menampilkan semua data Mahasiswa";
            response.ok_with_data(message, rows, res);
        }
    });
};

exports.findMahasiswa = function(req, res) {
    
    var nim = req.params.nim;
    var message;
    
    if (!nim) {
        message = "Kehilangan beberapa parameter yang dibutuhkan!";
        return response.gagal(message, res);
    }
    connection.query('SELECT * FROM tb_mahasiswa where nim = ?', [ nim ], function (error, rows, fields){
        if(error){
            message = "Error ketika mencari nim yang dimaksud!";
            response.gagal(message, res);
        } else{
            if(rows.length > 0){
                message = "Nim ditemukan";
                response.ok_with_data(message, rows[0], res);
            }else{
                message = "Nim tidak ditemukan!";
                response.gagal(message, res);
            }
        }
    });
};

// exports.loginMahasiswa = async function(req, res) {
    
//     var email = req.query.email;
//     var myPassword = req.query.password;
//     var message;
    
//     if (!email || !myPassword) {
//         message = "Kehilangan beberapa parameter yang dibutuhkan!";
//         return response.gagal(message, res);
//     }
    
    
//     await connection.query('SELECT * FROM tb_mahasiswa where email = ?', [ email ], function(error, rows, fields){
//         if(rows.length > 0){
//             if(encrypt.compareHashPassword(myPassword, rows[0].password)){
//                 message = "Login berhasil";
//                 response.ok_with_data(message, rows[0], res);
//             }else{
//                 message = "Password mahasiswa tidak cocok!";
//                 response.gagal(message, res);
//             }
//         }else{
//             message = "mahasiswa tidak terdaftar!";
//             response.gagal(message, res);
//         }
//     });
// };

exports.registerMahasiswa = async function(req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var email = req.body.email;
    var no_hp = req.body.no_hp;
    var jurusan = req.body.jurusan;
    var prodi = req.body.prodi;
    var kelas = req.body.kelas;
    var paralel = req.body.paralel;
    var message;
    
    if (!nim || !nama || !email || !no_hp || !jurusan || !prodi || !kelas|| !paralel) {
        message = "Kehilangan beberapa parameter yang dibutuhkan!";
        return response.gagal(message, res);
    }
    
    await connection.query('SELECT * FROM tb_mahasiswa where nim = ?', [ nim ], function(error, rows, fields){
        if(rows.length > 0){
            message = "Nim user telah terdaftar, silahkan pilih yang lain!";
            response.gagal(message, res);
        }else{
            // var encrypt_password = encrypt.saltHashPassword(plain_password);
            connection.query('INSERT INTO tb_mahasiswa (nim, nama, email, no_hp, jurusan, prodi, kelas, paralel) values (?,?,?,?,?,?,?,?)', [ nim, nama, email, no_hp, jurusan, prodi, kelas, paralel ], function (error, rows, fields){
                if(error){
                    message = "Error ketika menambahkan mahasiswa baru!";
                    response.gagal(message, res);
                } else{
                    message = "Berhasil menambahkan mahasiswa baru";
                    response.ok(message, res);
                }
            });
        }
    });
};

exports.updateMahasiswa = async function(req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var email = req.body.email;
    var no_hp = req.body.no_hp;
    var jurusan = req.body.jurusan;
    var prodi = req.body.prodi;
    var kelas = req.body.kelas;
    var paralel = req.body.paralel;
    var message;
    
    if (!nim || !nama || !email || !no_hp || !jurusan || !prodi || !kelas || !paralel) {
        message = "Kehilangan beberapa parameter yang dibutuhkan!";
        return response.gagal(message, res);
    }
    

    var sql_query = 'UPDATE tb_mahasiswa SET nama = ?, email = ?, no_hp = ?, jurusan = ?, prodi = ?, kelas = ?, paralel = ? WHERE nim = ?';
    var params = [ nama, email, no_hp, jurusan, prodi, kelas, paralel, nim ]
    
    await connection.query('SELECT * FROM tb_mahasiswa where nim = ? Limit 1', [ nim ], function(error, rows, fields){
        if(rows.length > 0){
            connection.query(sql_query, params, function (error, rows, fields){
                if(rows.affectedRows == 0){
                    message = "Data tidak berhasil di Update"
                    response.gagal(message, res)
                }
                if(error){
                    message = "Error ketika mengubah data mahasiswa!";
                    response.gagal(message, res);
                } else{
                    message = "Berhasil mengubah data mahasiswa";
                    response.ok(message, res);
                }
            });
            
        }else{
            message = "Nim mahasiswa telah terdaftar, silahkan pilih yang lain!";
            response.gagal(message, res);
        }
    });
};

exports.deleterMahasiswa = async function(req, res) {
    
    var mahasiswa_nim = req.params.nim;
    var message;
    
    if (!mahasiswa_nim) {
        message = "Kehilangan beberapa parameter yang dibutuhkan!";
        return response.gagal(message, res);
    }
    
    await connection.query('SELECT * FROM tb_mahasiswa where nim = ?', [ mahasiswa_nim ], function(error, rows, fields){
        if(rows.length > 0){
            connection.query('DELETE FROM tb_mahasiswa WHERE nim = ?', [ mahasiswa_nim ], function (error, rows, fields){
                if(error){
                    message = "Error ketika mengahapus mahasiswa!";
                    response.gagal(message, res);
                } else{
                    message = "Berhasil mengahapus mahasiswa";
                    response.ok(message, res);
                }
            });
        }else{
            message = "mahasiswa tidak ditemukan!";
            response.gagal(message, res);
        }
    });
};
