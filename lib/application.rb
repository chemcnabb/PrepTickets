$LOAD_PATH << '.'
$LOAD_PATH << './lib'

require 'sprockets_builder'
require 'page_builder'
require 'logger'
require 'active_support/core_ext/object'
require 'forwardable'
Bundler.require



class Application
  extend Forwardable

  APP_DIR = "apps"
  BUILD_DIR = "build"
  ROOT_ASSETS = %w( app.css app.js )
  ASSET_DIRS = %w( js css lib )

  attr_accessor :env

  def initialize (env=:development)
    self.env = env
  end
  
  %w(development production).each do |env_name|
    define_method("#{env_name}?") {self.env.to_s.downcase == env_name}
  end
  
  class << self #Class methods
    def root
      @root ||= project_root.join(APP_DIR).realpath
    end
    def project_root
      @project_root ||= Pathname(File.dirname(__FILE__)).parent.realpath
    end
    def build_root
      @build_root ||= project_root.join(BUILD_DIR).realdirpath
    end
    def logger
      @logger ||= Logger.new(STDOUT)
    end
  end # of class methods
  
  def_delegators self, :root, :project_root, :build_root, :logger
  def root_assets
    self.class::ROOT_ASSETS
  end

  def sprockets
    @sprockets ||= SprocketsBuilder.new(self).sprockets
  end
  def main_page
    @page ||= PageBuilder.new(self, root.join("index.html.erb"))
  end
end
