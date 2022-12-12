const express = require('express');
const axios = require('axios');

const app = express();
const apiKey = '608722ce416b0ef0f67d22c7bda8c34c-us8' ;

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended : true}))

app.get('/', ( req, res)=> {
    res.sendFile(__dirname + '/signUp.html');
})

app.post('/', (req, res)=> {
    const firstName = req.body.nombre;
    const lastName = req.body.apellido;
    const userEmail = req.body.email;

    let data = {
        members: [
            {
                email_address: userEmail,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    //let jsonData = JSON.stringify(data);
    //console.log(firstName)

    const url = 'https://us8.api.mailchimp.com/3.0/lists/d688ff77db'
    axios.post(url, data , { headers : { 'Authorization': `Basic ${apiKey}`}})
      .then(function (response) {
        res.sendFile(__dirname + '/success.html');
        console.log(response);
      })
      .catch( (err) => { 

        res.sendFile(__dirname + '/failure.html');
        if (err.response) {
        console.log('error.response', err.response)
        } else if (err.request) {
        console.log('error.request', err.request)
        } else {
        console.log('Error', err.message);
        }
       });

})

app.post('/failure', ( req, res) => {
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

// List ID
// d688ff77db

// API Key
//