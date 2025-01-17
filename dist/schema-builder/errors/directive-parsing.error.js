"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DirectiveParsingError extends Error {
    constructor(sdl) {
        super(`Directive SDL "${sdl}" is invalid. Please, pass a valid directive definition.`);
    }
}
exports.DirectiveParsingError = DirectiveParsingError;
