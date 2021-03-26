import React from 'react';
// components
import ValueInput, { ValueInputProps } from './valueInput';
// styles
import styles from './styles/minute.module.scss';

export type MinuteControllerProps = ValueInputProps & {
    onSubmit: React.FormEventHandler;
};
const MinuteController:React.FC<MinuteControllerProps> = ({
    value,
    onChange,
    onDecrease,
    onIncrease,
    onSubmit
}) => 
<form
    className={styles.container}
    onSubmit={onSubmit}
>
    <p
        className={styles.description}
    >현 시각으로 부터 {value}분  전까지의 데이터</p>
    <ValueInput 
        value={value}
        onChange={onChange}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
    />
</form>;

export default MinuteController;
