import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'

async function getActivitySuccessRate({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('metric')
    const resp = Activities.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

async function getApprovedUsers({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('metric')
    const resp = Activities.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

async function getRegisteredUsers({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('metric')
    const resp = Activities.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

async function getShopperUsers({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('metric')
    const resp = Activities.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

async function getTotalUsers({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('metric')
    const resp = Activities.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

export default { getActivitySuccessRate, getApprovedUsers, getRegisteredUsers, getShopperUsers, getTotalUsers};