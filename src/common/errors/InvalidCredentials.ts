export class InvalidCredentials extends Error {
    constructor(message?: string) {
        super(message)
        this.name = 'InvalidCredentials'
        Object.setPrototypeOf(this, InvalidCredentials.prototype)
    }
}