//this is 1.js
function test1(){
    //function test1
    var var1 = '1';
    console.log(var1);
}

function test2(input){
    var var2 = input;
    console.log(var2);
}

function test3(){
    console.log("test3");
    test1();
    test2("test3");
}

function test4(){
    console.log("test4");
    test1();
}

function test5(){
    console.log("test5");
    test2("test5");
}

function toBeTest(input){
    return input*2;
}