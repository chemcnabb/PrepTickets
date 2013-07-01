#\ -p 8000
require './lib/application'

app = Application.new(:development)

use Rack::Reloader, 0
use Rack::LiveReload

Application::ASSET_DIRS.each do |dir|
  map "/#{dir}" do
    run app.sprockets
  end
end

map "/locales/en/translation.json" do
  run lambda { |env| 
    [
      200,
      {
        'Content-Type' => "application/json",
      },
      File.open(app.root.join('locales/en/translation.json'), File::RDONLY)
    ]
  }
end

 
map "/" do
  run app.main_page
end