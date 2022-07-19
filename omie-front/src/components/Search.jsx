import styles from './Search.module.css';

export function Search({ children }) {
  return(
    <article className={styles.search}>
      <header>
        { children }
      </header>
    </article>
  )
}