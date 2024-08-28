import styles from './hovering.module.css';
export default function Hovering() {
    return (
        <div className={styles.scene}>
            <div className={styles.cube_wrapper}>
                <div className={styles.cube}>
                    <div className={styles.cube_faces}>
                        <div className={`${styles.cube_face} ${styles.cube_face_top}`}>⚡</div>
                        <div className={`${styles.cube_face} ${styles.cube_face_left}`}></div>
                        <div className={`${styles.cube_face} ${styles.cube_face_right}`}></div>
                        <div className={`${styles.cube_face} ${styles.cube_face_back}`}></div>
                        <div className={`${styles.cube_face} ${styles.cube_face_front}`}></div>
                        <div className={`${styles.cube_face} ${styles.cube_face_bottom}`}></div>
                        <div className={`${styles.cube_face} ${styles.cube_face_light}`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
};