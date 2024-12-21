import styles from "../page.module.css";
import Table from "./Table"

export default function Tables({ tablesData }) {

    const downloadAllClickHandler = (e) => {
        const container = e.target.parentElement;
        const allDownloadBtns = container.querySelectorAll('.download-btn');
        console.log(allDownloadBtns);
        allDownloadBtns.forEach(btn => btn.click());
    }

    return (
        <div className='tables'>
            {tablesData.length > 1 && <button className={styles.downloadAll} onClick={downloadAllClickHandler}>Download All</button>}
            {tablesData.map((fullTableData, index) => {
                return (
                    <Table tableData={fullTableData.data} fileName={fullTableData.fileName} key={'$#' + index} />
                )
            })}
        </div>
    )
}