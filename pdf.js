import fs from "fs"
import PDFDocument from 'pdfkit-table'
import QRCode from 'qrcode'
export function createPDF(box) {
    // генерируем QR-code с ID коробки и сохраняем
    QRCode.toFile('QR.png', [box[0].box])

    let doc = new PDFDocument({margin: 30, size: 'A4'});
    doc.pipe(fs.createWriteStream("./document.pdf"));
    const current_box = current_box;

    if(current_box.length === 50) {
        ;(async function () {
            const table = {
                title: "                                                             BOX: " + box[0].box + "    ",
                headers: ["N", "Serial"],
                rows: [
                    current_box.map((serial_number, i) => [i, serial_number])
                ],
                subtitle: "Date: " + new Date().toLocaleDateString() + "      _______________________",
            };

            await doc.table(table, {
                width: 532,
                prepareHeader: () => {
                    doc.font("Helvetica-Bold").fontSize(8)
                    doc.image('QR.png', 350, 18, { width: 30,  fit: [500, 200]}  )
                    doc.image('logo.png', 22, 22, { width: 67,  fit: [500, 200]}  )
                },
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                    doc.font("Helvetica").fontSize(6)
                    indexColumn === 0 && doc.addBackground(rectRow, 'green', 0.15)
                },
            });
            doc.end();
        })();
    }
    if(current_box.length === 100) {
        ;(async function () {
            const table = {
                title: "                                                             BOX: " + box[0].box + "    ",
                headers: ["N", "Serial", "                   ", "N", "Serial", "                   "],
                rows: [
                    current_box.map((serial_number, i) => [i, serial_number])
                ],
                subtitle: "Date: " + new Date().toLocaleDateString() + "      _______________________",
            };

            await doc.table(table, {
                width: 532,
                prepareHeader: () => {
                    doc.font("Helvetica-Bold").fontSize(8)
                    doc.image('QR.png', 350, 18, { width: 30,  fit: [500, 200]}  )
                    doc.image('logo.png', 22, 22, { width: 67,  fit: [500, 200]}  )
                },
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                    doc.font("Helvetica").fontSize(6)
                    indexColumn === 0 && doc.addBackground(rectRow, 'green', 0.15)
                },
            });
            doc.end();
        })();
    }
}
