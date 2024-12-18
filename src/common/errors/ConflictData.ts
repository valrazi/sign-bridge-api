export class Conflict extends Error {
    constructor(message?: string) {
        super(message)
        this.name = 'Conflict'
        Object.setPrototypeOf(this, Conflict.prototype)
    }
}