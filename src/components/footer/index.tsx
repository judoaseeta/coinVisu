import React from 'react';
import styles from './styles/footer.module.scss';

const Footer: React.FC = () => 
<footer
    className={styles.footer}
>
    <section
        className={styles.container}
    >
        <h3>코인비쥬: CoinVisu</h3>
        <div
            className={styles.unit}
        >
            <p>어플리케이션 깃헙 리포지터리</p>
            <a 
                className={styles.link}
                href="https://github.com/judoaseeta/coinvisu"
                target="_blink"
            >
                보러가기
            </a>
        </div>
        <div
            className={styles.unit}
        >
            <p>제작자 블로그:</p>
            <a 
                className={styles.link}
                href="https://royroy.tech"
                target="_blink"
            >
                보러가기
            </a>
        </div>
        <div
            className={styles.unit}
        >
            <p>Made with <span><a className={styles.link} href="https://cryptocompare.com">CryptoCompare.com</a></span></p>
        </div>
    </section>
</footer>;

export default Footer;
