#\ -p 8000

require './lib/sprockets_builder'

Bundler.require

ROOT = Pathname(File.dirname(__FILE__)).join('apps').realpath

sprockets = SprocketsBuilder.new(ROOT).sprockets
 
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
