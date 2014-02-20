Switcher 1.2
========

Javascript switch library.

Basic Usage
-----------

    Switcher(myVar)
        .Case("case1", function() {
            // Case1
        })
        .Case("case2", function() {
            // Case2
        })
        .Case("case3", function() {
            // Case3
        })
        .Default(function() {
            // Default
        });

Regex
-----

Use regex right in the case test (This can allow multiple cases to execute).

    Switcher("apples, oranges, bannanas")
        .Case(/oranges/, function() {
            // Will Run
        })
        .Case(/apples/, function() {
            // Will Run
        })
        .Case(/pear/, function() {
            // Will Not Run
        });

Expressions as Test Case
-------------------

Pass an expression to a case to match a true expression

    Switcher(myVar)
        .Case(myVar > 5, function() {
            // Will run if myVar is greater than 5
        })
        .Case(myVar < 5, function() {
            // Will run if myVar is less than 5
        })
        .Case(5, function() {
            // Will run if myVar equals 5
        });
        
Multiple Tests in Case
-------------------

Pass an array to a case test to match multiple values

    Switcher(myVar)
        .Case([1, 2, 3], function() {
            // Will run if myVar is equal to 1, 2, or 3
        });
        
Assign Directly to a Variable
-----------------------------

Return the results of the function right to a variable by adding `.Results` to the end of your Switch.

    var myResult = Switcher(myVar)
        .Case("case1", function() {
            return a * b;
        }).Results;

Pass a variable or value to skip needing a function. Can be helpful to achieve similar functionality to nested ternarys.

    var sound = Switcher(animal)
        .Case("dog", "bark")
        .Case("cow", "moo")
        .Case("cat", "meow").Results;
        
To assign instead of evaluate a function, pass false as the second parameter of Switcher.

    var myResult = Switcher(myVar, false)
        .Case("case1", function() {
            return "Function for later"
        });
    myResult(); // "Function for later"
        
        
Some Technical Disclaimers
--------------------------

Case evaluation is **NOT** short-circuit. All cases will execute. This means for Assignments, if multiple cases match your switch, you will only get the results of the last case matched.

If the switch expression evalues to a boolean, a case expression must match the switch expression. In the example:

    var myVar = false;
    Switcher(myVar)
        .Case(true, function() {
            // Will not run
        })
        .Case(false, function() {
            // Will run
        })
        .Case(myVar == false, function() {
            // Will not run
        });
