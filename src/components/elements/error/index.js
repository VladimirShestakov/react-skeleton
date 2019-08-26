/**
 * Вывод ошибки из общего массива ошибок
 * У каждой ошибки ожидайется ключ, соответсвующий пути на свойство модели, например "profile.name"
 * Компонент выводит ошибку, если по указанному ключу есть ошибка в общем массиве ошибок
 * @todo Вместо массива ошибок использовать объект, чтобы оптимизироват поиск
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style.less';

class Error extends Component {
  static propTypes = {
    path: PropTypes.string,
    errors: PropTypes.any,
  };

  renderItems() {
    const { path, errors } = this.props;

    if (!errors && !(errors instanceof Array) && !(errors instanceof Object)) {
      return null;
    }
    const errorItems = errors instanceof Array ? errors : [errors];
    const items = [];

    errorItems.map(item => {
      if (!item || !item.message) {
        return;
      }

      if (
        (item.path && item.path.indexOf(path) === 0 && path.length > 0) ||
        (item.path.length === 0 && path.length === 0) ||
        (!item.path && !path)
      ) {
        items.push(
          <div key={item.code} className={styles.Error__item}>
            {item.message}
          </div>,
        );
      }
    });
    return items;
  }

  render() {
    return <div className={styles.Error}>{React.Children.toArray(this.renderItems())}</div>;
  }
}

export default Error;
