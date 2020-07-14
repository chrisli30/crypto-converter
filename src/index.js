const { resolve: resolvePath } = require('path');
const Decimal = require('decimal.js');

const { writeCSV, parseCSV } = require('./csv_helper');

async function main() {
    const inputData = await getInputData();
    const convertData = convert(inputData);
    exportCSV(convertData);
}

async function getInputData() {
    const inputData = await parseCSV(resolvePath(__dirname, '../files/input.csv'));
    return inputData;
}

function convert(inputData) {
    const convertData = inputData.map(originalItem => {
        const { Uuid, Exchange, OrderType, Quantity, QuantityRemaining,
            PricePerUnit, Closed, } = originalItem;

        const item = {
            Date: Closed,
            TransactionID: Uuid,
            Tag: 'Bittrex',
        };

        const currencyArr = Exchange.split('-');
        const actualQty = new Decimal(Quantity).sub(QuantityRemaining);
        if (OrderType.includes('_SELL')) {
            item.ReceivedCurrency = currencyArr[0];
            item.SentCurrency = currencyArr[1];

            item.ReceivedQuantity = actualQty.mul(PricePerUnit).toDecimalPlaces(8);
            item.SentQuantity = actualQty.toDecimalPlaces(8);
        } else if (OrderType.includes('_BUY')) {
            item.ReceivedCurrency = currencyArr[1];
            item.SentCurrency = currencyArr[0];

            item.SentQuantity = actualQty.mul(PricePerUnit).toDecimalPlaces(8);
            item.ReceivedQuantity = actualQty.toDecimalPlaces(8);
        }

        return item;
    });

    return convertData;
}

function exportCSV(outputData) {
    const fields = [
        'Date',
        'TransactionID',
        'ReceivedQuantity',
        'ReceivedCurrency',
        'SentQuantity',
        'SentCurrency',
        'FeeAmount',
        'FeeCurrency',
        'Tag',
    ];

    writeCSV({
        fields,
        data: outputData,
        filePath: resolvePath(__dirname, '../files/output.csv'),
    });
}

main();
