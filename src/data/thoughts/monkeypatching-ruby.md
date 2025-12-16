---
title: monkeypatching ruby
date: 2025-01-27
description: fun - scary - everything at once
tags: [ruby, monkeypatching, monkeypatch]
draft: false
modifiedDate: 2025-01-27
slug: monkeypatching-ruby
---

As part of (re)-learning Ruby, I've been reading "Eloquent Ruby" and finally got to the chapter about "monkey patching".

Some context: in Ruby, you can simply "re-open" classes willy-nilly. As below:

```ruby
class String
  def is_string; true; end
end

"".is_string
```

Just an ordinary day in Ruby land.

Perhaps more interesting is the fact that you can "alias" methods. So, if you're more familiar with `hd` and `tl` terminology, you can do this:

```ruby
class Array
  alias hd first
  alias tl last
end

[1, 2, 3].hd # 1
```

_Also_ of note is the fact that aliasing a method allows us to "save" it. Which, I suppose, can be useful if you're scared that your change will break something...

```ruby
class String
  alias add +

  def +(other)
    add(other.upcase)
  end
end

puts "hello" + "world" # helloWORLD
```

Mmm. Definitely _interesting_.

Although I've been enjoying Ruby so far, I don't know how I'd feel about having to deal with monkey patching in a real code base. A Rails core team member thinks [you shouldn't do it](https://shopify.engineering/the-case-against-monkey-patching), and they probably have damn good reasons for saying so.

Anyway, that's about it. Will start on "Metaprogramming Ruby" soon - maybe there'll be something to write about.
