//this is 2.js
function testA(){
    //function testA
    var varA = 'A';
    console.log(varA);
}

function testB(input){
    var varB = input+input;
    console.log(varB);
}

function testC(){
    console.log("testC");
    testA();
    testB("testC");
}

function testD(){
    console.log("testD");
    testA();
}

function testE(){
    console.log("testE");
    testB("testE");
}