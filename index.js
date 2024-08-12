var pivotTableObj = new ej.pivotview.PivotView({
    dataSourceSettings: {
        columns: [{ name: 'Date', caption: 'Date' }, { name: 'Product' }],
        dataSource: pivotData,
        expandAll: false,
        enableSorting: true,
        filters: [],
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        rows: [{ name: 'Country' }, { name: 'State' }],
        values: [{ name: 'Amount', caption: 'Sold Amount' }, { name: 'Quantity', caption: 'Quantity' }]
    },
    showToolbar: true,
    toolbarTemplate: '#template',
    height: 350,
    dataBound: function ondataBound() {
        const dataSource = JSON.parse(pivotTableObj.getPersistData()).dataSourceSettings;
        const a = document.getElementById('save');
        const mime_type = 'application/octet-stream';
        a.setAttribute('download', 'pivot.JSON');
        a.href = 'data:' + mime_type + ';base64,' + btoa(JSON.stringify(dataSource) || '');
        document.getElementById('files').addEventListener('change', readBlob, false);
    }
});

function readBlob() {
    const files = document.getElementById('files').files;
    const file = files[0];
    let start = 0, stop = 0;
    if (file && file.size) {
        stop = file.size - 1;
    }
    const reader = new FileReader();
    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
            pivotTableObj.dataSourceSettings = JSON.parse(evt.target.result);
        }
    };
    if (file) {
        const blob = file.slice(start, stop + 1);
        reader.readAsBinaryString(blob);
    }
    document.getElementById('files').value = '';
}

  pivotTableObj.appendTo('#PivotTable');