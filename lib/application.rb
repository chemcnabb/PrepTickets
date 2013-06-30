$LOAD_PATH << '.'
$LOAD_PATH << './lib'

require 'sprockets_builder'
require 'page_builder'
require 'active_support/core_ext/object'
Bundler.require



class Application
  APP_DIR = "apps"
  attr_accessor :env
  def initialize (env=:development)
    self.env = env
  end
  
  def development?
    self.env.to_s == "development"
  end
  class << self #Class methods
    def root
      @root ||= project_root.join(Application::APP_DIR).realpath
    end
    def project_root
      @project_root ||= Pathname(File.dirname(__FILE__)).parent.realpath
    end
  end # of class methods
  
  def root
    self.class.root
  end

  def sprockets
    @sprockets ||= SprocketsBuilder.new(root).sprockets
  end
  def main_page
    @page ||= PageBuilder.new(self)
  end
end
