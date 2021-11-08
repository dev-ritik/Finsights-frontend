# How to contribute

We'd really love to accept your patches and contributions to this application. There are
just a few small guidelines you need to follow.

## Check out the source

Do the following to check out the Finsights source code on GitHub:

1.  Sign up for GitHub at https://github.com/ if you don’t already have an account.
1.  (Optional) Set up an SSH key to [connect to your account using SSH].
1.  (Preffered) [Add a GPG signing key to your account].
1.  Go to the application landing page at https://github.com/dev-ritik/Finsights-frontend.
1.  (Optional) [Fork the repository]. This creates a copy of the repository in your account.
1.  Create a work folder on your workstation. The rest of this document assumes `~/work`, adjust as needed.
1.  [clone your copy of the repository] and add it to your local work folder. You may replace `dev-ritik` with your github username if using your own fork:
    ```
    cd ~/work
    git clone https://github.com/dev-ritik/Finsights-frontend.git
    cd Finsights
    ```
1.  To install depemdency run:
    ```sh
    npm install
    ```

## (Optional) Configure git

Use the following commands to configure git:
```
# Make git clean up all the remote tags it creates when you delete remote branches
git config fetch.prune true
git config user.name <your-name> # Add --global to make this a global setting
git config user.email <you@your-email.com> # Can also be a global setting
# If you added a GPG signing key, run the following commands:
git config user.signingkey <keyid>
git config commit.gpgsign true
```
_Last 2 git config commands are recommended_

## Testing locally

- Run the application locally:
    ```sh
    npm run start
    ```
- Go to `http://localhost:4100/` on the browser. **Do not use `http://0.0.0.0:4100/`, this may throw CORS errors**

## Sign the Contributor License Agreement

Contributions to this application must be accompanied by a Contributor License
Agreement. You (or your employer) retain the copyright to your contribution,
this simply gives us permission to use and redistribute your contributions as
part of the application. Head over to <https://github.com/dev-ritik/Finsights-frontend/wiki/ICLA.txt>
and accept it by mailing the acceptance to [ritikkne@gmail.com](mailto:ritikkne@gmail.com?subject=Acceptance%20of%20ICLA&body=I%20hereby%20accept%20the%20ICLA%20agreement%20available%20at%20https%3A%2F%2Fgithub.com%2Fdev-ritik%2FFinsights-frontend%2Fwiki%2FICLA.txt).

You generally only need to submit a CLA once, so if you've already submitted one (even if it was for a different application), you probably don't need to do it again.

## Open a pull request (PR)

Do the following to contribute:

1.  Prepare your changes on a dedicated branch in your local repository:
    ```
    git checkout -b <my-branch>
    ```
1.  Make changes, commit the changes, and squash them into a single commit.
1.  Fix potential issues, commit the fix, squash into a single commit again.
1.  Push to your GitHub repo:
    ```
    git push
    ```
1.  Visit https://github.com/dev-ritik/Finsights-frontend/pulls to see a pop-up dialog inviting you to open a PR; click on the dialog to create a PR. See [Creating a pull request from a fork] for more information.
1.  All submissions, including submissions by application members, require review. You can request specific reviewers for your PR or leave the reviewers section blank.

Consult [GitHub Help] for more information on using pull requests.

[connect to your account using SSH]: https://help.github.com/en/articles/connecting-to-github-with-ssh
[Add a GPG signing key to your account]: https://help.github.com/en/articles/adding-a-new-gpg-key-to-your-github-account
[Fork the repository]: https://help.github.com/en/articles/fork-a-repo
[clone your copy of the repository]: https://help.github.com/en/articles/cloning-a-repository
[build instructions]: https://github.com/google/agi/blob/master/BUILDING.md
[Creating a pull request from a fork]: https://help.github.com/en/articles/creating-a-pull-request-from-a-fork
[GitHub Help]: https://help.github.com/articles/about-pull-requests/
