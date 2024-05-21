const express = require('express');
const bodyparser = require('body-parser')
const myslq = require('mysql2/promise')
const app = express()
const cors = require('cors')

app.use(bodyparser.json())
app.use(cors())
// ສຳລັບເກັບ users
/*let users = []
let counter = 1*/

let conn = null
const initMySQL = async() =>{
    conn = await myslq.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'tutorials'
      })
}

app.get('/testdb',(req,res)=>{
    myslq.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'tutorials'
      }).then((conn) => {
        // สิ่งนี้เราเรียกกันว่า promise
        conn
        .query('SELECT * FROM users')
        .then((results) => {
          res.json(results[0])
        })
        .catch((error) => {
            console.error('Error fetching users:', error.message)
            res.status(500).json({ error: 'Error fetching users' })
          })
    })
})

app.get('/testdb-new',async(req,res)=>{
    try{ const results = await conn.query('SELECT * FROM users')
         res.json(results[0])
    }catch{
        ((error) => {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
          })
    }
 
   
})


/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับการดึง users รายคนออกมา
PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
 */

// path = / GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async(req,res)=>{
    try{ const results = await conn.query('SELECT * FROM users')
         res.json(results[0])
    }catch{
        ((error) => {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
          })
    }
})

app.get('/',(req,res)=>{
    res.send('Hello Express')
})
app.get('/test',(req,res)=>{
    let user = {
        firstname: 'Zaiy',
        lastname: 'Junior',
        age: 21
    }
    res.json(user)
})
//GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', async(req,res)=>{
    try{
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id=?',id)
       if(results[0].lenght == 0){
        throw {statusCode: 404, message: 'Could not found'}
       }
       res.json(results[0][0])
    }catch(error){
            console.error( 'errorMessage' , error.message);
            let statusCode = error.statusCode || 500
             res.status(statusCode).json({
               message: 'something wrong',
               errorMessage: error.message
            })
    }
})


// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users',async(req,res)=>{
    try{
        let user = req.body
        const results = await conn.query('INSERT INTO users SET ?',user)
        res.json({
            message: 'insert ok',
            data: results[0]
        })
    }catch(error){
     console.log( 'errorMessage' , error.message);
      res.status(500).json({
        message: 'something wrong'
      })
    }
})

 // path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id',async(req,res)=>{
    try{
        let id = req.params.id
        let updateUser = req.body
        const results = await conn.query(
        'UPDATE users SET ? WHERE id=?',
        [updateUser,id])
        res.json({
            message: 'UPDATE IS OKAY',
            data: results[0]
        })
    }catch(error){
     console.log( 'errorMessage' , error.message);
      res.status(500).json({
        message: 'something wrong'
      })
    }



// ha users jark id t sg ma
// update users nun
// users t update mai update kup khao pai t users to kao

// khn ha khr moun users
/*let selectedIndex = users.findIndex(user => user.id == id)
// update khr moun
users[selectedIndex].fname = updateUser.fname || users[selectedIndex].fname
users[selectedIndex].lname = updateUser.lname || users[selectedIndex].lname
users[selectedIndex].age = updateUser.age || users[selectedIndex].age
users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender
*/
/*if(updateUser.fname){
    users[selectedIndex].fname = updateUser.fname 
}
if(updateUser.lname){
    users[selectedIndex].lname = updateUser.lname 
}*/
/*res.json({
    massage: 'update user complete!',
    date: updateUser,
    indexUpdate: selectedIndex
})
*/

})

// path DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', async(req,res)=>{
    try{
        let id = req.params.id
        const results = await conn.query(
        'DELETE FROM users WHERE id=?',id)
        res.json({
            message: 'DELETE is OK',
            data: results[0]
        })
    }catch(error){
     console.log( 'errorMessage' , error.message);
      res.status(500).json({
        message: 'something wrong'
      })
    }

 /*   let id = req.params.id
    // ha krn va index khrng user t ja lop khue index dh
let selectedIndex = users.findIndex(user => user.id == id)
// delete user
users.splice[selectedIndex,1]
res.json({
    massage: 'delete complete!',
    indexDeleted: selectedIndex
})*/
})

const port = 4000
app.listen(port, async (req,res)=>{
    await initMySQL()
    console.log("server is running on port"+port);
})