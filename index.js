const express = require('express');
const path = require('path');
const fs = require('fs');
let app = express();
let ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('views/partials', './views/partials');
app.use('/public', express.static('public'));
app.use('/fe3n', express.static('fe3n'));

app.get('/selector', (req, res) => {
    let fldr = req.query.fldr;
    fldr = fldr.replace('_', '/')
    let fileNames = [];
    // console.log(path.join(__dirname + `/${fldr}`))
    fs.readdir(path.join(__dirname + `/${fldr}`), (err, files) => {
        // console.log(files)
        res.render('selector', {folder: fldr, files: files})
        // fileNames = files;
        // files.forEach(file => {
        //     fileNames.push(file);
        // });
        // fileNames = files;
    });
})

app.get('/fe3n', (req, res) => {
    res.render('fe3n-home')
})

app.get('/viewer', (req, res) => {
    let file = req.query.file;
    file = file.replaceAll('_', '/')

    res.render('viewer', {fileName: file})

})


app.get('/{*any}', (req, res) => {
    res.render('404')
})


app.listen('3000',() => {
    console.log("running on 3000")
})