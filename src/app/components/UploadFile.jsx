import { json2csv } from 'json-2-csv';
import styles from '@/app/page.module.scss';
import { useState } from 'react';

export default function UploadFile({ setTablesData, tablesData }) {
    const [filesCount, setFilesCount] = useState(0);

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

    const resetHandler = (e) => {
        setTablesData([]);
        setFilesCount(0);
        e.target.closest('form').reset();
    }

    const fileUploadChangeHandler = (e) => {
        setFilesCount(e.target.files.length);
    }

    const fileUploadPlaceholderClick = (e) => {
        e.target.previousElementSibling.click();
    }

    return (
        <div id="upload-block" className={styles.uploadBlock}>
            <form action='' onSubmit={submitHandler}>
                <p>Here you can upload json files of CPB products</p>
                <input type="file" accept=".json" multiple onChange={fileUploadChangeHandler} className='hide'/>
                <div className={styles.fileUploadPlaceholder} onClick={fileUploadPlaceholderClick}></div>
                <div className={styles.actionBtns}>
                    {tablesData.length == 0 && <button type="submit" className={`${styles.button} ${filesCount == 0 && 'hide'}`}>Continue</button>}
                    {tablesData.length > 0 && <button type="button" onClick={resetHandler} className={styles.button}>Reset</button>}
                </div>
            </form>
        </div>
    )
}