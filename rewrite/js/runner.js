(function(){
    var myGarba = makeGarba();
    printGarba(myGarba);
    for(var r = 0; r<myGarba.length; r++){
        makeBlob(myGarba[r]);
    }
})();