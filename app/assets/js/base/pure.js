import { Component, PureComponent, createElement } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { shallowEqual, pick } from './utils';



/**
 * Converts a functional stateless component to a pure component
 *
 * @param {function} functionalComponent - React functional component
 * @returns {PureComponent}
 * @example
 *
 *  const Name = (props) => (<p className={props.className}>{props.name}</p>);
 *
 *  //make it pure
 *  const PureName = pure(Name);
 *
 */
const pure = (functionalComponent) => {

    class FunctionalPureComponent extends PureComponent {
        render() {
            return createElement(functionalComponent, Object.assign({}, this.props));
        }
    }

    hoistNonReactStatic(FunctionalPureComponent, functionalComponent);
    FunctionalPureComponent.displayName = (functionalComponent.displayName || functionalComponent.name || 'PureComponent');

    return FunctionalPureComponent;

};

export default pure;



/**
 * Converts a functional stateless component to a pure component.
 *
 * Pure component shallow check will be executed just on the passed in props
 *
 * @param {function} functionalComponent - React functional component
 * @param {...string} keys - Keys to watch for changes
 * @returns {PureComponent}
 * @example
 *
 *  const Name = (props) => (<p className={props.className}>{props.name}</p>);
 *
 *  //since className won't change I just want to check for `name` prop changes;
 *  const PureName = pureWithPropKeys(Name, 'name');
 *
 */
export const pureWithPropKeys = (functionalComponent, ...keys) => {

    class FunctionalPureComponentWithKeys extends Component { //eslint-disable-line react/no-multi-comp

        constructor(props) {
            super(props);
            const hasProp = Object.prototype.hasOwnProperty.bind(props);
            this._updateKeys = keys.filter((k) => hasProp(k));
        }

        shouldComponentUpdate(nextProps) {

            const uKeys = this._updateKeys;

            return !shallowEqual(pick(nextProps, uKeys), pick(this.props, uKeys));
        }

    }

    hoistNonReactStatic(FunctionalPureComponentWithKeys, functionalComponent);
    FunctionalPureComponentWithKeys.displayName = (functionalComponent.displayName || functionalComponent.name || 'PureComponent');

    return FunctionalPureComponentWithKeys;

};