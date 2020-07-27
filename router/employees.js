const Router = require('koa-router');
const employees = new Router();
const crawlData = require('../function/crawl');
const verifyLogin = require('../function/verifyLogin');

employees.use(verifyLogin);

employees.post('/employees/crawl', async ctx => {
    if (crawlData(ctx)) {
        ctx.body = "Crawl data successfully!"
    } else ctx.body = "Crawl data fail!";
})
employees.get('/api/employees', async ctx => {
    console.log('aaaaaaaaaaaa1');
    const data = await ctx.db.collection('employees').find({}).toArray();
    ctx.body = data
})
employees.get('/employees/:name', async ctx => {
    const name = ctx.params.name;
    const result = name ? await ctx.db.collection('employees').find({
        employee_name: name
    }) : null
    ctx.body = result;
})

module.exports = employees;