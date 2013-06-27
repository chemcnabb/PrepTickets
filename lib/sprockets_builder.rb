#Used to build sprocket assets

class SprocketsBuilder
  attr_accessor :root, :assets
  def initialize root
    self.root = root
    self.assets = Sprockets::Environment.new(root) do |env|
      env.logger = Logger.new(STDOUT)
    end
     
    assets.append_path(File.join(root, 'js'))
    assets.append_path(File.join(root, 'css'))
    assets.append_path(File.join(root, 'lib'))
    Dir["#{root}/lib/*/"].map do |a|
      # assets.logger.debug a.sub(/(\/)+$/,'')
      assets.append_path a.sub(/(\/)+$/,'')
    end
  end
end