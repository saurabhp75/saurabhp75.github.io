---
layout: single
title: "Python Regex"
excerpt: "Intro to Python Regex"
---


### Python Regular expressions
- Available through the **re module**.

**Note**: Alphanumeric characters=[a-zA-Z0-9_]

**Note**: Python automatically concatenates string literals delimited by whitespace.

### Matching Characters
- Most letters and characters will simply match themselves. 
- For example, the regular expression "test" will match the string "test" exactly.
- There is case insensitive option also.
- There are exceptions to this rule, some characters are special **metacharacters**, and don’t match themselves. 
- Instead, they signal that some out-of-the-ordinary thing should be matched, 
- Or they affect other portions of the RE by repeating them or changing their meaning. 

### Complete list of the metacharacters
- `. ^ $ * + ? { } [ ] \ | ( )`

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
|:--------|:-------|
| **\d** |Matches any decimal digit; this is equivalent to the class [0-9]|
| **\D** |Matches any non-digit character; this is equivalent to the class [^0-9]|
| **\s** |Matches any whitespace character; this is equivalent to the class [ \t\n\r\f\v]|
| **\S** |Matches any decimal digit; this is equivalent to the class [^ \t\n\r\f\v]|
| **\w** |Matches any decimal digit; this is equivalent to the class [a-zA-Z0-9_]|
| **\W** |Matches any decimal digit; this is equivalent to the class [^a-zA-Z0-9_]|


These sequences can be included inside a character class. For example, [\s,.] is a character class that will match any whitespace character, or `,` or `.`.  

The final metacharacter in this section is .. It matches anything except a *newline* character, and there’s an alternate mode (re.DOTALL) where it will match even a newline. . is often used where you want to match “any character”.  

### Repeating Things
- "": doesn’t match the literal character ''; instead, it specifies that the previous character can be matched zero or more times, instead of exactly once.  

### Repetitions are greedy
- When repeating a RE, the matching engine will try to repeat it as many times as possible. If later portions of the pattern don’t match, the matching engine will then back up and try again with fewer repetitions.
- a[bcd]b matches abcbd, with only the abcb part last 'd' is not matched.

Another repeating metacharacter is +, which matches one or more times. 

Another repeating qualifier, the question mark character, ?, matches either once or zero times; you can think of it as marking something as being **optional**.  

The most complicated repeated qualifier is {m,n}, where m and n are *decimal integers*. This qualifier means there must be at least m repetitions, and at most n.  

You can omit either m or n. Omitting m is interpreted as a lower limit of 0, while omitting n results in an upper bound of infinity.  

- *={0,}
- +={1,}
- ?={0,1}  

*Note*:  better to use *, +, or ? when you can, simply because they’re shorter and easier to read.

### Compiling Regular Expressions
- Pattern object.
- Methods: search/substitute pattern matches etc.

```python
import re
a=re.compile(r"ABC", re.IGNORECASE). 
b=a.match("ABCxfhh")
print(b.group()) # prints ABC
```

### The Backslash Plague
- The RE is passed to re.compile() as a string. REs are handled as strings because regular expressions aren’t part of the core Python language, and no special syntax was created for expressing them.
- Both RE and python strings use \ to escape metachars.
- To match \section, you have to pass RX \\section as python string. So we pass \\\\section to re.compile().

Solution: Python raw strings 
- r"\n" contains two chars.
- r"\n" contains one (meta)char.
- "\\\\section" == r"\\section".

For eg in `re.compile(r'\d+')` r is needed as the search string contains backslash.


### Performing Matches
Following methods can be invoked on compiled **pattern object**.

| **Pattern object method**| **Description**|
|:--------|:-------|
|**match()**|Determine if the RE matches at the beginning of the string. Returns None if no match can be found. If they’re successful, a *match object* instance is returned, containing information about the match: where it starts and ends, the substring it matched, and more.|
|**search()**|Scan through a string, looking for any location where this RE matches. Returns None if no match can be found. If they’re successful, a *match object* instance is returned, containing information about the match: where it starts and ends, the substring it matched, and more.|
|**findall()**|Find all substrings where the RE matches, and returns them as a list.|
|**finditer()**|Find all substrings where the RE matches, and returns them as an iterator.|

### Methods on match Object

| **Match object method**| **Description**|
|--------|-------|
|**group()**|Return the string matched by the RE.|
|**start()**|Return the starting position of the match.|
|**end()**|Return the ending position of the match.|
|**span()**|Return a tuple containing the (start, end) positions of the match.|

### Module level methods
- The re module also provides top-level functions called match(), search(), findall(), sub(), and so forth.
- Workflow for object level methods. Compile re->match/search/findall->group()/span()/first(). 

### Compilation Flags
**Note:** Multiple flags can be specified by bitwise OR-ing them.  

| **Flag**| **Description**|
|:--------|:-------:|
|**ASCII, A**|Makes several escapes like \w, \b, \s and \d match only on ASCII characters with the respective property.|
|**DOTALL, S**|Make `.` match any character, including newlines.|
|**IGNORECASE, I**|Do case-insensitive matches.|
|**LOCALE, L**|Do a locale-aware match.|
|**MULTILINE, M**|Multi-line matching, affecting `^` and `$`.|
|**VERBOSE, X (for ‘extended’)**|Enable verbose REs, which can be organized more cleanly and understandably.|