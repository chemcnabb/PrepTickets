module TagHelper
  module ClassMethods
  end
  
  module InstanceMethods
    BOOLEAN_ATTRIBUTES = %w(disabled readonly multiple checked autobuffer
                         autoplay controls loop selected hidden scoped async
                         defer reversed ismap seemless muted required
                         autofocus novalidate formnovalidate open pubdate).to_set
    BOOLEAN_ATTRIBUTES.merge(BOOLEAN_ATTRIBUTES.map {|attribute| attribute.to_sym })

    def stylesheet_tag(source, options={})
      tag("link", { "rel" => "stylesheet", "type" => "text/css", "media" => "screen", "href" => source }.merge(options), false)
    end
    def javascript_tag(source, options={})
      content_tag("script", "", { "type" => "application/javascript", "src" => source }.merge(options))
    end
    def tag(name, options = nil, open = false)
      "<#{name}#{tag_options(options) if options}#{open ? ">" : " />"}"
    end
    def tag_options(options)
      unless options.blank?
        attrs = []
        options.each_pair do |key, value|
          if key.to_s == 'data' && value.is_a?(Hash)
            value.each do |k, v|
              if !v.is_a?(String) && !v.is_a?(Symbol)
                v = v.to_json
              end
              attrs << %(data-#{k.to_s.dasherize}="#{v}")
            end
          elsif BOOLEAN_ATTRIBUTES.include?(key)
            attrs << %(#{key}="#{key}") if value
          elsif !value.nil?
            final_value = value.is_a?(Array) ? value.join(" ") : value
            attrs << %(#{key}="#{final_value}")
          end
        end
        " #{attrs.sort * ' '}" unless attrs.empty?
      end
    end

    def content_tag(name, content_or_options_with_block = nil, options = nil, &block)
      if block_given?
        options = content_or_options_with_block if content_or_options_with_block.is_a?(Hash)
        content_tag_string(name, capture(&block), options)
      else
        content_tag_string(name, content_or_options_with_block, options)
      end
    end

    #######
    private
    #######
    
    def content_tag_string(name, content, options)
      tag_options = tag_options(options) if options
      "<#{name}#{tag_options}>#{content}</#{name}>"
    end
  end
  
  def self.included(receiver)
    receiver.extend         ClassMethods
    receiver.send :include, InstanceMethods
  end
end