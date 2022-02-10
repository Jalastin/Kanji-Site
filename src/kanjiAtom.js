import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const kanjiStateAtom = atom({
    key: 'kanjiStateAtom',
    default: '',
    effects_UNSTABLE: [persistAtom],
});