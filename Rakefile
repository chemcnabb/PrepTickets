require './lib/sprockets_builder'

Bundler.require

desc "Renders files for production"
task :render do
  # TODO: Finish this - Something similar to http://www.simonecarletti.com/blog/2011/09/using-sprockets-without-a-railsrack-project/
  # Need to keep in mind an env variable
  ROOT = Pathname(File.dirname(__FILE__)).realpath
  
  BUILD_DIR = ROOT.join("build")

  FileUtils.rm_rf(BUILD_DIR) if File.exists?(BUILD_DIR)
  Dir.mkdir(BUILD_DIR)
  
  sprockets = SprocketsBuilder.new(ROOT.join("apps")).sprockets
  sprockets.css_compressor = :yui
  sprockets.js_compressor = :uglifier

  BUNDLES = %w( app.css app.js )

  BUNDLES.each do |bundle|
    assets = sprockets.find_asset(bundle)

    prefix, basename = assets.pathname.to_s.split('/')[-2..-1]
    FileUtils.mkpath BUILD_DIR.join(prefix)


    realname = assets.pathname.basename.to_s.split(".")[0..1].join(".")
    File.open("#{BUILD_DIR.join(prefix, realname)}", 'wb') do |f|
      f.write assets.to_s
    end

    # assets.write_to(BUILD_DIR.join(prefix, basename))
    # assets.to_a.each do |asset|
    #   # strip filename.css.foo.bar.css multiple extensions
    #   realname = asset.pathname.basename.to_s.split(".")[0..1].join(".")
    #   asset.write_to(BUILD_DIR.join(prefix, realname))
    # end

  end



end