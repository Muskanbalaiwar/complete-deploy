const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan=require('morgan')
const fs=require('fs'); 
const dotenv=require('dotenv');
dotenv.config();
const path=require('path')
const sign=require('./models/signData');
const Expense=require('./models/user');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const Order=require('./models/orders');
app.use(cors())
const router=require('./routes/signRoute');
const oroute=require('./routes/purchase')
const sequelize=require('./util/database');
const route=require('./routes/routeExpense')
const route_order=require('./routes/purchase')
const route_leaderboard=require('./routes/leaderboard')
const route_password=require('./routes/password');
const password_table=require('./models/password')
const file_Table=require('./models/fileLink')
const reset_route=require('./routes/reset')
const report_route=require('./routes/report')
app.use(bodyParser.json())
app.use(router);
app.use(route);
app.use(reset_route);
sign.hasMany(Expense)
Expense.belongsTo(sign);
app.use(route_order)
app.use(route_leaderboard)
app.use(route_password)
app.use(report_route)
sign.hasMany(Order)
Order.belongsTo(sign)
sign.hasMany(password_table);
password_table.belongsTo(sign);
sign.hasMany(file_Table);
file_Table.belongsTo(sign)
app.use(helmet());
app.use(compression());
const access=fs.createWriteStream(path.join(__dirname,'/','access.log'),{flags:'a'})
app.use(morgan('combined', {stream:access}))
sequelize.sync()
.then(res=>{
    console.log('res');
})
.catch(err=>{
    console.log(err);
})
app.listen(3001);