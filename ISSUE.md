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

### [express server] Uncaught SyntaxError: Unexpected token <
+   **App HTML Url**
    +   **`public/index.html`**
+   **App HTML Content**
    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="author" content="Stan Lee">
            <meta name="description" content="blog site version 5.0">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stan</title>
            <link rel="shortcut icon" type="image/x-icon" href="%PUBLIC_URL%/favicon.ico">
            <link rel="stylesheet" href="%PUBLIC_URL%/font-awesome/css/font-awesome.min.css">
            <link rel="stylesheet" href="%PUBLIC_URL%/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="%PUBLIC_URL%/index.css">
        </head>
        <body>
            <div id="root"></div>
            <script src="%PUBLIC_URL%/jquery/3.3.1/jquery.min.js"></script>
            <script src="%PUBLIC_URL%/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="%PUBLIC_URL%/index.js"></script>
        </body>
    </html>
    ```

+   **Solution**
    +   only need to import css or js file(s) that stored in **`public`** folder manually, bundle result would be imported automatically
    +   remove import statement tag about bundle result
    ```html
    <!-- <link rel="stylesheet" href="%PUBLIC_URL%/index.css"> -->
    <!-- <script src="%PUBLIC_URL%/index.js"></script> -->
    ```