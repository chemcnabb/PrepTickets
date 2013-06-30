# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload' do
  watch(%r{apps/.+\.(erb|haml|slim)$})
  watch(%r{apps/js/.+\.rb})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
  # Rails Assets Pipeline
  watch(%r{apps(/(js|css|lib)/\w+/(.+\.(css|js|html))).*}) { |m| "#{m[1]}" }
  # watch(%r{(apps|vendor)(/assets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
end
