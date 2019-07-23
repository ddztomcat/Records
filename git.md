git checkout --track origin/branch_name
git add . -a
git remote origin set-url [url]
git remote rm origin
git remote add origin [url]
git pull origin other_branch
git pull --rebase origin other_branch
git add .
git rebase --continue
git rebase --skip
git rebase --abort
git pull origin master --allow-unrelated-histories
git push --set-upstream origin