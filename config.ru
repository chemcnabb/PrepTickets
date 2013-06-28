#\ -p 8000

require './lib/sprockets_builder'

Bundler.require

ROOT = File.expand_path(File.dirname(__FILE__)) + "/apps"

sprockets = SprocketsBuilder.new(ROOT).sprockets

###
# TODO: Get access to list of files loaded for an asset by going sprockets['app.js'].to_a (pop last item because it will be app.js)
###
 
map "/assets" do
  run sprockets
end
 
map "/" do
  run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open(File.join(ROOT, 'index.html'), File::RDONLY)
    ]
  }
end
