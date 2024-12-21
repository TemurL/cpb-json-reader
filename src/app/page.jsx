'use client'
import styles from "./page.module.css";
import { useState } from "react";
import UploadFile from "./components/UploadFile";
import Tables from "./components/Tables";


// const UploadFile = ({ setTablesData }) => {

//   function readmultifiles(files) {
//     var reader = new FileReader();
//     const newTablesData = [];
//     function readFile(index) {
//       if (index >= files.length) return;
//       // const newTableData = [];
//       const fullTableData = {
//         data: [],
//         fileName: null
//       }
//       var file = files[index];
//       reader.onload = function (e) {
//         var text = e.target.result;
//         const dataObject = JSON.parse(text);
//         if (!dataObject) return
//         const scvText = json2csv([dataObject], { delimiter: { field: '^$' } });
//         const rows = scvText.split('\n');
//         rows.forEach((row, i) => {
//           fullTableData.data[i] = row.split('^$');
//         });

//         fullTableData.fileName = file.name;
//         newTablesData.push(fullTableData);
//         console.log(fullTableData);

//         readFile(index + 1);
//         if (index == files.length - 1) {
//           setTablesData(newTablesData);
//         }
//       }
//       reader.readAsText(file);
//     }
//     readFile(0);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const files = e.target[0].files;
//     if (files.length < 1) return
//     readmultifiles(files);
//   };

//   return (
//     <div id="upload-block">
//       <form action='' onSubmit={submitHandler}>
//         <input type="file" accept=".json" multiple />
//         <p>Here you can upload json file on CPB product</p>
//         <button type="submit">Continue</button>
//       </form>
//     </div>
//   )
// }

// const CellInput = ({ field, blurHandler }) => {
//   return (
//     <td className={styles.td}>
//       <input type="text" defaultValue={field} onBlur={blurHandler} />
//     </td>
//   )
// }

// const Table = ({ tableData, fileName }) => {
//   const copyTableData = structuredClone(tableData);

//   const [updatedDataURL, setUpdatedDataURL] = useState('');

//   const blurHandler = (e) => {
//     const value = e.target.value;
//     const cellEl = e.target.parentElement;
//     const rowElem = cellEl.parentElement;
//     const fieldIndex = Array.prototype.indexOf.call(rowElem.children, cellEl);
//     const rowIndex = 1;
//     copyTableData[rowIndex][fieldIndex] = value;

//     const tableDataToConvert = structuredClone(copyTableData)
//     tableDataToConvert.forEach((row, i, arr) => arr[i] = row.join(','));
//     const csvData = tableDataToConvert.join('\n');
//     const outputJSON = JSON.stringify(csv2json(csvData)[0]);
//     setUpdatedDataURL("data:text/json;charset=utf-8," + encodeURIComponent(outputJSON));
//   }

//   return (
//     <div className={styles.tableWrapper}>
//       {tableData.length > 0 && updatedDataURL && <a id='download-result' className={styles.downloadBtn} download={'updated_' + fileName} href={updatedDataURL}>Download JSON</a>}
//       <table className={styles.table}>
//         <caption>{fileName}</caption>
//         {tableData.map((row, index) => {
//           if (index == 0) {
//             return (
//               <thead key={'$#' + index}>
//                 <tr>
//                   {row.map((field, index) => {
//                     return (
//                       <th className={styles.td} key={'$#' + index}>{field}</th>
//                     )
//                   })}
//                 </tr>
//               </thead>
//             )
//           } else {
//             return (
//               <tbody key={'$#' + index}>
//                 <tr>
//                   {row.map((field, index) => {
//                     return (
//                       <CellInput field={field} key={'$#' + index} blurHandler={blurHandler} />
//                     )
//                   })}
//                 </tr>
//               </tbody>
//             )
//           }
//         })}
//       </table>
//     </div>
//   )
// }

// const Tables = ({ tablesData }) => {
//   return (
//     <div className='tables'>
//       {tablesData.map((fullTableData, index) => {
//         return (
//           <Table tableData={fullTableData.data} fileName={fullTableData.fileName} key={'$#' + index} />
//         )
//       })}
//     </div>
//   )
// }

const Container = () => {
  const [tablesData, setTablesData] = useState([]);

  return (
    <>
      <UploadFile setTablesData={setTablesData} tablesData={tablesData} />
      <Tables tablesData={tablesData} />
    </>
  )
}


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Container />
      </main>
    </div>
  )
}
