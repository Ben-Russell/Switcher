Switcher
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
        
        
Some Technical Disclaimers
--------------------------

Case evaluation is **NOT** short-circuit. All cases will execute, if multiple cases match your switch, you will only get the results of the last case.
