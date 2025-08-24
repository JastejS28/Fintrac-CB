class ErrorHandler extends Error{
    constructor(statusCode, message, errors=[],stack=""){
        super(message);

        this.statusCode= statusCode;   // right side is for passing status code and is temporary, left side is adding to your custom error object so I can use it later
        this.message=message;
        this.errors= errors;
        this.success= false;

        if(stack){
            this.stack= stack;
        }else{
            Error.captureStackTrace(this, this.constructor);  // this will capture the stack trace of the error and assign it to the stack property of the error object
        }
    }
}

export default ErrorHandler;