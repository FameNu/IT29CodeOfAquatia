const express = require('express');
const app = express();
const XLSX = require('xlsx');
const path = require('path');

class DataNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

function checkDataMatch(id) {
    try {
        const workbook = XLSX.readFile('./register65.xlsx');

        const sheetNames = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetNames];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const foundData = data.find((row) => row.id == id);

        if (foundData) {
            return {
                color: foundData.color,
                colorCode: foundData.colorCode
            }
        } else {
            throw new DataNotFoundException('Data not found');
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/search', (req, res) => {
    try {
        const id = req.query.id;
        const result = checkDataMatch(id);
        res.send(result);
    } catch (err) {
        res.send(err);
        if (err instanceof DataNotFoundException) {
            res.status(400).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on on http://localhost:${port}`);
});