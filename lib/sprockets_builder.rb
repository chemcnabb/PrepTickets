#Used to build sprocket assets

class SprocketsBuilder
  attr_accessor :root, :sprockets
  def initialize root
    self.root = root
    self.sprockets = Sprockets::Environment.new(root) do |env|
      env.logger = Logger.new(STDOUT)
    end
     
    sprockets.append_path(File.join(root, 'js'))
    sprockets.append_path(File.join(root, 'css'))
    sprockets.append_path(File.join(root, 'lib'))
    Dir["#{root}/lib/*/"].map do |a|
      # sprockets.logger.debug a.sub(/(\/)+$/,'')
      sprockets.append_path a.sub(/(\/)+$/,'')
    end
  end
end