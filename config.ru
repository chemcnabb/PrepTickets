require 'sprockets'
require 'coffee_script'
require "sprockets-less"
require "less"

project_root = File.expand_path(File.dirname(__FILE__)) + "/apps"

assets = Sprockets::Environment.new(project_root) do |env|
  env.logger = Logger.new(STDOUT)
end
 
assets.append_path(File.join(project_root, 'js'))
assets.append_path(File.join(project_root, 'css'))
assets.append_path(File.join(project_root, 'lib'))
Dir["#{project_root}/lib/*/"].map do |a|
  # assets.logger.debug a.sub(/(\/)+$/,'')
  assets.append_path a.sub(/(\/)+$/,'')
end
 
map "/assets" do
  run assets
end
 
map "/" do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open(File.join(project_root, 'index.html'), File::RDONLY)
    ]
  }
end