#!/bin/bash

readonly command_dir=`dirname $0`
readonly target_dir=$1
readonly output_dir=$2
readonly k1=$3
readonly k2=$4
readonly k3=$5

ERROR=false

# mkdir
#find $target -type d | xargs -i% mkdir -p $output/%
echo "mkdir -p \"$output_dir\""
mkdir -p "$output_dir" || ERROR=true
if $ERROR; then
	echo "error in creating ${output_dir}"
	exit 1
fi

for target in `find "$target_dir" -mindepth 1 -type d`;do
	dir_tmp=$output_dir/${target#${target_dir}}
	echo mkdir -p "$dir_tmp"
	mkdir -p "$dir_tmp" || ERROR=true
	if $ERROR; then
		echo "error in creating ${dir_tmp}"
		exit 1
	fi
done

#chmod 755 $command_dir/makedata

# enc
#find $target -name *.jpeg | xargs -i% ./makedata % $output/%.dat
for target in `find "$target_dir" -type f -name *.jpeg`;do
	output_file=${target#${target_dir}}
	# wait #13216
	echo "$command_dir/makedata" "$target" "$output_dir/${output_file%.jpeg}.dat" -k1:${k1} -k2:${k2} -k3:${k3}
	"$command_dir/makedata" "$target" "$output_dir/${output_file%.jpeg}.dat" -k1:${k1} -k2:${k2} -k3:${k3} || ERROR=true
	#echo ./makedata $target $output_dir/${output_file}.dat -k1:${k1} -k2:${k2} -k3:${k3}
	#./makedata $target $output_dir/${output_file}.dat -k1:${k1} -k2:${k2} -k3:${k3} || ERROR=true
	if $ERROR; then
		echo "error on makedata"
		exit 1
	fi
done
