export class BadRequest extends Error {
    constructor(message?: string) {
        super(message)
        this.name = 'Bad Request'
        Object.setPrototypeOf(this, BadRequest.prototype)
    }
}