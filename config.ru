#\ -p 8000
require './lib/application'

app = Application.new(:development)

use Rack::Reloader, 0

map "/js" do
  run app.sprockets
end
map "/lib" do
  run app.sprockets
end

map "/css" do
  run app.sprockets
end

 
map "/" do
  run app.main_page
end