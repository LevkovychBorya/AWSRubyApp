#!/bin/bash -l -c
if db_version=$(bundle exec rake db:version 2>/dev/null)
then
    if [ "$db_version" = "Current version: 0" ]; then
        echo "DB is empty"
    else
        echo "DB exists"
    fi
else
    bin/rake db:create
    bin/rake db:migrate
    bin/setup
fi
