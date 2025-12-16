---
title: implicit conversions in ruby
date: 2025-02-08
description: something i stumbled upon
tags: [ruby, implicits, implicit, conversions]
draft: false
slug: implicit-conversions-in-ruby
---

Say you're working with a directory:

```ruby
dirpath = '.'
dir = Dir.open(dirpath)
```

And you want to do something with the files in that directory:

```ruby
dir.each do |filename|
  filepath = "#{dirpath}/#{filename}"
  p File.read(filepath) if File.file?(filepath)
end
```

But you don't want to keep having to interpolate strings, so you create a class to make your life easier:

```ruby
class MyFile
  attr_reader :path

  def initialize(dirpath, filename)
    @path = "#{dirpath}/#{filename}"
  end
end

dir.each do |filename|
  f = MyFile.new(dirpath, filename)
  p File.read(f.path) if File.file?(f.path)
end
```

Ruby has a built-in feature called ["implicit conversion"](https://ruby-doc.org/3.0.4/implicit_conversion_rdoc.html), where it will try to perform a conversion if certain methods on the class exist. Which means we can do this instead:

```ruby
class MyFile
  def to_str
    @path
  end
end

dir.each do |filename|
  f = MyFile.new(dirpath, filename)
  p File.read(f) if File.file?(f) # no need to call #path anymore
end
```

`File.read` expects a string, but we pass it an instance of `MyFile`, which has a `to_str` method - so Ruby performs an implicit conversion and treats it like a string.

I _think_ I like this, but I'm sure there's a ton of reasons why you wouldn't want this kind of implicit behaviour.
