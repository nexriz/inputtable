## Inputtable

#### Just a funny spaghetti code project

> Me trying out the Shunting yard algorithm

[Shunting Yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)

```
Expressions -> atm very simple
Example:
=(5 - 1) *2
=( 2 ^ 2 ^ 2 * 3 + ( 2 * 2 + ( 5 * 10 ) / 2 ) ) ^ 2
=5^(2^(2^2)),
=5^2^2^2
=+5- -5
=+5 0- -5
=+5+ + -5
=2.5 + 2.5
=2.5^2
=10 + 25 - 30
=((3 * (25 / 5) - 15) + 2)^2^2
=(5 - 1) * 2

Regex
Hello
^hi\s[0-9]*
\s|(?=[\-\+\/\^*\(\)])|(?<=[^-0-9.]+)

Its very buggy tho
```


![Alt Text](https://media.giphy.com/media/gj057zIpAB0yqyfGZG/giphy.gif)
![Alt Text](https://media.giphy.com/media/loM7xB5YTAoENETg2P/giphy.gif)
![Alt Text](https://media.giphy.com/media/SvonehsCDSpk1JKIQd/giphy.gif)
![Alt Text](https://media.giphy.com/media/cn9ZxwfaKcGezoaqnc/giphy.gif)


````
  Functionality so far
  
  You can add rules to columns
    - calc expressions
    - Regex str
    
  You can multiselect columns and rows -> and fill them all with typed text.
  
  ctrl-z on selected columns and rows lets you go back in history, retreiving old values etc
  

````

