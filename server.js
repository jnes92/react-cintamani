const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/:main/:side', (req, res) => {
            let actualPage, queryParams;
            if (isNaN(req.params.side)){
                 actualPage = '/category'
                 queryParams = { main: req.params.main, side: req.params.side }
            }
            else {// just main and id:
                 actualPage = '/product'
                 queryParams = { id: req.params.side }
            }

            app.render(req, res, actualPage, queryParams)
        })

        server.get('/:main', (req, res) => {
            const actualPage = '/category'
            const queryParams = { main: req.params.main}
            app.render(req, res, actualPage, queryParams)
        })

        server.get('/:main/:side/:id', (req, res) => {
            const actualPage = '/product'
            const queryParams = { id: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })