import { mutations } from './ui.mutations';
import { actions } from './ui.actions';

export default {

    namespaced: true,

    mutations,

    actions,

    state: {
        isLoaded: false,
        activeNav: false,
        activeGroup: '',
        route: '',
        pagelistScroll: 0
    }

};