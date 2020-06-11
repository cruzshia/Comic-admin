#!/bin/bash

readonly command_dir=`dirname $0`

# analyze paramater
ERROR=false
if [ $# -lt 2 ]; then
	ERROR=true
fi
if $ERROR; then
	echo "Usage $0 input output [-pre-pagineted] [-with-mobile] [-with-scramble] [-scramble-only] [-json-pack-only] [-quality val(0-100)] [-scramble-dirname dir_name]"
	exit 1
fi

# functions
copy_metadata_if_needed () {
	error=false
	target=$1
	output=$2
	echo copy access-metadata
	echo mkdir -p "$output"
	mkdir -p "$output" || error=true
	if $error; then
		echo "error in creating ${output}"
		return 1
	fi
	if [ -n "$(ls -A $target)" ]; then
		echo cp -r "$target/"* "$output"
		cp -r "$target/"* "$output" || error=true
		if $error; then
			echo "error in copying files in ${target} to ${output}"
			return 1
		fi
	fi
	return 0
}

# content mode
prepaginated=false

# obfuscate and scramble flags
with_scramble=false
with_mobile=false
scramble_only=false
obfuscate=true

#cat json mode
rich_navigation=false
rich_navigation_path_is_pre_paginated_mode=false

# mobile dir
detected_scramble_dir=false
scramble_dir=mobile

# jpeg quality
detected_quality=false
quality=90
for arg in $*; do
	if $detected_quality; then
		detected_quality=false
		quality=$arg
		continue
	fi
	if $detected_scramble_dir; then
		detected_scramble_dir=false
		scramble_dir=$arg
		continue
	fi
	case $arg in
		"-pre-paginated")
			prepaginated=true
			;;
		"-with-mobile")
			with_mobile=true
			with_scramble=true
			;;
		"-with-scramble")
			with_scramble=true
			;;
		"-scramble-only")
			scramble_only=true
			with_mobile=true
			with_scramble=true
			;;
		"-json-pack-only")
			scramble_only=false
			with_mobile=false
			with_scramble=false
			obfuscate=false
			;;
		"-quality")
			detected_quality=true
			;;
		"-scramble-dirname")
			detected_scramble_dir=true
			;;
		"-rich-navigation")
			rich_navigation=true
			;;
		"-rich-navigation-path-is-pre-paginated-mode")
			rich_navigation_path_is_pre_paginated_mode=true
			;;
	esac
done
target_dir=$1
readonly input_dir=$1
readonly output_dir=$2
if $scramble_only; then
	readonly mobile_dir="$output_dir"
else
	readonly mobile_dir="$output_dir/$scramble_dir"
fi

echo make content target=$target_dir output=$output_dir

if [ ! -d "$output_dir" ]; then
	echo not found output directory. auto create
	mkdir -p "$output_dir" || ERROR=true
	if $ERROR; then
		echo "error in creating ${output_dir}"
		exit 1
	fi
fi

if $prepaginated; then
	readonly depth=1
else
	readonly depth=2
fi

# scramble
if $with_scramble || $with_mobile; then
	echo make mobile
	if [ ! -d "$mobile_dir" ]; then
		mkdir -p "$mobile_dir" || ERROR=true
		if $ERROR; then
			echo "error in creating ${mobile_dir}"
			exit 1
		fi
	fi
	for target in `find "$target_dir" -mindepth $depth -maxdepth $depth -type d`; do
		output="${mobile_dir}/${target#${target_dir}}"
		if [ ! -d "$output" ]; then
			mkdir -p "$output" || ERROR=true
			if $ERROR; then
				echo "error in creating ${output}"
				exit 1
			fi
		fi
		if $prepaginated; then
			target=${target_dir}
			output=${mobile_dir}
		fi
		# copy access-metadata and skip scramble.
		# because access-metadata does not need scramble.
		if [ -n "$(echo $output | grep "access-metadata")" ]; then
			copy_metadata_if_needed "$target" "$output" || exit 1
			continue
		fi
		if [ -n "$(echo $output | grep "access-full-region")" ]; then
			continue
		fi
		if [ -n "$(echo $output | grep "access-textmap")" ]; then
			continue
		fi
		# skip shared dir. it will copy by other step in the loop.
		if [ -z "$(echo $output | grep "shared")" ]; then
			echo bash "$command_dir/lib/img_scramble/img_scramble.sh" "$target" "$output"
			bash "$command_dir/lib/img_scramble/img_scramble.sh" "$target" "$output" || ERROR=true
			if $ERROR; then
				echo "error on img_scramble.sh"
				exit 1
			fi
		fi
		if $prepaginated; then
			base_dir=${target_dir}
		else
			base_dir=${target}
		fi
		for input_json in `find "${base_dir}" -mindepth 1 -maxdepth 1 -type f -name "*.json"`; do
			if [[ "$(cat "$input_json" | grep "prerenderer-version")" == "" ]]; then
				# skip if $input_json is metadata file of each xhtml file.
				continue
			fi
			output_json=${mobile_dir}/${input_json#${target_dir}}
			echo cp "${input_json}" "${output_json}"
			cp "${input_json}" "${output_json}" || ERROR=true
			if $ERROR; then
				echo "error in copying ${input_json} to ${output_json}"
				exit 1
			fi
		done
		for input_region_dir in `find "${base_dir}" -type d -name "*.region"`; do
			output_region_dir="${mobile_dir}/${input_region_dir#${target_dir}}"
			output_parent_dir="${output_region_dir%/*}"
			mkdir -p "$output_parent_dir" || ERROR=true
			if $ERROR; then
				echo "error in creating ${output_parent_dir}"
				exit 1
			fi
			echo cp "$input_region_dir" "$output_parent_dir"
			cp -Rap "$input_region_dir" "$output_parent_dir" || ERROR=true
			if $ERROR; then
				echo "error in copying ${input_region_dir} to ${output_parent_dir}"
				exit 1
			fi
		done
	done
	for bitmap in `find "$mobile_dir" -type f -name "*.bmp"`; do
		echo cjpeg -optimize -progressive -sample 1x1 -quality $quality -outfile "${bitmap%.bmp}.jpeg" "$bitmap"
		cjpeg -optimize -progressive -sample 1x1 -quality $quality -outfile "${bitmap%.bmp}.jpeg" "$bitmap" || ERROR=true
		if $ERROR; then
			echo "error in creating or writing jpeg from ${bitmap} by cjpeg"
			exit 1
		fi
		echo rm -f "$bitmap"
		rm -f "$bitmap" || ERROR=true
		if $ERROR; then
			echo "error in deleting ${bitmap}"
			exit 1
		fi
	done
	target_dir="$mobile_dir"
fi

if $obfuscate; then
	echo copy server-side json files
	for server_json_dir in `find "$input_dir" -type d \( -name "access-full-region" -o -name "access-textmap" \) `; do
		output_json_dir="${output_dir}/${server_json_dir#${input_dir}}"
		output_parent_dir="${output_json_dir%/*}"
		mkdir -p "$output_parent_dir" || ERROR=true
		if $ERROR; then
			echo "error in creating ${output_parent_dir}"
			exit 1
		fi
		cp -Rap "$server_json_dir" "$output_parent_dir" || ERROR=true
		if $ERROR; then
			echo "error in copying ${server_json_dir} to ${output_parent_dir}"
			exit 1
		fi
	done
else
	echo skip scramble and obfuscate
	if [ -n "$(ls -A $target_dir)" ]; then
		echo cp -Rap "$target_dir/"* "$output_dir/"
		cp -Rap "$target_dir/"* "$output_dir/" || ERROR=true
		if $ERROR; then
			echo "error in copying files in ${target_dir} to ${output_dir}"
			exit 1
		fi
	fi
	target_dir="$output_dir"
fi

echo make json
if $rich_navigation_path_is_pre_paginated_mode && [ -d ${target_dir}/SVGA/access-metadata ]; then
	# in the case, rich-navigation-path JSON object dose not relative path 
	# which is from configuration.json to metadata.json.
	# --------
	# [example]
	# root --- access-metadata --- metadata.json
	#       |- normal_default --- configuration.json
	#   * correctory relative path is "../access-metadata/metadata.json".
	#     But rich-navigation-path is "./access-metadata/metadata.json".
	#                                  ^
	# --------
	# So it need to normalize directory structure.
	copy_access_metadata_path=$target_dir/SVGA/normal_default/access-metadata
	echo mkdir -p "$copy_access_metadata_path"
	mkdir -p "$copy_access_metadata_path" || ERROR=true
	if $ERROR; then
		echo "error in creating ${copy_access_metadata_path}"
		exit 1
	fi
	if [ -n "$(ls -A ${target_dir}/SVGA/access-metadata)" ]; then
		echo cp -r "$target_dir/SVGA/access-metadata"/* "$copy_access_metadata_path"
		cp -r "$target_dir/SVGA/access-metadata"/* "$copy_access_metadata_path" || ERROR=true
		if $ERROR; then
			echo "error in copying files in ${target_dir}/SVGA/access-metadata to ${copy_access_metadata_path}"
			exit 1
		fi
	fi
fi

if $prepaginated; then
	catjson_param=-pre-paginated
fi
if $rich_navigation; then
	catjson_param="$catjson_param -rich-navigation"
fi
echo bash "$command_dir/lib/catjson/catjson.sh" $catjson_param "$target_dir"
bash "$command_dir/lib/catjson/catjson.sh" $catjson_param "$target_dir" || ERROR=true
if $ERROR; then
	echo "error on catjson.sh"
	exit 1
fi

if $rich_navigation_path_is_pre_paginated_mode; then
	echo rm -rf "$copy_access_metadata_path"
	rm -rf "$copy_access_metadata_path" || ERROR=true
	if $ERROR; then
		echo "error in deleting ${copy_access_metadata_path}"
		exit 1
	fi
fi

if $with_mobile || ! $obfuscate; then
	echo "clean up new target_dir($target_dir)"
	for target in `find "$target_dir" -type d \( -name "access-metadata" -o -name "access-full-region" -o -name "access-textmap" -o -name "*.region" \) -prune -o -type f -name "*.json" ! -name "*_pack.json" -print`;do
		echo rm -f $target
		rm -f $target || ERROR=true
		if $ERROR; then
			echo "error in deleting ${target}"
			exit 1
		fi
	done
fi

#enc
if $scramble_only || ! $obfuscate; then
	exit 0
fi
k1=`date +%Y%m%d%H%M%S%N | sha256sum -t - | sed -e "s/\([0-9a-fA-F]\+\).*/\1/g"`
k2=`date +%Y%m%d%H%M%S%N | sha256sum -t - | sed -e "s/\([0-9a-fA-F]\+\).*/\1/g"`
k3=`echo 9999123123595\`date +%N\` | sha256sum -t -| sed -e "s/\([0-9a-fA-F]\+\).*/\1/g"`
for target in `find "$target_dir" -mindepth $depth -maxdepth $depth -type d`;do
	output="${output_dir}/${target#${target_dir}}"
	echo ""
	# copy access-metadata and skip obfuscate.
	# because access-metadata does not need obfuscate.
	if [ -n "$(echo $output | grep "access-metadata")" ]; then
		copy_metadata_if_needed "$target" "$output" || exit 1
		continue
	fi
	if [ -n "$(echo $output | grep "access-full-region")" ]; then
		continue
	fi
	if [ -n "$(echo $output | grep "access-textmap")" ]; then
		continue
	fi
	echo "$command_dir/lib/make_content_each.sh" "$target" "$output" "$k1" "$k2" "$k3"
	bash "$command_dir/lib/make_content_each.sh" "$target" "$output" "$k1" "$k2" "$k3" || ERROR=true
	if $ERROR; then
		echo "error on make_content_each.sh"
		exit 1
	fi

	# edit json
	if $prepaginated; then
		base_dir=${target_dir}
	else
		base_dir=${target}
	fi
	for input_json in `find "${base_dir}" -mindepth 1 -maxdepth 1 -type f -name "*_pack.json"`; do
		output_json=${output_dir}/${input_json#${target_dir}}
		if $with_mobile; then
			echo cp "${input_json}" "${output_json}"
			cp "${input_json}" "${output_json}" || ERROR=true
			if $ERROR; then
				echo "error in copying ${input_json} to ${output_json}"
				exit 1
			fi
		else
			echo mv "${input_json}" "${output_json}"
			mv "${input_json}" "${output_json}" || ERROR=true
			if $ERROR; then
				echo "error in moving ${input_json} to ${output_json}"
				exit 1
			fi
		fi

		output_json_tmp="${output_json}.tmp"
		echo cat "${output_json}" "|" sed -e "s/\(.*\)}$/\1,\"ct\":\"${k1}\",\"st\":\"${k2}\",\"et\":\"${k3}\"}/g" ">" "${output_json_tmp}" "&&" mv "${output_json_tmp}" "${output_json}"
		cat "${output_json}" | sed -e "s/\(.*\)}$/\1,\"ct\":\"${k1}\",\"st\":\"${k2}\",\"et\":\"${k3}\"}/g" > "${output_json_tmp}" && mv "${output_json_tmp}" "${output_json}" || ERROR=true
		if $ERROR; then
			echo "error in modifying ${output_json}"
			exit 1
		fi
	done
	for input_region_dir in `find "${base_dir}" -type d -name "*.region"`; do
		output_region_dir="${output_dir}/${input_region_dir#${target_dir}}"
		output_parent_dir="${output_region_dir%/*}"
		mkdir -p "$output_parent_dir" || ERROR=true

		if $with_mobile; then
			echo cp "$input_region_dir" "$output_parent_dir"
			cp -Rap "$input_region_dir" "$output_parent_dir" || ERROR=true
			if $ERROR; then
				echo "error in copying ${input_region_dir} to ${output_parent_dir}"
				exit 1
			fi
		else
			echo mv "$input_region_dir" "$output_parent_dir"
			mv "$input_region_dir" "$output_parent_dir" || ERROR=true
			if $ERROR; then
				echo "error in moving ${input_region_dir} to ${output_parent_dir}"
				exit 1
			fi
		fi
	done
done

# remove mobile
if ! $with_mobile && $with_scramble; then
	echo rm -rf "$target_dir"
	rm -rf "$target_dir" || ERROR=true
	if $ERROR; then
		echo "error in deleting ${target_dir}"
		exit 1
	fi
fi

# copy mobile
if $with_mobile && ! $prepaginated; then
	for target in `find "$target_dir" -mindepth 1 -maxdepth 1 -type d`; do
		output="$output_dir/${target#${target_dir}}/${scramble_dir}/"
		if [ -n "$(echo $output | grep "access-full-region")" ]; then
			continue
		fi
		if [ -n "$(echo $output | grep "access-textmap")" ]; then
			continue
		fi
		if [ ! -d "$output" ]; then
			mkdir -p "$output" || ERROR=true
			if $ERROR; then
				echo "error in creating ${output}"
				exit 1
			fi
		fi
		if [ -n "$(ls -A $target)" ]; then
			echo mv "$target/"* "$output"
			mv "$target/"* "$output" || ERROR=true
			if $ERROR; then
				echo "error in moving files on ${target} to ${output}"
				exit 1
			fi
		fi
	done
	echo rm -rf "$target_dir"
	rm -rf "$target_dir" || ERROR=true
	if $ERROR; then
		echo "error in deleting ${target_dir}"
		exit 1
	fi
fi
