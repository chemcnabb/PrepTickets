require 'erb'
require 'tag_helper'

class PageBuilder

  include TagHelper

  attr_accessor :app, :root, :page_path
  def initialize(app, page_path)
    @app = app
    @root = app.root
    @page_path = page_path
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
    ERB.new(File.read(page_path)).result(binding)
  end

  def call(env) #Rack calls this automagically
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      [render_to_string]
    ]
  end

  #######
  private
  #######
  
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
    pn = Pathname(asset.pathname)
    name = pn.basename.to_s.split(".", 3)[0, 2].join(".")
    path = pn.relative_path_from(root).dirname
    "#{path}/#{name}"
  end

end
