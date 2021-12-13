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
        this.storage.setItem(this.name, JSON.stringify(value, null));
    }

    get() {
        const val = this.storage.getItem(this.name);

        return !!val ? JSON.parse(val) : false;
    }

    remove() {
        if (this.has()) {
            this.storage.removeItem(this.name);
        }
    }
}
