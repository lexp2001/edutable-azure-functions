import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'

async function getActivities({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('activity')
    const resp = Activities.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

/* POST: Create a new activity */
async function createActivity({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('activity')
    const resp = Activities.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Error al crear actividad")
        } else {
            res.status(201)
            res.json(result)
        }
    })
}

/* PUT: Update a activity */
async function updateActivity(rut: string, { req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('activity')
    const resp = Activities.findOneAndUpdate(
        { "rut": rut },
        { $set: req.body },
        function (err, item) {
            if (err) throw err
            if (err) {
                res.status(500).send("Error intentando actualizar actividad")
            } else {
                if (item.value == null) {
                    res.status(404).send("Actividad con rut especificado no existe")
                } else {
                    res.status(202).json(item.value)
                }
            }
        })
}

/* DELETE a participant by rut  */
async function deleteActivity(rut: string, { req, res }: Context) {
    const { db, connection } = await createConnection()
    const Activities = db.collection('activity')
    const resp = Activities.deleteOne(
        { "rut": rut },
        function (err, result) {
            if (err) {
                res.status(500).send("Error intentando eliminar actividad")
            } else {
                if (result.deletedCount == 0) {
                    res.status(404).send("Actividad no existe")
                } else {
                    res.status(202).json({ "rut": req.params.rut })
                }
            }
        })
}

export default { getActivities, createActivity, updateActivity, deleteActivity };