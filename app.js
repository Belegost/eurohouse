const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

// Get

router.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

router.get('/about',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/pages/about-us.html'));
});

router.get('/contact',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/pages/contact.html'));
});

router.get('/projects',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/pages/projects.html'));
});

router.get('/project/:id',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/pages/project.html'));
});

router.get('/tag/:id',function(req,res) {
    res.sendFile(path.join(__dirname+'/public/pages/tag.html'));
});

app.use('/', router);
app.use('/about', router);
app.use('/contact', router);
app.use('/projects', router);
app.use('/project', router);
app.use('/tag', router);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname+'/public/404.html'));
});

app.listen(process.env.PORT || 8080, function () {
    console.log("App listening on port 8080!");
});