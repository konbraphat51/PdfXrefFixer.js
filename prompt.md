- Create JavaScript function `FixXref()` that fixes the footer in PDF data
    - The footer refers:
        - Cross Reference Table
        - trailer (until `EOF`)
    - If some footer already written, delete it and write a new one.
    - The input data is string of PDF data
    - The output is the fixed string of PDF data

- Make `index.html` able to test `FixXref()` through browser GUI