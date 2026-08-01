// Handling Errors
try {

}
catch(err){

    res.statusCode = 500;
    res.end("Internal Server Error");

}