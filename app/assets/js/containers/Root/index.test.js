import { mount } from '../../shared/test-utils';
import Root from './index';

/* eslint-env jest */
describe('<Root>', () => {

    let vm;

    beforeEach(() => {
        vm = mount(Root);
    });

    it('should render a <div> tag', () => {
        expect(vm.$el.tagName).toBe('DIV');
    });

    it('should contain "Hello World"', () => {
        expect(vm.$el.textContent.trim()).toBe('Hello World');
    });

});