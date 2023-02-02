import { get } from '../utility/helpers';
/**
 * eases up to use the session and the local storage in code.
 * abstracts away the JSON usage
 */

export class Storage {
    name;
    storage = window.localStorage;
    constructor(name, type = 'local') {
        this.name = name;
        this.storage = type === 'local' ? window.localStorage : window.sessionStorage;
    }

    has() {
        return !!this.storage.getItem(this.name);
    }

    set(value) {
        this.storage.setItem(this.name, JSON.stringify(value, null))
    }
    get() {
        const val = this.storage.getItem(this.name);

        return !!val ? JSON.parse(val) : false;
    }

    getItem(prop) {
        const val = this.storage.getItem(this.name);

        if (!!val) {
            const parsedVal = JSON.parse(val);

            return !!parsedVal[prop] ? parsedVal[prop] : false;
        }
        return false;
    }

    remove(key) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }
}
