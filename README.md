# Asian Classics Explorer (ACE) 1.0 (SEARCH)

[http://ace.asianclassics.org](http://ace.asianclassics.org)

The main goal of the ACE application 1.0 was to duplicate the functionality of the [Gofer desktop software](https://asianclassics.org/library/downloads/) used by the [ACIP translation team](https://asianclassics.org/translate/reading-club/).

Gofer provides advanced full-text search including boolean and proximity searches. In its current iteration ACE 1.0 provides full-text phrase matching with boolean options. Proximity search has not been implemented. The next version, due to be released in November / December 2020 will include proximity search as well as a host of other functionality.

**Note on Sub-Modules:**

`server` is a git submodule

-   `git submodule add server`, when you first add as submodule
-   `cd server`, work as if in repo, then commit and push (what branch are you working from?)
-   within parent, `git add server` <-- and this will update reference to server submodule

-   to update submodule to current master
    -- `cd server`
    -- `git checkout master` (probably already on master)
    -- `git pull`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

-   test TIBTEXT full text for all the results from '"STONG TSUL THA""
