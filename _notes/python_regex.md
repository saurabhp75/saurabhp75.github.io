---
layout: single
title: "Python Regex"
excerpt: "Intro to Python Regex"
---


### Python Regular expressions
- Available through the **re module**.

Note: Alphanumeric character, [a-zA-Z0-9_]

### Matching Characters
- Most letters and characters will simply match themselves. 
- For example, the regular expression "test" will match the string "test" exactly.
- There is case insensitive option also.
- There are exceptions to this rule, some characters are special **metacharacters**, and don’t match themselves. 
- Instead, they signal that some out-of-the-ordinary thing should be matched, 
- Or they affect other portions of the RE by repeating them or changing their meaning. 

### Complete list of the metacharacters
. ^ $ * + ? { } [ ] \ | ( )

### Specifying a character class
- Character class is a set of characters that you wish to match.
- Characters can be listed individually, For example, [abc] will match any of the characters a, b, or c
- Or a range of characters can be indicated by giving two characters and separating them by a '-'
- [abc] is the same as [a-c], which uses a range to express the same set of characters. 
- If you wanted to match only lowercase letters, your RE would be [a-z].
- Metacharacters are not active inside classes. 
- For example, [akm$] will match any of the characters 'a', 'k', 'm', or '$'.
- You can match the characters not listed within the class by complementing the set. 
- This is indicated by including a '^' as the first character of the class. 
- For example, [^5] will match any character except '5'. 
- If the caret appears elsewhere in a character class, it does not have special meaning. For example: [5^] will match either a '5' or a '^'.

### Use of the metacharacter backslash, \
- Backslash can be followed by various characters to signal various special sequences.
- It’s also used to escape all the metacharacters so you can still match them in patterns.
- For example, if you need to match a [ or \, you can precede them with a backslash to remove their special meaning.
- Some of the special sequences beginning with '\' represent predefined sets of characters that are often useful.
- Such as the **set of digits**, the **set of letters**, or the **set of anything that isn’t whitespace.
- \w matches any **alphanumeric character**, this is equivalent to the class [a-zA-Z0-9_].



| Regex| Match|
|:--------|:-------:|
| **\d** |Matches any decimal digit; this is equivalent to the class [0-9]|
| **\D** |Matches any non-digit character; this is equivalent to the class [^0-9]|
| **\s** |Matches any whitespace character; this is equivalent to the class [ \t\n\r\f\v]|
| **\S** |Matches any decimal digit; this is equivalent to the class [^ \t\n\r\f\v]|
| **\w** |Matches any decimal digit; this is equivalent to the class [a-zA-Z0-9_]|
| **\W** |Matches any decimal digit; this is equivalent to the class [^a-zA-Z0-9_]|
