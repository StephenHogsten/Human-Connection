# CONTRIBUTING

Thanks so much for thinking of contributing to the Human Connection project, we really appreciate it! :-\)

## Getting Set Up

Instructions for how to install all the necessary software can be found in our [documentation](https://docs.human-connection.org/human-connection/).

We recommend that new folks should ideally work together with an existing developer. Please join our [discord](https://discord.gg/6ub73U3) instance to chat with developers or just ask them in tickets in [Zenhub](https://app.zenhub.com/workspaces/human-connection-nitro-5c0154ecc699f60fc92cf11f/boards?repos=152252353):

![](https://dl.dropbox.com/s/vbmcihkduy9dhko/Screenshot%202019-01-03%2015.50.11.png?dl=0)

Here are some general notes on our development flow:

## Development

* Currently operating in two week sprints
* We are using ZenHub to coordinate
  * estimating time per issue is the crucial feature of [Zenhub](https://app.zenhub.com/workspaces/human-connection-nitro-5c0154ecc699f60fc92cf11f) that Github does not have
  * "up-for-grabs" links to [Github project](https://github.com/Human-Connection/Human-Connection/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
  * ordering on ZenHub not necessarily reflected on github projects
* AgileVentures run open pairing sessions at 10:30am UTC each week on Tuesdays and Thursdays
* Core team
  * all the people who are hired by HC non-profit corporation
  * you can Meet-the-team [every two weeks in German](https://human-connection.org/veranstaltungen/) and [every month in English](https://human-connection.org/en/events/).
  * 9 people
    * 2 core developers \(Robert [@roschaefer](https://github.com/roschaefer) and Greg [@appinteractive](https://github.com/appinteractive)\)
    * 3 marketeers Jasi, Dennis and Sensi
    * Hardy doing business development
    * Martin head of IT and previously data protection officer
    * Victor doing accounting and controlling
    * Nicolas is the community manager \(reviews content in the network\) reflects community opinion back to the core team
* when can folks pair with Robert
  * 10am UTC until 5pm UTC every working day

## Philosophy

We practise [collective code ownership](http://www.extremeprogramming.org/rules/collective.html) rather than strong code ownership, which means that:

* anyone can start working on anyone elses code
* we avoid blocking because someone else isn't working on something
* however it's sometimes good to leave something in order to create successful education experience
* everyone should always push their code to branches so others can see it

Everyone feel free to request merges or answers to issues from the project managers

But what do we do when waiting for merge into master \(wanting to keep PRs small\) --&gt; Robert recommends creating a pull request for each step

* programming is also about thinking about other people - empathy for your co-workers
  * but what about when you are waiting for merge?
  * solutions
    * 1\) put 2nd PR into branch that the first PR is hitting - but requires update after merging
    * 2\) prefer to leave existing PR until it can be reviewed, and instead go and work on some other part of the codebase that is not impacted by the first PR

### Code Review
* Github setting in place - at least one review is required to merge
  - in principle anyone (who is not the PR owner) can review
  - but often it will be the core developers (Robert, Wolfgang, Matt, Alina, Alex)
  - once there is a review, and presuming no requested changes, PR opener can merge

* CI/tests
  - the CI needs to pass
    - linting (yarn lint --fix)
    - tests (unit, feature) (backend, frontend)
    - codecoverage

## Notes

question: when you want to pick a task - \(find out priority\) - is it in discord? is it in AV slack? --&gt; Robert says you can always ask in discord - group channels are the best

Robert shares: [Zenhub board](https://app.zenhub.com/workspaces/nitro-embed-5c0154ecc699f60fc92cf11f/boards?repos=112590397,152252353,152252578,157710732,163305928) Robert says the order of tickets are preserved in ZenHub and reflect their priority \(most important at the top\) and so check out the current milestones

Matt - question about who can work on [ticket 100](https://app.zenhub.com/workspaces/nitro-embed-5c0154ecc699f60fc92cf11f/issues/human-connection/human-connection/100) --&gt; Robert - in rare occasions it might be exclusive to someone with admin permissions Robert: notes greg just pushed this today: [https://github.com/Human-Connection/Nitro-Deployment](https://github.com/Human-Connection/Nitro-Deployment)

Matt makes point that new stories will have to be taken off the "New Issues" and Robert says that's fine, if you don't like the first one, then you can take the next one. Volunteeers have no commitment except their own self development and their awesomeness by contributing to free and open-source software projects.

Robert notes that everyone is invited to join the kickoff meetings

Robert - difference between "important" \(creates a lot of value\) and "beginner friendly" \(easy to implement\)
