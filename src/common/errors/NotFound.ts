export class DataNotFound extends Error {
    constructor(message?: string) {
        super(message)
        this.name = 'DataNotFoundError'
        Object.setPrototypeOf(this, DataNotFound.prototype)
    }
}