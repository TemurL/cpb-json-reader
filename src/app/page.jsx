'use client'

import styles from "@/app/page.module.scss";
import { useState } from "react";
import UploadFile from "@/app/components/UploadFile";
import Tables from "@/app/components/Tables";

const Container = () => {
  const [tablesData, setTablesData] = useState([]);

  return (
    <>
      <UploadFile setTablesData={setTablesData} tablesData={tablesData} />
      <Tables tablesData={tablesData} setTablesData={setTablesData} />
    </>
  )
}


export default function Home() {
  return (
    <div className={styles.page} >
      <main className={styles.main}>
        <Container />
      </main>
    </div>
  )
}
