---
tags: []
title: repost about ruby surprises
description: 
modifiedDate: 2025-01-28T08:00:34+08:00
---

(repost)

I only just recently wrote a post about monkeypatching in Ruby, so I'm just gonna leave this here, but this is (oneof) the weirdest things I've seen...

```ruby
CONST = true

# Conditional methods...
class Do
  class << self
    if CONST
      def it
        1
      end
    else
      def it
        2
      end
    end
  end
end

puts Do.it
```

Nvm here's more

```ruby
class StringUtils
  def self.reverse_enabled(is_enabled)
    if is_enabled
      define_method(:rev, lambda(&:reverse))
    else
      define_method(:rev, ->(x) { x })
    end
  end

  reverse_enabled(true)
end

su = StringUtils.new
p su.rev('my string')
StringUtils.reverse_enabled(false)
p su.rev('my string')
```