#!/bin/bash

set -e

if [ $# -lt 1 ]; then
	printf 'Usage %s [-pre-paginated] [-zip <file>] path/to/directory\n' "$0"
	exit 1
fi

NOZIP=true
ZIPFILE=""
PREPAGINATED=false

index=0
for arg in "$@"; do
	index=$((index+1))
	if [ "${arg}" = "-zip" ]; then
		NOZIP=false
		zipFileIndex=$((index+1))
		eval ZIPFILE=\$\{$zipFileIndex\}
		unset zipFileIndex
	fi
	if [ "${arg}" = "-pre-paginated" ]; then
		PREPAGINATED=true
	fi
done
unset index

CURRENTDIR="`pwd`"
eval DIR=\"\$\{$#\}\"
cd "$DIR"

if $NOZIP; then
	if $PREPAGINATED; then
		for D in `ls -F | grep '/$'`
		do
			cd "$D"
			if [ "${D}" = "access-full-region/" ]; then
				for DD in `ls -F | grep '/$'`
				do
					cd "$DD"
					for DDD in `ls -F | grep '/$'`
					do
						# Carefully! configuration.json has rich-navigation-path JSON object that has relative path which is from configuration.json to metadata.json.
						if [ "${DDD}" = "access-metadata/" ]; then
							mv $DDD ..
							continue
						fi
						cd "$DDD"
						mv * ../..
						cd ..
						rmdir "$DDD"
					done
					cd ..
					rmdir "$DD"
				done
				cd ..
				continue;
			fi

			if [ "${D}" = "access-textmap/" ]; then
				cd ..
				continue;
			fi

			for DD in `ls -F | grep '/$'`
			do
				# Carefully! configuration.json has rich-navigation-path JSON object that has relative path which is from configuration.json to metadata.json.
				if [ "${DD}" = "access-metadata/" ]; then
					mv $DD ..
					continue
				fi
				cd "$DD"
				mv * ../..
				cd ..
				rmdir "$DD"
			done
			cd ..
			rmdir "$D"
		done
	fi
else
	if $PREPAGINATED; then
		for D in `ls -F | grep '/$'`
		do
			cd "$D"
			if [ "${D}" = "access-full-region/" ]; then
				for DD in `ls -F | grep '/$'`
				do
					cd "$DD"
					for DDD in `ls -F | grep '/$'`
					do
						if [ "${DDD}" = "access-metadata/" ]; then
							continue
						fi

						cd "$DDD"
						# Carefully! configuration.json has rich-navigation-path JSON object that has relative path which is from configuration.json to metadata.json.
						if [ -d "../access-metadata/" ]; then
							cp -a "../access-metadata/" "./access-metadata/"
						fi
						ls -F | grep '.*' | xargs zip -rmq9 "$ZIPFILE"
						cp "$ZIPFILE" ../..
						cd ..
					done
					cd ..
					rm -rf "$DD"
				done
				cd ..
				continue
			fi

			if [ "${D}" = "access-textmap/" ]; then
				ls -F | grep '.*' | xargs zip -rmq9 "$ZIPFILE"
				cd ..
				continue
			fi

			for DD in `ls -F | grep '/$'`
			do
				if [ "${DD}" = "access-metadata/" ]; then
					continue
				fi

				cd "$DD"
				# Carefully! configuration.json has rich-navigation-path JSON object that has relative path which is from configuration.json to metadata.json.
				if [ -d "../access-metadata/" ]; then
					cp -a "../access-metadata/" "./access-metadata/"
				fi
				ls -F | grep '.*' | xargs zip -rmq9 "$ZIPFILE"
				cp "$ZIPFILE" ../..
				cd ..
			done
			cd ..
			rm -rf "$D"
		done
	else
		for D in `ls -F | grep '/$'`
		do
			cd "$D"
			if [ "${D}" = "access-full-region/" ]; then
				for DD in `ls -F | grep '/$'`
				do
					cd "$DD"
					ls -F | grep '/$' | xargs zip -rmq9 "$ZIPFILE"
					cd ..
				done
				cd ..
				continue
			fi
			if [ "${D}" = "access-textmap/" ]; then
				ls -F | grep '.*' | xargs zip -rmq9 "$ZIPFILE"
			else
				ls -F | grep '/$' | xargs zip -rmq9 "$ZIPFILE"
			fi
			cd ..
		done
	fi
fi

