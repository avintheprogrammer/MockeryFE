import React from 'react';
import Article from '../Article';

import styles from './styles.scss';

/**
 * Article Page Component
 * Responsible for rendering out our Article component, passing it an ID to query for.
 * Also constructs the base grid elements for our layout.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */
const ArticlePage = () => (
  <div className={styles.container}>
    <Article id="103944510" />
  </div>
);

export default ArticlePage;
