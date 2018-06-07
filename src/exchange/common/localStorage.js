// Localstorage
import {ls_key_exists} from "./localStorageImpl";

// if (null === ls)
    // throw "localStorage is required but isn't available on this platform";

const localStorage = key => {
    var STORAGE_KEY = key;

    return {
        get(key, dv = {}) {
						let rv;
            try {
								// if(!ls.getItem && localStorage.getItem){
								// 	ls = localStorage
								// }
                if (ls_key_exists(STORAGE_KEY + key, localStorage)) {
                    rv = JSON.parse(localStorage.getItem(STORAGE_KEY + key));
                }
                return rv ? rv : dv;
            } catch (err) {
                return dv;
            }
        },

        set(key, object) {
            if (object && object.toJS) {
                object = object.toJS();
						}
						if(localStorage.setItem){
							localStorage.setItem(STORAGE_KEY + key, JSON.stringify(object));
						}
        },

        remove(key) {
					if(localStorage.removeItem){
						localStorage.removeItem(STORAGE_KEY + key);
					}						
        },

        has(key) {
            return ls_key_exists(STORAGE_KEY + key, localStorage);
        }
    };
};

export default localStorage;
