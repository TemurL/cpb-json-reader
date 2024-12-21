import { json2csv } from 'json-2-csv';
import styles from '../page.module.css';

export default function UploadFile({ setTablesData, tablesData }) {

    function readmultifiles(files) {
        var reader = new FileReader();
        const newTablesData = [];
        function readFile(index) {
            if (index >= files.length) return;
            const fullTableData = {
                data: [],
                fileName: null
            }
            var file = files[index];
            reader.onload = function (e) {
                var text = e.target.result;
                const dataObject = JSON.parse(text);
                if (!dataObject) return
                const scvText = json2csv([dataObject], { delimiter: { field: '^$' } });
                const rows = scvText.split('\n');
                rows.forEach((row, i) => {
                    fullTableData.data[i] = row.split('^$');
                });

                fullTableData.fileName = file.name;
                newTablesData.push(fullTableData);
                console.log(fullTableData);

                readFile(index + 1);
                if (index == files.length - 1) {
                    setTablesData(newTablesData);
                }
            }
            reader.readAsText(file);
        }
        readFile(0);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const files = e.target[0].files;
        if (files.length < 1) return
        readmultifiles(files);
    };

    const resetHandler = () => {
        setTablesData([]);
    }

    return (
        <div id="upload-block">
            <form action='' onSubmit={submitHandler}>
                <input type="file" accept=".json" multiple />
                <p>Here you can upload json file of CPB product</p>
                <div className={styles.actionBtns}>
                    {tablesData.length == 0 && <button type="submit" className={styles.actionBtn}>Continue</button>}
                    {tablesData.length > 0 && <button type="button" onClick={resetHandler} className={styles.actionBtn}>Reset</button>}
                </div>
            </form>
        </div>
    )
}