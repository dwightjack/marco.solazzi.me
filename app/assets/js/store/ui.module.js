import { GROUP_LOADER } from '@/shared/constants';
import { mutations } from './ui.mutations';
import { actions } from './ui.actions';

export default {

    namespaced: true,

    mutations,

    actions,

    state: {
        isLoaded: false,
        activeNav: false,
        activeGroup: GROUP_LOADER,
        route: '',
        pagelistScroll: 0,
        forcedScroll: false
    }

};