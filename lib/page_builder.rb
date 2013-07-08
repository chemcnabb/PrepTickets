require 'erb'
require 'tag_helper'

class PageBuilder
  include TagHelper

  attr_reader :app, :root, :env
  def initialize(app)
    @app = app
  end

  def root
    app.root
  end

  def assets_sources name, options={}
    assets = app.sprockets.find_asset(name)
    return [] if assets.blank?
    extract_asset_sources_for assets
  end

  def stylesheet_link_tag name='app.css', options={}
    sources = assets_sources(name)
    links = sources.map do |s| 
      s = "#{s}?body=1" if app.development?
      stylesheet_tag(s, options)
    end
    links.join("\n")
  end

  def javascript_link_tag name='app.js', options={}
    sources = assets_sources(name)
    links = sources.map do |s| 
      s = "#{s}?body=1" if app.development?
      javascript_tag(s, options)
    end
    links.join("\n")
  end


  def render_to_string
    file = File.read(page_path)
    file = ERB.new(file).result(binding) if engines.include?("erb")
    file
  end

  def call(env) #Rack calls this automagically
    new_request! env
    [
      status,
      {
        'Content-Type'  => content_type,
        'Cache-Control' => 'public, max-age=86400'
      },
      [render_to_string]
    ]
  end

  #######
  private
  #######

  def new_request! env
    @env = env
    @real_path = nil
  end

  def status
    return 404 unless page_exists?
    200
  end
  def page_path
    real_path
  end

  def real_path
    @real_path ||= find_file(file_name)
  end

  def file_name
    env["REQUEST_PATH"] == "/" ? app.root_page : env["REQUEST_PATH"]
  end

  def find_file(file_name)
    app.logger.debug "Looking for #{file_name}"
    file_name = file_name.to_s.gsub(/^\//, '') #remove leading slash if present
    if file = Dir.glob("#{root.join(file_name)}*").first
      Pathname(file).realpath
    else
      Pathname(error_page).realpath
    end
  rescue Errno::ENOENT => ex
    app.logger.warn ex
    raise ex
  end

  def page_exists?
    real_path != error_page
  end

  def content_type
    return "text/html" unless page_exists?
    case extension
    when "json"
      "application/json"
    else 
      "text/html"
    end
  end
  def extension
    split_file_name[1] || "html"
  end

  def engines
    split_file_name[2, split_file_name.length]
  end
  def split_file_name
    page_path.basename.to_s.split(".")
  end

  def page_name
    page_path
  end

  def error_page
    root.join(app.error_page)
  end
  
  def extract_asset_sources_for(assets)
    assets_source_list = []
    if app.development?
      assets.to_a.each do |asset|
        if (asset.to_a.size > 1)
          assets_source_list + extract_asset_sources(asset)
        else
          assets_source_list << get_asset_source(asset)
        end
      end
    else
      assets_source_list << get_asset_source(assets)
    end
    assets_source_list
  end

  def get_asset_source(asset)
    return "" if asset.blank?
    asset_attr = app.sprockets.attributes_for(asset.pathname.realpath)
    name = asset_attr.logical_path.to_s
    path = asset.pathname.relative_path_from(root).to_s.gsub(/#{name}(.*)/, "")
    "/#{path}#{name}"
  end

end