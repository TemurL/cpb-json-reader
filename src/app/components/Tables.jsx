import styles from "@/app/page.module.scss";
import Table from "@/app/components/Table"

export default function Tables({ tablesData, setTablesData }) {
    const downloadAllClickHandler = (e) => {
        const container = e.target.parentElement;
        const allDownloadBtns = container.querySelectorAll('.download-btn');
        console.log(allDownloadBtns);
        allDownloadBtns.forEach(btn => btn.click());
    }

    return (
        <div className='tables'>
            {tablesData.length > 1 && <button className={`${styles.downloadAll} ${styles.button}`} onClick={downloadAllClickHandler}>Download All</button>}
            {tablesData.map((fullTableData, index) => {
                return (
                    <Table allTablesFullData={tablesData} tableData={fullTableData.data} fileName={fullTableData.fileName} key={'$#' + index} setTablesData={setTablesData} />
                )
            })}
        </div>
    )
}