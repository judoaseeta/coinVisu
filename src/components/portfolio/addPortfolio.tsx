import React from 'react';
// components
import Loading from '../loading';
// utils
import { symbolWithConsonant } from '../../utils/consonant';
//styles
import classnames from 'classnames/bind';
import styles from './styles/addPortfolio.module.scss';
const cx = classnames.bind(styles);
export interface AddPortFolioProps {
    on: boolean;
    isLogin: boolean;
    addPortfolioLoading: string;
    symbol: string;
    purchasePrice: string;
    purchaseAmount: string;
    priceError: string;
    amountError: string;
    onContainerClick: React.MouseEventHandler;
    onPriceChange: React.ChangeEventHandler;
    onAmountChange: React.ChangeEventHandler;
    onLoginClick: React.MouseEventHandler;
    onKeyDown: React.KeyboardEventHandler;
    onSubmit: React.FormEventHandler;
    toggle: (toggle: boolean) => void;
}
const AddPortFolio = React.forwardRef<HTMLDivElement, AddPortFolioProps>(({
    on,
    isLogin,
    symbol,
    purchaseAmount,
    purchasePrice,
    priceError,
    amountError,
    addPortfolioLoading,
    onContainerClick,
    onPriceChange,
    onAmountChange,
    onKeyDown,
    onSubmit,
    onLoginClick,
    toggle,
}, ref) => 
<div
    className={cx('container')}
    onClickCapture={onContainerClick}
>
{
    isLogin && 
    on &&
    <div
        className={cx('wrapper',{
            on: on
        })}
        ref={ref}
        onKeyDown={onKeyDown}
    >
                <form
                    className={styles.form}
                    onSubmit={onSubmit}
                >
                    <Loading 
                        loadingMessage={addPortfolioLoading}
                        isAbsolute={true}
                        colorOption="dark"
                    />
                    <h3>{symbolWithConsonant(symbol,'obj')} 포트폴리오에 추가합니다.</h3>
                    <div
                        className={styles.inputUnits}
                    >
                        <div
                            className={styles.inputUnit}
                        >
                            <label
                                htmlFor="purchasePrice"
                            >매입가</label>
                            <input 
                                type="text"
                                id="purchasePrice"
                                pattern={"[0-9]+[.]?[0-9]*"}
                                inputMode="numeric"
                                onChange={onPriceChange}
                                value={purchasePrice}
                            />
                            <p
                                className={styles.message}
                            >{priceError}</p>
                        </div>
                        <div
                            className={styles.inputUnit}
                        >
                            <label
                                htmlFor="purchaseAmount"
                            >매입수량</label>
                            <input 
                                type="text"
                                id="purchaseAmount"
                                pattern={"[0-9]+[.]?[0-9]*"}
                                inputMode="numeric"
                                onChange={onAmountChange}
                                value={purchaseAmount}
                            />
                            <p
                                className={styles.message}
                            >{amountError}</p>
                        </div>
                    </div>
                    <div
                        className={styles.buttons}
                    >
                        <button
                            className={styles.baseButton}
                            
                            type="submit"
                        >
                            추가하기
                        </button>
                        <button
                            className={styles.backButton}
                            onClick={() => toggle(false)}
                        >
                            돌아가기
                        </button>
                    </div>
                </form>
    </div>
    }
    {
            isLogin &&
            <div
                className={styles.offWrapper}
            >
                <p>{symbolWithConsonant(symbol,'obj')} 포트폴리오에 추가해보세요!</p>
                <button
                    className={styles.baseButton}
                    type="button"
                    onClick={() => toggle(true)}
                >
                    추가하기
                </button>
            </div>
        }
    {
            !isLogin &&
            !on &&
            <div
                className={styles.offWrapper}
            >
                <p>포트폴리오에 추가하기 위해선, 로그인이 필요합니다!</p>
                <button
                    className={styles.baseButton}
                    onClick={onLoginClick}
                    type="button"
                >
                    로그인 하러 가기
                </button>
            </div>
        }
</div>
);

export default AddPortFolio;
