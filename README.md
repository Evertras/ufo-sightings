# UFO Sightings

Let's see where the aliens are among us!

https://www.kaggle.com/NUFORC/ufo-sightings (use scrubbed)

https://www.npmjs.com/package/csv

## Learning Focus

Data.

You're going to be given a large amount of data.  Your job is to parse through
all of it and find useful bits.

## Questions to answer

1. What year had the most sightings?
1. What season of the year tends to have the most sightings?  By how much?
1. Which shapes are most commonly seen?
1. Which state has the most/least sightings per-capita?  Take population into account.
1. What's the median duration a UFO is seen?  What's the standard deviation?

## Before You Start

Look at the data.  Scroll down.  Notice that some entries are patchy, as in
they might have a state listed but not be in the US according to country.  How
will you deal with this in the code?  Will you take things verbatim or try to
make an attempt to guess when things are murky?

How will you parse certain bits?  Are there any libraries that might be useful?

## Bonus

Add a search feature to find all sightings for a given year and print the first
100 (or less) to the screen.  Then allow further filtering on shape and state,
so a user can select something like "1957 Cylinder NY" and all cylinder shaped
UFO sightings that occurred in NY in 1957 will be listed.

Either use an inquirer interface or use command line arguments, up to you!
