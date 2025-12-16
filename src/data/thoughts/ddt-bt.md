---
title: Desired Dough Temp, Basic Temperature
description: Ugh math
tags: [bread, ddt, bt]
date: 2024-10-31
draft: false
slug: ddt-basic-temp
---

I've _read_ about DDT (desired dough temp) online, but never in too much detail. Well, at school we keep hearing about BT (basic temp), and I decided once and for all to figure out what all these things mean and how they relate to one another.

## Desired Dough Temperature (DDT)

[Desired dough temperature | King Arthur Baking](https://www.kingarthurbaking.com/blog/2018/05/29/desired-dough-temperature)

- Temps in the 24-25c range for wheat-based yeast breads leads to the best flavour
- Is used as a multiplier to calculate water temperature, which is the one variable that bakers can control
- With preferment: DDT x 4
- Without preferment: DDT x 3

## Basic Temperature (BT)

- Without preferment: Flour temp (FT) + Room temp (RT) + Friction factor (FF)
- With preferment: FT + RT + PT (preferment temp) + FF

## Friction Factor (FF)

[Determining the friction factor in baking | King Arthur Baking](https://www.kingarthurbaking.com/blog/2018/08/27/determining-the-friction-factor-in-baking)

> To convert from Fahrenheit to Celsius, subtract 32 and multiply the result by 5, then divide by 9. When converting a temperature **difference**, exclude the subtraction of 32 and only multiply the value by 5, then divide by 9. For instance, a friction factor of 10 in Fahrenheit is equivalent to a friction factor of 5.5 in Celsius (10 * 5 / 9 = 5.5).

- [Convert fahrenheit to celsius when calculating FF](https://www.gastro-grub.com/dough-temperature.html)
- [Understanding Friction Factor in Dough Mixing/Kneading - PizzaBlab](https://www.pizzablab.com/the-encyclopizza/friction-factor/)

Not a direct relationship between F and C - use this formula:

```
(FF in fahrenheit * 5 / 9)
```

So, a friction factor of 6f:

```
FF in celsius = (6f * 5 / 9) 
```

- Varies from machine to machine
- Hand-kneading FF is 1-3c

## Water Temp (WT)

**Example with preferment**

- DDT => 24 (times 4 because we use preferment)
- RT => 25
- FT => 27
- PT => 25
- FF => 12

```
DDT = 24
BT = 25 + 27 + 25 + 12
BT = 89
WT = (24 * 4) - 89
WT = (96) - 89
WT = 7
```

**Example without preferment**

- DDT => 24 (times 3)
- RT => 25
- FT => 27
- FF => 3 (hand-knead)

```
DDT = 24
BT = 25 + 27 + 3
BT = 55
WT = (24 * 3) - 55
WT = (72) - 55
WT = 17
```

## Conclusion

Idk if any of this means anything to you - I'm not sure it does to me - but I'm sure it will at some point.

## Links

- [Desired dough temperature | King Arthur Baking](https://www.kingarthurbaking.com/blog/2018/05/29/desired-dough-temperature)
- [Determining the friction factor in baking | King Arthur Baking](https://www.kingarthurbaking.com/blog/2018/08/27/determining-the-friction-factor-in-baking)
- [Convert fahrenheit to celsius when calculating FF](https://www.gastro-grub.com/dough-temperature.html)
- [Understanding Friction Factor in Dough Mixing/Kneading - PizzaBlab](https://www.pizzablab.com/the-encyclopizza/friction-factor/)
