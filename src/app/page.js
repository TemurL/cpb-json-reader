import styles from "./page.module.css";
import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FileUpload />
      </main>
    </div>
  )
}
