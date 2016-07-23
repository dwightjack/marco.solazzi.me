import { Component, createElement } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import hoistNonReactStatic from 'hoist-non-react-statics';

const pure = (functionalComponent) => {

    class PureComponent extends Component {
        shouldComponentUpdate(nextProps, nextState) {
            return shallowCompare(this, nextProps, nextState);
        }
        render() {
            return createElement(functionalComponent, Object.assign({}, this.props));
        }
    }

    hoistNonReactStatic(PureComponent, functionalComponent);

    PureComponent.displayName = (functionalComponent.displayName ||
    functionalComponent.name || 'PureComponent');

    return PureComponent;
};

export default pure;
