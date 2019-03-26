const express = require('express')
const router = express.Router()
const axios = require('axios')
const moment = require('moment')


router.get('/:accountId', async (req, res, next) => {
    const {
        accountId
    } = req.params
    const startDate = '01-01-2018'
    const endDate = '02-01-2019'
    if (accountId == '') {
        res.status(401).send({
            'errorMessage': 'Please include accountId'
        })
        return
    } else {
        try {
            const response = await axios.
            get(`http://api-gateway-dbs-techtrek.ap-southeast-1.elasticbeanstalk.com/transactions/${accountId}?from=${startDate}&to=${endDate}`, {
                headers: {
                    identity: 'Group12',
                    token: '80adc5be-6f4c-43db-83f2-829a7abfb43b'
                }
            })
            // filter the data 
            const {
                data
            } = response
            const trace1 = data.reduce((acc, curr) => {
                if (curr['tag'] == 'TRANSFER' && curr['type'] == 'DEBIT') {
                    const month = parseInt(moment(curr.date.split('T')[0], 'YYYY-MM-DD').format('MM')) - 1

                    acc.trace.y[month] += parseFloat(curr.amount)
                }
                return acc
            }, {
                trace: {
                    x: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    name: 'TRANSPORT',
                    type: 'bar'
                },
                key: {}
            }).trace

            const trace2 = data.reduce((acc, curr) => {
                if (curr['tag'] == 'TRANSPORT' && curr['type'] == 'DEBIT') {
                    const month = parseInt(moment(curr.date.split('T')[0], 'YYYY-MM-DD').format('MM')) - 1

                    acc.trace.y[month] += parseFloat(curr.amount)
                }
                return acc
            }, {
                trace: {
                    x: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    name: 'TRANSPORT',
                    type: 'bar'
                },
                key: {}
            }).trace

            const trace3 = data.reduce((acc, curr) => {
                if (curr['tag'] == 'F&B' && curr['type'] == 'DEBIT') {
                    const month = parseInt(moment(curr.date.split('T')[0], 'YYYY-MM-DD').format('MM')) - 1

                    acc.trace.y[month] += parseFloat(curr.amount)
                }
                return acc
            }, {
                trace: {
                    x: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    name: 'F&B',
                    type: 'bar'
                },
                key: {}
            }).trace

            const trace4 = data.reduce((acc, curr) => {
                if (curr['tag'] == 'ATM' && curr['type'] == 'DEBIT') {
                    const month = parseInt(moment(curr.date.split('T')[0], 'YYYY-MM-DD').format('MM')) - 1

                    acc.trace.y[month] += parseFloat(curr.amount)
                }
                return acc
            }, {
                trace: {
                    x: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    name: 'ATM',
                    type: 'bar'
                },
                key: {}
            }).trace

            res.status(200).send({
                data: [trace1, trace2, trace3, trace4]
            })
            return
        } catch (err) {
            res.status(500).send({
                'errorMessage': 'Something wrong has happen'
            })
        }
    }
})


module.exports = router