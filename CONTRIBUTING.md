# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_
series [How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1.  Fork and clone the repo
1.  Run `npm install`
1.  Create a branch for your PR

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/alexcarpenter/frontend-foundations
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Add yourself as a contributor

This project follows the [all contributors][all-contributors] specification. To
add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

```console
npm run contributors:add [your name] [type of contributions]
npm run contributors:generate
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR. If
you've already added yourself to the list and are making a new type of
contribution, you can run it again and select the added contribution type.

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[all-contributors]: https://github.com/kentcdodds/all-contributors
[issues]: https://github.com/alexcarpenter/frontend-foundations/issues
