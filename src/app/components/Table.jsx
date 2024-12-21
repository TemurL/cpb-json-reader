import styles from "../page.module.css";
import { useState } from "react";
import { csv2json } from 'json-2-csv';

const converTableDataToUrl = (tableData) => {
    const tableDataToConvert = structuredClone(tableData)
    tableDataToConvert.forEach((row, i, arr) => arr[i] = row.join(','));
    const csvData = tableDataToConvert.join('\n');
    const outputJSON = JSON.stringify(csv2json(csvData)[0]);
    return "data:text/json;charset=utf-8," + encodeURIComponent(outputJSON)
}

const CellInput = ({ field, blurHandler }) => {
    return (
        <td className={styles.td}>
            <input type="text" defaultValue={field} onBlur={blurHandler} />
        </td>
    )
}

export default function Table({ tableData, fileName }) {
    const copyTableData = structuredClone(tableData);

    const [updatedDataURL, setUpdatedDataURL] = useState(converTableDataToUrl(tableData));
    const [wasUpdated, setWasUpdated] = useState(false);

    const blurHandler = (e) => {
        const value = e.target.value;
        const cellEl = e.target.parentElement;
        const rowElem = cellEl.parentElement;
        const fieldIndex = Array.prototype.indexOf.call(rowElem.children, cellEl);
        const rowIndex = 1;
        copyTableData[rowIndex][fieldIndex] = value;
        const url = converTableDataToUrl(copyTableData);

        setUpdatedDataURL(url);
        setWasUpdated(true);
    }

    return (
        <div className={styles.tableWrapper}>
            <a className={(tableData.length > 0 && wasUpdated ? styles.downloadBtn : styles.hide) + ' download-btn'} download={'updated_' + fileName} href={updatedDataURL}>Download JSON</a>
            <table className={styles.table}>
                <caption>{fileName}</caption>
                {tableData.map((row, index) => {
                    if (index == 0) {
                        return (
                            <thead key={'$#' + index}>
                                <tr>
                                    {row.map((field, index) => {
                                        return (
                                            <th className={styles.td} key={'$#' + index}>{field}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                        )
                    } else {
                        return (
                            <tbody key={'$#' + index}>
                                <tr>
                                    {row.map((field, index) => {
                                        return (
                                            <CellInput field={field} key={'$#' + index} blurHandler={blurHandler} />
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