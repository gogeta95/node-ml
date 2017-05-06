var express = require('express')
var exec = require('child_process').exec;
var app = express()


app.get('/', function (req, res) {
  var input = req.query.input;

  if (!input) {
    res.send('inavlid request, missing input value');
    return;
  }
  input = '/home/ubuntu/crfasrnn/python-scripts/Images/input/'+input;
  var output = input.replace('input', 'output').replace('jpg','png');


  var cmd = `/home/ubuntu/crfasrnn/python-scripts/crfasrnn_demo.py -i ${input} -o ${output} -g 0`;

  exec(cmd, function(error, stdout, stderr) {
    if (error) {
        res.send(error);
        return;
    }

    if (stderr) {
        res.send(stderr);
        return;
    }

    res.sendFile(output);

  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
