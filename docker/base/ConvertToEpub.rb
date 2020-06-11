#!/usr/bin/env ruby
# -*- coding: utf-8 -*-
#
# Copyright (c) 2014-2015 ACCESS CO., LTD. All rights reserved.
#

$LOAD_PATH.unshift File.join(ENV['EPUB_CONVERTER_ROOT'], 'lib')

require 'epub_converter/ajf'

OPTIONS = {
  embed_convert_date: true,
  embed_converter_revision: true,
  generate_toc_ncx: true,
}

EPUB_DIRECTORY = 'out-epub'
HTML_DIRECTORY = 'out-html'

REGEXP_CONTENT_ID             = '[0-9A-Z]{4}_[0-9A-Z]{16}_\d{2}'
REGEXP_METADATA               = /\A#{REGEXP_CONTENT_ID}\.json\Z/
REGEXP_COVER                  = /\A#{REGEXP_CONTENT_ID}_cover\.jpg\Z/
REGEXP_PREVIEWS               = /\A#{REGEXP_CONTENT_ID}_preview[1-9]{1}\.jpg\Z/
REGEXP_JPG_CONTENT_PAGE_IMAGE = /\A#{REGEXP_CONTENT_ID}_\d{3}_large\.jpg\Z/

def load_metadata(input)
  metadata = nil
  input.each do |path|
    if REGEXP_METADATA =~ path
      input.open(path) do |f|
        metadata = JSON.load(f)
      end
      break
    end
  end

  return metadata
end

def make_cid_json(metadata, dest_dir)
  metadata = {
    content_id:      metadata['content_id'],
    content_version: metadata['content_version'],
    content_name:    metadata['content_name'],
    content_format:  'epub_omf'
  }

  File.write(File.join(dest_dir, "#{metadata[:content_id]}.json"), metadata.to_json)
end

def copy_cover_and_preview_images(input, dest_dir)
  input.each do |path|
    if (REGEXP_PREVIEWS =~ path) || (REGEXP_COVER =~ path)
      input.open(path) do |f|
        FileUtils.cp(f, dest_dir)
      end
    end
  end
end

def create_end_layer_json(input, dest_dir)
  src_dir = input.directory_path
  src_entries = Dir["#{src_dir}/**/*"]
  page_images = src_entries.select { |e| REGEXP_JPG_CONTENT_PAGE_IMAGE =~ File.basename(e) }
  rightmost_page_num = page_images.size

  metadata = load_metadata(input)
  last_page_num = case [metadata["cover_type"], metadata["binding_type"]]
                  when [0, "BoundOnTheLeftHandSide" ] then rightmost_page_num
                  when [0, "BoundOnTheRightHandSide"] then 1
                  when [1, "BoundOnTheLeftHandSide" ] then rightmost_page_num
                  when [1, "BoundOnTheRightHandSide"] then 1
                  when [2, "BoundOnTheLeftHandSide" ] then rightmost_page_num - 1
                  when [2, "BoundOnTheRightHandSide"] then 2
                  when [3, "BoundOnTheLeftHandSide" ] then rightmost_page_num - 1
                  when [3, "BoundOnTheRightHandSide"] then 2
                  else
                    puts "cover_type and/or binding_type not found"
                    return
                  end

  cid = metadata['content_id']
  nnn = sprintf("%03d", last_page_num)
  src_basename = "#{cid}_#{nnn}_layer.json"
  src = src_entries.find { |e| src_basename == File.basename(e) }
  unless src
    puts "#{src} not found"
    return
  end

  dst = File.join(dest_dir, "#{cid}_end_layer.json")
  FileUtils.cp(src, dst)
end

def archive(path, zip_path = nil)
  zip_path ||= File.join(File.dirname(path), File.basename(path) + '.zip')
  FileUtils.rm zip_path, force: true

  # Avoid memory swap that will degrade node pefromance.
  expected_memory_usage = 0

  Zip::ZipFile.open(zip_path, Zip::ZipFile::CREATE) do |ar|
    Dir["#{path}/**/*"].each do |file_path|
      next unless File.file? file_path
      entry_name = file_path.gsub(File.dirname(path)+'/', '')
      ar.add(entry_name, file_path)

      expected_memory_usage += File.size(file_path)
      if expected_memory_usage > 256 * 1024 * 1024
        ar.commit
        expected_memory_usage = 0
      end
    end
  end

  return zip_path
end

# retrieve ARGV
(local_content_path, local_artifact_dir) = ARGV
unless local_content_path && local_artifact_dir
  puts "Usage: #{File.basename(__FILE__)} <LOCAL_CONTENT_PATH> <LOCAL_ARTIFACT_DIR>"
  exit 1
end

unless local_content_path =~ /\.zip$/
  puts "<LOCAL_CONTENT_PATH> must end with .zip: #{local_content_path}"
  exit 1
end

begin
  Dir.mktmpdir('ec-temp') do |tmpdir|
    content_id = File.basename(local_content_path).sub(/\.zip$/, "")
    filename = "#{content_id}.epub"

    input = EPUBConverter::Input::ZipFile.new(local_content_path, tmpdir)
    epub_dir = File.join(tmpdir, EPUB_DIRECTORY)
    html_dir = File.join(tmpdir, HTML_DIRECTORY)
    FileUtils.mkdir_p html_dir
    FileUtils.remove_entry_secure epub_dir, true
    output = EPUBConverter::Output::Files.new(html_dir)

    metadata = load_metadata(input)
    if metadata && (metadata['content_format'] == 'jpg')
      converter = EPUBConverter::AJF::Converter.new(OPTIONS)
      converter.convert(input, output)
      epub_path = File.expand_path(File.join(epub_dir, content_id, filename))
      FileUtils.mkdir_p File.dirname(epub_path)
      output.create_zip(epub_path)
      make_cid_json(metadata, File.dirname(epub_path))
      copy_cover_and_preview_images(input, File.dirname(epub_path))
      create_end_layer_json(input, File.dirname(epub_path))
      archive(File.dirname(epub_path), File.join(local_artifact_dir, content_id + '.zip'))
      FileUtils.cp(local_content_path, File.join(local_artifact_dir, content_id + '_jpg.zip'))
    else
      puts "Conversion to EPUB is not needed for this content."
      FileUtils.cp(local_content_path, local_artifact_dir)
    end
  end
rescue => exc
  puts exc.message
  puts exc.backtrace
  exit 1
end

exit 0
