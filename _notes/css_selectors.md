---
layout: single
title: "CSS Selectors"
excerpt: "Intro to CSS Selectors"

sidebar:
  - title: "CSS Selectors personal notes"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---

<!-- CSS Selectors -->

1. Element type(‘p’ ): Select all paragraph elements

2. Element ID(‘#25’): Select all elements with id=25

3. Element Class('.text'): Select all elements with class=text

4. Descendant combinator(‘ ‘ or ‘-’): eg. ‘div p’ , Select all paragraph elements (descendants) under div elements

5. Child combinator(‘div>p’ ): Select all paragraph elements whose immediate parent is div

6. Attribute(‘div[attr]’ ): Select all div elements having ‘attr’ attribute)

7. Attribute value(‘div[attr=val]’): Select all div elements with attr value equal to ‘val’

8. Universal selector ‘\*’ : Matches any type, usually ommited, eg.  ‘*.text’ and ‘.text’ are same.

9. \[attr~=value]: Elements with an attribute name of attr whose value is a whitespace-separated list of words, one of which is exactly value.

10. \[attr\|=value]: Represents elements with an attribute name of attr whose value can be exactly value or can begin with value immediately followed by a hyphen, \- \(U+002D). It is often used for language subcode matches.

11. \[attr^=value]: Represents elements with an attribute name of attr whose value is prefixed (preceded) by value.

12. \[attr$=value]: Represents elements with an attribute name of attr whose value is suffixed (followed) by value.

13. \[attr*=value]: Represents elements with an attribute name of attr whose value contains at least one occurrence of value within the string.

14. \[attr operator value I]: Adding an i (or I) before the closing bracket causes the value to be compared case-insensitively (for characters within the ASCII range).

15. Adjacent sibling combinator(+): eg. ‘img + p’,   matches the second element only if it immediately follows the first element, and both are children of the same parent element. 

16. General sibling combinator(~): eg. ‘img ~ p’, separates two selectors and matches the second element only if it follows the first element (though not necessarily immediately), and both are children of the same parent element. 

17. Psuedo classes(‘:’): pseudo-class is a keyword added to a selector that specifies a special state of the selected element(s). eg. div:hover, a:visited, :checked

18. Psuedo elements(‘:’ or ‘::’): pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). For example, ::first-line can be used to change the font of the first line of a paragraph. eg.
::after, ::before, ::cue, ::first-letter, ::first-line, ::selection, ::slotted, ::backdrop, ::placeholder, ::marker, ::spelling-error, ::grammar-error 

19. To extract attribute(‘::attr(attributename)’): Can be used to extract href from anchor tag(a).


# XPATH

**Absolute Xpath** :  Begins with ‘/’
**Relative Xpath** : Begins with ‘//’

- //input[@name='uid']: based on name attribute  
- //input[@type='text']: based on type of element  		
- //label[@id='message23']:  based on id of element  
- //input[@value='RESET']: based on value attribute  
- //*[@class='barone']:  based on class  
- //a[@href='http://demo.guru99.com/'] : based on href attribute  
- //img[@src='//cdn.guru99.com/images/home/java.png'] : based on source attribute  

- //*[contains(@type,'sub')]  
- //*[contains(@name,'btn')]  
- //*[contains(@id,'message')]  
- //*[contains(text(),'here')]  
- //*[contains(@href,'guru99.com')]  
	
- //*[@type='submit' OR @name='btnReset']  
- //input[@type='submit' AND @name='btnLogin']  
- //label[starts-with(@id,'message')]  
- //td[text()='UserID']

- //label[starts-with(@id,'message')]
- //td[text()='UserID']  	

## xpath axes methods
- //*[@type='text']//following::input  
- //*[text()='Enterprise Testing']//ancestor::div  : selects all ancestors parents, grandparents etc  
- //*[text()='Enterprise Testing']//ancestor::div[1]   : selects first ancestor  
- //*[@id='java_technologies']/child::li : select all child nodes  
- //*[@id='java_technologies']/child::li[1]  : selects first child node  
- //*[@type='submit']//preceding::input  
- //*[@type='submit']//following-sibling::input  
- //*[@id='rt-feature']//parent::div  
- //*[@type='password']//self::input  
- //*[@id='rt-feature']//descendant::a  