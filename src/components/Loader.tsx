import CircularProgress from '@mui/joy/CircularProgress';

import styles from '../App.module.scss'

export const Loader = () => (
  <div className={styles.loader}>
    <CircularProgress
      color="danger"
      determinate={false}
      size="lg"
      variant="plain"
    />
  </div>
)