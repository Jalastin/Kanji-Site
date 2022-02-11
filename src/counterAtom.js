import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const counterStateAtom = atom({
    key: 'counterStateAtom',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// // https://github.com/facebookexperimental/Recoil/issues/619
// export const appendArrayToCounter = selector({
//     key: 'appendArrayToCounter',
//     // set: ({ get, set }, newItems = []) => {
//     //   if (newValue.length > 0) {
//     //     const currentItems = get(items);
//     //     const appendedItems = [...currentItems, ...newItems];
//     //     set(items, appendedItems);
//     //   }
//     // },
//     get: ({get}) => ({...get(counterStateAtom)}), 
//     set: ({set, get}, new_counter) => { 
//         let counterStateCopy = {...get(counterStateAtom)};
//         const appendedItems = [...counterStateCopy, ...new_counter];
//         set(counterStateAtom, appendedItems);
//     }
// });

// export const resetArray = selector({
//     key: 'resetArray',
//     // set: ({ get, set }, newItems = []) => {
//     //   if (newValue.length > 0) {
//     //     const currentItems = get(items);
//     //     const appendedItems = [...currentItems, ...newItems];
//     //     set(items, appendedItems);
//     //   }
//     // },
//     get: ({get}) => ({...get(counterStateAtom)}), 
//     set: ({set, get}) => { 
//         set(counterStateAtom, []);
//     }
// });
