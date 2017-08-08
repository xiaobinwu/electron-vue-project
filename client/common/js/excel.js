import XLSX from 'xlsx'
import FileSaver from 'file-saver'

const s2ab = (s) => {
    if (typeof ArrayBuffer !== 'undefined') {
        let buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF
        }
        return buf
    } else {
        let buf = new Array(s.length)
        for (let i = 0; i !== s.length; ++i) {
             buf[i] = s.charCodeAt(i) & 0xFF
        }
        return buf
    }
}

const exportTableToExcel = ($el, name) => {
    let wb = XLSX.utils.table_to_book($el)
    console.log(wb)
    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), name + '.xlsx')
}

export {
    exportTableToExcel
}