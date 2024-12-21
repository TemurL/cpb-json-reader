import styles from "@/app/page.module.scss";
import { useState } from "react";
import { csv2json } from 'json-2-csv';

const converTableDataToUrl = (tableData) => {
    const tableDataToConvert = structuredClone(tableData)
    tableDataToConvert.forEach((row, i, arr) => arr[i] = row.join(','));
    const csvData = tableDataToConvert.join('\n');
    const outputJSON = JSON.stringify(csv2json(csvData)[0]);
    return "data:text/json;charset=utf-8," + encodeURIComponent(outputJSON)
}

export default function Table({ tableData, fileName }) {
    const copyTableData = structuredClone(tableData);

    const [updatedDataURL, setUpdatedDataURL] = useState(converTableDataToUrl(tableData));
    const [wasUpdated, setWasUpdated] = useState(false);

    const fieldBlurHandler = (e) => {
        const value = e.target.value;
        const cellEl = e.target.parentElement;
        const rowElem = cellEl.parentElement;
        const fieldIndex = Array.prototype.indexOf.call(rowElem.children, cellEl);
        const rowIndex = 1;

        copyTableData[rowIndex][fieldIndex] = value ? value : 'null';
        const url = converTableDataToUrl(copyTableData);

        setUpdatedDataURL(url);
        setWasUpdated(true);
    }

    return (
        <div className={styles.tableWrapper}>
            <a className={styles.button + ' download-btn ' + styles.downloadBtn} download={'updated_' + fileName} href={updatedDataURL}>Download JSON</a>
            <p className={styles.fileName}>{fileName}</p>
            <table className={styles.table}>
                {tableData.map((row, rowIndex) => {
                    if (rowIndex == 0) {
                        return (
                            <thead key={'$#' + rowIndex}>
                                <tr>
                                    {row.map((field, fieldIndex) => {
                                        return (
                                            <th className={styles.td} key={'$#' + fieldIndex}>{field}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                        )
                    } else {
                        return (
                            <tbody key={'$#' + rowIndex}>
                                <tr>
                                    {row.map((field, fieldIndex) => {
                                        return (
                                            <td className={styles.td} key={'$#' + fieldIndex}>
                                                <input type="text" defaultValue={field} onBlur={fieldBlurHandler} data-obj-path={tableData[0][fieldIndex]} />
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        )
                    }
                })}
            </table>
        </div>
    )
}