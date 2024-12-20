'use client'

import { csv2json, json2csv } from 'json-2-csv';
import { useState } from 'react';
import styles from "./../page.module.css";


const FileUpload = () => {
  const [data, setData] = useState([]);
  const [uploadedJson, setUploadedJson] = useState({});
  const [fileName, setFileName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const files = e.target[0].files;
    if (files.length < 1) return
    const fileReader = new FileReader();
    fileReader.readAsText(files[0])
    setFileName(files[0].name);
    fileReader.addEventListener('loadend', () => {
      const dataObject = JSON.parse(fileReader.result);
      if (!dataObject) return
      const tableData = [];
      setUploadedJson(dataObject);
      const test = json2csv([dataObject.settings], { delimiter: { field: '^$' } });
      const rows = test.split('\n');
      rows.forEach((row, i) => {
        tableData[i] = row.split('^$');
      });
      console.log(dataObject);
      setData(tableData);
    })
  }

  const extractCSVDataFromTable = (tableElem) => {
    const rows = tableElem.querySelectorAll('tr');
    const rowsData = Array.from(rows).map(row => {
      if (row.closest('thead')) {
        return Array.from(row.children).map(td => td.textContent).join(',')
      } else {
        return Array.from(row.children).map(td => td.children[0].value).join(',')
      }
    })

    const csvData = rowsData.join('\n');
    const outputJSON = csv2json(csvData);
    return outputJSON[0];
  }

  const downloadJSON = () => {
    const table = document.querySelector('table');
    const newSettings = extractCSVDataFromTable(table);
    const uploadedJsonCopy = JSON.parse(JSON.stringify(uploadedJson));
    uploadedJsonCopy.settings = newSettings;
    const link = document.createElement('a');
    link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(uploadedJsonCopy));
    link.download = 'updated_' + fileName;
    link.click();
  }

  return (
    <>
      <div id="upload-block">
        <form action='' onSubmit={submitHandler}>
          <input type="file" accept=".json"/>
          <p>Here you can upload json file on CPB product</p>
          <button type="submit">Continue</button>
        </form>
      </div>
      {data.length > 0 && <button onClick={downloadJSON} id='download-result' className={styles.downloadBtn}>Download JSON</button>}
      <table className={styles.table}>
        {data.map((row, i) => {
          if (i == 0) {
            return (
              <thead>
                <tr key={'$#_' + i}>
                  {row.map((field, i) => {
                    return (
                      <th key={'$#_' + i} className={styles.td}>{field}</th>
                    )
                  })}
                </tr>
              </thead>
            )
          } else {
            return (
              <tbody>
                <tr key={'$#_' + i}>
                  {row.map((field, i) => {
                    return (
                      <td key={'$#_' + i} className={styles.td}>
                        <input type="text" defaultValue={field} />
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            )
          }
        })}
      </table>
    </>
  )
}

export default FileUpload;