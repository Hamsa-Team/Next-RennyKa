const Koa = require('koa');
const mongo = require('koa-mongo')
const next = require('next');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const env = require('dotenv').config();
fs = require('fs');
const employees = require('./router/employees');
const login = require('./router/login');
const logout = require('./router/logout');
const hello = require('./router/helloWorld');

app.use(mongo({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME,

}));
app.use(bodyParser());
app.use(session(app));
app.keys = ['107']
const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();

console.log(employees);

(async () => {
    try {
        nextApp.prepare()

        router.get('(.*)', async ctx => {
            ctx.req.session = ctx.session.user ? ctx.session.user : null;
            await handler(ctx.req, ctx.res);
            ctx.respond = false;
        });

        app
            .use(employees.routes())
            .use(login.routes())
            .use(logout.routes())
            .use(hello.routes())
            .use(router.allowedMethods())
            .use(router.routes())
        app.listen(3000, (_) => { console.log('Server run at port 3000') });

    } catch (e) {
        console.error(e);
        process.exit();
    }
})();

