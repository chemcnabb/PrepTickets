require 'erb'
require 'tag_helper'

class PageBuilder

  include TagHelper

  attr_accessor :app, :root, :page_name
  def initialize(app, page_name="index.html.erb")
    @app = app
    @root = app.root
    @page_name = page_name
  end

  def assets_source name, options={}
    assets = app.sprockets.find_asset(name)
    return [] if assets.blank?
    assets_source_list = []
    main_asset = assets.to_a.pop
    if app.development?
      assets.to_a.each do |asset|
        assets_source_list << get_asset_source(asset)
      end
    else
      assets_source_list << get_asset_source(main_asset)
    end
    assets_source_list
  end

  def stylesheet_link_tag name='app.css', options={}
    sources = assets_source(name)
    links = sources.map{ |s| stylesheet_tag(s, options)  }
    links.join("\n")
  end

  def javascript_link_tag name='app.js', options={}
    sources = assets_source(name)
    links = sources.map{ |s| javascript_tag(s, options)  }
    links.join("\n")
  end


  def render_to_string
    # File.open(File.join(@root, "#{page_name}.html"), File::RDONLY)
    [ERB.new(File.read(@root.join(page_name))).result(binding)]
  end

  def call(env)
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      render_to_string
    ]
  end

  #######
  private
  #######
  
  def get_asset_source(asset)
    return "" if asset.blank?
    pn = Pathname(asset.pathname)
    name = pn.basename.to_s.split(".", 3)[0, 2].join(".")
    path = pn.relative_path_from(root).dirname
    "#{path}/#{name}"
  end

end
