#\ -p 8000

require './lib/sprockets_builder'

Bundler.require

ROOT = File.expand_path(File.dirname(__FILE__)) + "/apps"

assets = SprocketsBuilder.new(ROOT).assets

###
# TODO: Get access to list of files loaded for an asset by going assets['app.js'].to_a (pop last item because it will be app.js)
###
 
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
      File.open(File.join(ROOT, 'index.html'), File::RDONLY)
    ]
  }
end
