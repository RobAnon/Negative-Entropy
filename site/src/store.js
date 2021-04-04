import { writable } from 'svelte/store';

const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);
  
  return {
    subscribe,
    set,
    useSessionStorage: () => {
      const json = sessionStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        sessionStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const web3Loaded = createWritableStore('count', 0);