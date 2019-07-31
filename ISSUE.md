## Issue Logs

-----

### [Scss] Lexical error on line 1: Unrecognized text. Erroneous area: 1: $fontSizeBasic * 0.85
+   **Runtime Environment**
    +   bundle tool : **`webpack@~4.29.6`**
    +   bundle scaffold : based on **`crate-react-app@^3.0.1`**
    +   CSS pre-processor : **`Scss`**
+   **Solution**
    +   when you need to use **variable** in **`calc`** statement within **scss** , warp it by using **`#{}`**

        ```stylesheet
        // throw error
        .box {
            width: calc($baseWidth * 0.5);
        }

        // corret syntax
        .box {
            width: calc(#{$baseWidth} * 0.5);
        }
        ```