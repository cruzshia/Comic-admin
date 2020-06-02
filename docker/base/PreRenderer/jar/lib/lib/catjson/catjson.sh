#!/bin/sh

JARDIR=`dirname $0`
ERROR=false
PREPAGINATED=false
RICH_NAVIGATION=false

if [ $# -lt 1 ]; then
	ERROR=true
fi

if $ERROR; then
	printf 'Usage:  %s [-pre-paginated] [-rich-navigation] inputdir\n' "$0"
	exit 1
fi

for arg in $*; do
	if [ "${arg}" = "-pre-paginated" ]; then
		PREPAGINATED=true
	fi
	if [ "${arg}" = "-rich-navigation" ]; then
		RICH_NAVIGATION=true
	fi
done

eval INDIR=\$\{$#\}

CATJSON_PARAM=""
if $RICH_NAVIGATION; then
	CATJSON_PARAM="${CATJSON_PARAM} -rich-navigation"
fi

if $PREPAGINATED; then
	for FILE in `find $INDIR -mindepth 1 -maxdepth 1 -name '*.json'`
	do
		if [[ "$(cat "$FILE" | grep "prerenderer-version")" == "" ]]; then
			continue
		fi
		OUTFILE=`echo ${FILE%.json}_pack.json`
		java -Dfile.encoding=UTF-8 -jar "$JARDIR/catjson.jar" "$FILE" "$OUTFILE" $CATJSON_PARAM || ERROR=true
		if $ERROR; then
			printf 'Error: Failed to pack json files to %s\n' "$OUTFILE"
			exit 1
		fi
	done
else
	for FILE in `find $INDIR -mindepth 3 -maxdepth 3 -name '*.json'`
	do
		if [[ "$(cat "$FILE" | grep "prerenderer-version")" == "" ]]; then
			continue
		fi
		OUTFILE=`echo ${FILE%.json}_pack.json`
		java -Dfile.encoding=UTF-8 -jar "$JARDIR/catjson.jar" "$FILE" "$OUTFILE" $CATJSON_PARAM || ERROR=true
		if $ERROR; then
			printf 'Error: Failed to pack json files to %s\n' "$OUTFILE"
			exit 1
		fi
	done
fi
