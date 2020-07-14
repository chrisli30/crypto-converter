const { writeFileSync } = require('fs');
const { Parser } = require('json2csv');
const csv = require('csvtojson');

function writeCSV({ fields, data, filePath, excelStrings = false }) {
    const json2csvParser = new Parser({ fields, excelStrings });
    const csv = json2csvParser.parse(data);

    writeFileSync(filePath, csv);
}

async function parseCSV(filePath) {
    const jsonArray = await csv().fromFile(filePath);
    return jsonArray;
}

module.exports = {
    writeCSV,
    parseCSV,
};
