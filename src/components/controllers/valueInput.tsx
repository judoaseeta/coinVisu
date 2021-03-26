import styles from './styles/valueInput.module.scss';

export interface ValueInputProps {
    value: number;
    noSubmitButton?: boolean;
    inputSize?: string;
    id?: string;
    onChange: React.ChangeEventHandler;
    onDecrease: React.MouseEventHandler;
    onIncrease: React.MouseEventHandler;
}
const ValueInput:React.FC<ValueInputProps> = ({
    value,
    onChange,
    onIncrease,
    onDecrease,
    id,
    noSubmitButton,
    inputSize
}) => 
<div
    className={styles.container}
>
    <input 
        type="text"
        value={value}
        onChange={onChange}
        id={id}
        style={{
            width: inputSize
        }}
    />
    <div
        className={styles.buttons}
    >
        <button
            className={styles.arrow}
            onClick={onIncrease}
            type="button"
        >▲</button>
        <button
            className={styles.arrow}
            onClick={onDecrease}
            type="button"
        >▼</button>
    </div>
    {
        !noSubmitButton &&
        <button
            className={styles.submit}
            type="submit"
        >요청</button>
    }
</div>

export default ValueInput;
