var items = require('../items')
const {v4} = require('uuid')

const getItems =  (req, res) => {
    req.log.info("get:: Request to get all items")
    res.send(items)
}

const getItem = (req, res) => {
    req.log.info(`get:: Request to get item ${req.params.id}`)
    const requestedItem = items.find(item => item.id === req.params.id)
    res.send(requestedItem)
}

const deleteItem = (req, res) => {
    req.log.info(`get:: Request to delete item ${req.params.id}`)
    items = items.filter(item => item.id != req.params.id)
    res.send({})
}

const updateItem = (req, res) => {
    req.log.info(`updateItem:: Request to update item ${req.params.id}`)
    const requestedItem = items.find(item => item.id === req.params.id)
    req.log.info(`updateItem:: Item to update ${JSON.stringify(requestedItem)}`)
    requestedItem.name = req.body.name
    res.send(requestedItem)
}

const addItem = (req, res) => {
    req.log.info(`addItem:: Request to add item ${req.body}`)
    const item = {
        id: v4(),
        name: req.body.name
    };

    items.push(item);
    res.code(201).send(item);
}

module.exports = {
    getItem,
    getItems,
    addItem,
    deleteItem,
    updateItem
}