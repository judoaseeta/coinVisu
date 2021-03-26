import React from 'react';
import AddPortFolio from './addPortfolio';
import Portfolios from './portfolios';
// styles
import styles from './styles/portFolios.module.scss';

const PortFoliosPage: React.FC = () =>
<div
    className={styles.container}
>
    <Portfolios />
    <AddPortFolio />
</div>;

export default PortFoliosPage;
