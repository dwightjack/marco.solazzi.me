import {
    GROUP_LOADER
} from '@/shared/constants';

export default {
    isLoading(state) {
        return state.activeGroup === GROUP_LOADER;
    }
};