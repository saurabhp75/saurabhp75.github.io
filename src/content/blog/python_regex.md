---
title: "Python Regex"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Python", "Regex"]
draft: false
description: "Introduction to Python Regex"
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
- Or a range of characters can be indicated by giving two characters and separating them by a '-'. [abc] is the same as [a-c], which uses a range to express the same set of characters.
- If you wanted to match only lowercase letters, your RE would be [a-z].
- Metacharacters are not active inside classes. For example, [akm$] will match any of the characters 'a', 'k', 'm', or '$'.
- You can match the characters not listed within the class by complementing the set. This is indicated by including a '^' as the first character of the class. For example, [^5] will match any character except '5'.
- If the caret appears elsewhere in a character class, it does not have special meaning. For example: [5^] will match either a '5' or a '^'.

### Use of the metacharacter backslash, \

- Backslash can be followed by various characters to signal various special sequences.
- It’s also used to escape all the metacharacters so you can still match them in patterns.
- For example, if you need to match a [ or \, you can precede them with a backslash to remove their special meaning.
- Some of the special sequences beginning with '\' represent predefined sets of characters that are often useful.
- Such as the **set of digits**, the **set of letters**, or the \*\*set of anything that isn’t whitespace.
- \w matches any **alphanumeric character**, this is equivalent to the class [a-zA-Z0-9_].

| Regex  | Match                                                                                |
| :----- | :----------------------------------------------------------------------------------- |
| **\d** | Matches any decimal digit; this is equivalent to the class [0-9]                     |
| **\D** | Matches any non-digit character; this is equivalent to the class [^0-9]              |
| **\s** | Matches any **whitespace character**; this is equivalent to the class [ \t\n\r\f\v]  |
| **\S** | Matches any non-whitespace character; this is equivalent to the class [^ \t\n\r\f\v] |
| **\w** | Matches any **alphanumeric character**; this is equivalent to the class [a-zA-Z0-9_] |
| **\W** | Matches any decimal digit; this is equivalent to the class [^a-za-z0-9_]             |

These sequences can be included inside a character class. For example, [\s,.] is a character class that will match any whitespace character, or `,` or `.`.

### Matching any character except newline

The final metacharacter in this section is `.`. It matches anything except a _newline_ character, and there’s an alternate mode(**re.DOTALL**) where it will match even a newline. `.` is often used where you want to match “any character”.

### Repeating Things

- `*`: doesn’t match the literal character `*`, instead, it specifies that the previous character can be matched zero or more times, instead of exactly once.

### Repetitions are greedy

- When repeating a RE, the matching engine will try to repeat it as many times as possible. If later portions of the pattern don’t match, the matching engine will then back up and try again with fewer repetitions.
- a[bcd]b matches abcbd, with only the abcb part last 'd' is not matched.

Another repeating metacharacter is +, which matches one or more times.

Another repeating qualifier, the question mark character, ?, matches either once or zero times; you can think of it as marking something as being **optional**.

The most complicated repeated qualifier is `{m,n}`, where m and n are **decimal integers**. This qualifier means there must be at least m repetitions, and at most n. You can omit either m or n. Omitting m is interpreted as a lower limit of 0, while omitting n results in an upper bound of infinity.

### Equivalence of Metachar sequences

- `*` = `{0,}`
- `+` = `{1,}`
- `?` = `{0,1}`

**Note**:  better to use \*, +, or ? when you can, simply because they’re shorter and easier to read.

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

| **Pattern object method** | **Description**                                                                                                                                                                                                                                                                     |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **match()**               | Determine if the RE matches at the beginning of the string. Returns None if no match can be found. If they’re successful, a **match object** instance is returned, containing information about the match: where it starts and ends, the substring it matched, and more.            |
| **search()**              | Scan through a string, looking for any location where this RE matches. Returns None if no match can be found. If they’re successful, a **match object** instance is returned, containing information about the match: where it starts and ends, the substring it matched, and more. |
| **findall()**             | Find all substrings where the RE matches, and returns them as a list.                                                                                                                                                                                                               |
| **finditer()**            | Find all substrings where the RE matches, and returns them as an iterator.                                                                                                                                                                                                          |

### Methods on match Object

| **Match object method** | **Description**                                                    |
| ----------------------- | ------------------------------------------------------------------ |
| **group()**             | Return the string matched by the RE.                               |
| **start()**             | Return the starting position of the match.                         |
| **end()**               | Return the ending position of the match.                           |
| **span()**              | Return a tuple containing the (start, end) positions of the match. |

### Module level methods

- The re module also provides top-level functions called match(), search(), findall(), sub(), and so forth.
- Workflow for object level methods. Compile re->match/search/findall->group()/span()/first().

### Compilation Flags

**Note:** Multiple flags can be specified by bitwise OR-ing them.

| **Flag**                        | **Description**                                                                                                                      |
| :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| **ASCII, A**                    | Makes several escapes like \w, \b, \s and \d match only on ASCII characters with the respective property.                            |
| **DOTALL, S**                   | Make `.` match any character, including newlines.                                                                                    |
| **IGNORECASE, I**               | Do case-insensitive matches.                                                                                                         |
| **LOCALE, L**                   | Do a locale-aware match. The `\w+` will match letters of the language defined by locale, instead of just english letters[a-zA-Z0-9_] |
| **MULTILINE, M**                | Multi-line matching, affecting `^` and `$`.                                                                                          |
| **VERBOSE, X (for ‘extended’)** | Enable verbose REs, which can be organized more cleanly and understandably.                                                          |

### When **MULTILINE** flag is **NOT** specified

- `^` matches only at the beginning of the string.
- `$` matches only at the end of the string and immediately before the newline (if any) at the end of the string.

### When **MULTILINE** flag is specified

- `^` matches at the beginning of the string and at the beginning of each line within the string, immediately following each newline.
- `$` metacharacter matches either at the end of the string and at the end of each line (immediately preceding each newline).

### When **UNICODE** flag is specified

- Make \w, \W, \b, \B, \d, \D, \s and \S dependent on the Unicode character properties database.

### When **VERBOSE** flag is specified

- When this flag has been specified, whitespace within the RE string is ignored, except when the whitespace is in a character class or preceded by an unescaped backslash.
- This lets you organize and indent the RE more clearly. This flag also lets you put comments within a RE that will be ignored by the engine.
- Comments are marked by a '#' that’s neither in a character class or preceded by an unescaped backslash.

```python
charref = re.compile(r"""
 &[#]                # Start of a numeric entity reference
 (
     0[0-7]+         # Octal form
   | [0-9]+          # Decimal form
   | x[0-9a-fA-F]+   # Hexadecimal form
 )
 ;                   # Trailing semicolon
""", re.VERBOSE)
```

### More Metacharacters

### zero-width assertions

They don’t cause the engine to advance through the string, instead, they consume no characters at all, and simply succeed or fail. For example, `\b` is an assertion that the current position is located at a word boundary; the position isn’t changed by the `\b` at all. This means that zero-width assertions should never be repeated, because if they match once at a given location, they can obviously be matched an infinite number of times.

`|`: Alternation, or the “or” operator. If A and B are regular expressions, A\|B will match any string that matches either A or B. \| has very low precedence in order to make it work reasonably when you’re alternating multi-character strings. Crow\|Servo will match either Crow or Servo, not Cro, a 'w' or an 'S', and ervo.

`^`: Matches at the beginning of lines. Unless the MULTILINE flag has been set, this will only match at the beginning of the string. In MULTILINE mode, this also matches immediately after each newline within the string.

`$`: Matches at the end of a line, which is defined as either the end of the string, or any location followed by a newline character.

`\A`: Matches only at the start of the string. When not in MULTILINE mode, \A and ^ are effectively the same. In MULTILINE mode, they’re different: \A still matches only at the beginning of the string, but ^ may match at any location inside the string that follows a newline character.

`\b`: Word boundary. This is a **zero-width assertion** that matches only at the beginning or end of a word. A word is defined as a sequence of alphanumeric characters, so the end of a word is indicated by **whitespace** or a **non-alphanumeric character**. Inside a character class, where there’s no use for this assertion, \b represents the backspace character, for compatibility with Python’s string literals.

`\B`: Another zero-width assertion, this is the opposite of \b, only matching when the current position is not at a word boundary.

### Grouping

- Groups are marked by the '(', ')' metacharacters. '(' and ')' have much the same meaning as they do in mathematical expressions; they group together the expressions contained inside them, and you can repeat the contents of a group with a repeating qualifier, such as `**`, `+`, `?`, or `{m,n}`. For example, **(ab)** will match zero or more repetitions of ab.
- Groups indicated with '(', ')' also **capture** the starting and ending index of the text that they match; this can be retrieved by passing an argument to group(), start(), end(), and span(). Groups are numbered starting with 0. Group 0 is always present; it’s the whole RE, so match object methods all have group 0 as their default argument.
- Subgroups are numbered from left to right, from 1 upward. Groups can be nested; to determine the number, just count the opening parenthesis characters, going from left to right.

```shell
>>> p = re.compile('(a(b)c)d')
>>> m = p.match('abcd')
>>> m.group(0)
'abcd'
>>> m.group(1)
'abc'
>>> m.group(2)
'b'
```

- **group()** can be passed multiple group numbers at a time, in which case it will return a tuple containing the corresponding values for those groups.

```shell
>>> m.group(2,1,2)
('b', 'abc', 'b')
```

- The **groups()** method returns a tuple containing the strings for all the subgroups, from 1 up to however many there are.

```shell
>>> m.groups()
('abc', 'b')
```

- If a group matches multiple times, only the last match is accessible.

```shell
>>> m = re.match("([abc])+", "abc")
>>> m.groups()
('c',)
```

### Backreferences

- Backreferences are very useful when performing string substitutions.
- Backreferences in a pattern allow you to specify that the contents of an earlier capturing group must also be found at the current location in the string. For example, `\1` will succeed if the exact contents of group 1 can be found at the current position, and fails otherwise. Remember that Python’s string literals also use a backslash followed by numbers to allow including arbitrary characters in a string, so be sure to use a raw string when incorporating backreferences in a RE.

For example, the following RE detects doubled words in a string.

```shell
>>> p = re.compile(r'\b(\w+)\s+\1\b')
>>> p.search('Paris in the the spring').group()
'the the'
```

### Non-capturing and Named Groups

- (?=foo) is a **positive lookahead assertion**.
- (?!...) is a **negative lookahead assertion**.
- (?:foo) is a **non-capturing group** containing the subexpression foo.
- `(?P\<name>...)` defines a **named group**.
- (?P=name) `is a **backreference** to a named group.

**Note**: Except for the fact that you can’t retrieve the contents of what the group matched, a non-capturing group behaves exactly the same as a capturing group(named group).

Sometimes you’ll want to use a group to collect a part of a regular expression, but aren’t interested in retrieving the group’s contents. You can make this fact explicit by using a **non-capturing group**,(?:...).

**Named groups**: Instead of referring to them by numbers, groups can be referenced by a name.

The regex to find duplicate word can now be written as.

- Original regex: `\b(\w+)\s+\1\b`
- Regex using named group: `\b(?P<word>\w+)\s+(?P=word)\b`

### Lookahead Assertions

- Zero width assertions.
- (?=...): **Positive lookahead assertion**. This succeeds if the contained regular expression, represented here by `...`, successfully matches at the current location, and fails otherwise. But, once the contained expression has been tried, the matching engine doesn’t advance at all; the rest of the pattern is tried right where the assertion started.
- (?!...): **Negative lookahead assertion**. This is the opposite of the positive assertion; it succeeds if the contained expression doesn’t match at the current position in the string.

The regex to parse a filename with an extension after '.', also th extension should not be "bat".
`.*[.](?!bat$)[^.]*$`

| **Method/Attribute**                    | **Purpose**                                                                                                                                                                                                               |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **split(string[, maxsplit=0])**         | Split the string into a list, splitting it wherever the RE matches. returning a list of the pieces. If capturing parentheses are used in the RE, then their values are also returned as part of the list.                 |
| **sub(replacement, string[, count=0])** | Find all substrings where the RE matches, and replace them with a different string. Returns the string obtained by replacing the leftmost non-overlapping occurrences of the RE in string by the replacement replacement. |
| **subn()**                              | Does the same thing as sub(), but returns a 2-tuple containing the new string value and the number of replacements that were performed                                                                                    |

### Split

```shell
>>> p = re.compile(r'\W+')
>>> p2 = re.compile(r'(\W+)')
>>> p.split('This... is a test.')
['This', 'is', 'a', 'test', '']
>>> p2.split('This... is a test.')
['This', '... ', 'is', ' ', 'a', ' ', 'test', '.', '']
```

### Search and Replace

The example below replaces colour names with the word `colour`:

```python
>>> p = re.compile('(blue|white|red)')
>>> p.sub('colour', 'blue socks and red shoes')
'colour socks and colour shoes'
>>> p.sub('colour', 'blue socks and red shoes', count=1)
'colour socks and red shoes'
```

Empty matches are replaced only when they’re not adjacent to a previous match.

```shell
>>> p = re.compile('x*')
>>> p.sub('-', 'abxd')
'-a-b-d-'
```

If replacement is a string, any backslash escapes in it are processed. That is, `\n` is converted to a single newline character, `\`r is converted to a carriage return, and so forth. Unknown escapes such as `\j` are left alone. Backreferences, such as `\6`, are replaced with the substring matched by the corresponding group in the RE. This lets you incorporate portions of the original text in the resulting `replacement string`.

The following substitutions are all equivalent, but use all three variations of the `replacement string`.

```shell
>>> p = re.compile('section{ (?P<name> [^}]* ) }', re.VERBOSE)
>>> p.sub(r'subsection{\1}','section{First}')
'subsection{First}'
>>> p.sub(r'subsection{\g<1>}','section{First}')
'subsection{First}'
>>> p.sub(r'subsection{\g<name>}','section{First}')
'subsection{First}'
```

If replacement is a function, the function is called for every non-overlapping occurrence of pattern. On each call, the function is passed a match object argument for the match and can use this information to compute the desired replacement string and return it. In the following example, the replacement function translates decimals into hexadecimal.

```shell
>>> def hexrepl(match):
...     "Return the hex string for a decimal number"
...     value = int(match.group())
...     return hex(value)
...
>>> p = re.compile(r'\d+')
>>> p.sub(hexrepl, 'Call 65490 for printing, 49152 for user code.')
'Call 0xffd2 for printing, 0xc000 for user code.'
```
