import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'
import * as Excel from "exceljs";

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

// async function getExcel({ req, res }: Context) {
//     const { db, connection } = await createConnection()
// }

interface User {
    name: string;
    rut: string;
    company: string;
    time: string;
}

const users: User[] = [
    { "name": "Name 1", "rut": "Rut 1", "company": "Company 1", "time": "Time 1" },
    { "name": "Name 2", "rut": "Rut 2", "company": "Company 2", "time": "Time 2" },
    { "name": "Name 3", "rut": "Rut 3", "company": "Company 3", "time": "Time 3" }
]

async function generateExcel({ req, res }: Context) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Users Data');
    [{ header: 'Name', key: 'name', width: 20 },
    { header: 'Rut', key: 'rut', width: 10 },
    { header: 'Company', key: 'company', width: 10 },
    { header: 'Time', key: 'time', width: 10 },
        // { header: 'Product Totals', key: 'productTotals', width: 12 },
    ];
    users.forEach((data, index) => {
        worksheet.addRow({
            ...data,
        });
    });

    // await workbook.xlsx.writeFile('user-data.xlsx');

    res.status(200).json({ "resp": "ok" })

}

export default { getActivities, createActivity, updateActivity, deleteActivity, generateExcel };