import { createElement, Component } from 'react';

class ReactCSSTransitionGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, component } = this.props;

    return createElement(component, null, children);
  }
}

ReactCSSTransitionGroup.defaultProps = {
  component: 'div',
};

export default ReactCSSTransitionGroup;
