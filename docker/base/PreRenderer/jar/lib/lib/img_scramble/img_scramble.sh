#!/bin/bash

JARDIR=`dirname $0`
ERROR=false

if [ $# -lt 2 ]; then
	ERROR=true
fi

if $ERROR; then
	printf 'Usage:  %s input output\n' "$0"
	exit 1
fi
readonly input=$1
readonly output=$2

java -Dfile.encoding=UTF-8 -jar "$JARDIR/ImageScramble.jar" $input $output || ERROR=true
if $ERROR; then
	echo "error on ImageScramble.jar"
	exit 1
fi
