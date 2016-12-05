#! /usr/bin/env node
var fs = require('fs');
var path = require('path');

var input = process.argv[2] || './index.cmacc';
var output = process.argv[3] || path.basename(input, path.extname(input));

var cmacc = require('cmacc-compiler');

var compile = cmacc.compile;
var resolve = cmacc.resolve;

console.log('Hello World')

try{
    var file = 'file://' + path.resolve(process.cwd(), input);
    var ast = compile(file);
    var resolved = resolve(ast);
    var html = cmacc.marked(resolved);
    var pdf = require('html-pdf');
    pdf.create(html).toFile(output + '.pdf', function(err, res){
        console.log(res.filename);
    });

}catch (e){
    console.error('Message:', e.message);
    console.error('Stack:', e.stack);
    console.error('File:', e.file);
}

