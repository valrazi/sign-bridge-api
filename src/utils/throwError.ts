import { Response } from "express";
import { InvalidCredentials } from "../common/errors/InvalidCredentials";
import { DataNotFound } from "../common/errors/NotFound";
import { conflict_data, general_error, not_found, wrong_credentials } from "./responseSend";
import { Conflict } from "../common/errors/ConflictData";

export function throw_error(error: Error | InvalidCredentials | DataNotFound | unknown) {
    console.log(error)
    if(error instanceof InvalidCredentials) {
        throw new InvalidCredentials()
    }else if(error instanceof DataNotFound) {
        throw new DataNotFound()
    }else {
        throw error
    }
}

export function return_error(error: Error | InvalidCredentials | DataNotFound | unknown, res: Response) {
    console.log(error)
    if(error instanceof InvalidCredentials) {
        wrong_credentials(res)
    }else if(error instanceof DataNotFound) {
        not_found(res)
    }else if(error instanceof Conflict) {
        conflict_data(res)
    }else {
        general_error(res)
    }
}