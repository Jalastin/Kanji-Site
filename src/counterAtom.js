import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const counterStateAtom = atom({
    key: 'counterStateAtom',
    default: '',
    effects_UNSTABLE: [persistAtom],
});