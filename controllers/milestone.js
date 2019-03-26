const express = require('express')
const router = express.Router()

const firebase = require('firebase/app')
require('firebase/database')

const config = {
    apiKey: "AIzaSyBhW8qLWMhpr7bsd2pdPgAvEUIBSXtJq3E",
    authDomain: "dbs-server.firebaseapp.com",
    databaseURL: "https://dbs-server.firebaseio.com",
    projectId: "dbs-server",
    storageBucket: "dbs-server.appspot.com",
    messagingSenderId: "234798276287"
};

firebaseInstance = firebase.initializeApp(config)

router.post('/:accountId',(req, res, next)=>{
    const {body} = req
    if(!isEmpty(body.amount)&& !isEmpty(body.endDate) && !isEmpty(body.contribution) && !isEmpty(body.initialContribution)){
        
    }
})

function isEmpty(val) {
    return !!((val === undefined || val == null || val.length <= 0))
  }
module.exports = router