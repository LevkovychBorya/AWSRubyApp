if Rails.env.test? || Rails.env.cucumber?
  CarrierWave.configure do |config|
    config.storage = :file
    config.enable_processing = false
end
end
  

#   # make sure our uploader is auto-loaded
  AttachmentUploader

  # use different dirs when testing
  CarrierWave::Uploader::Base.descendants.each do |klass|
    next if klass.anonymous?
    klass.class_eval do
      def cache_dir
        "#{Rails.root}/spec/support/uploads/tmp"
      end

      def store_dir
        "#{Rails.root}/spec/support/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
      end
    end
  end
# config/initializers/carrierwave.rb
  CarrierWave.configure do |config|
    config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => ENV["AWS_ACCESS_KEY"],
      :aws_secret_access_key  => ENV["AWS_SECRET_KEY"]
    }
    config.fog_directory  = ENV["AWS_BUCKET"]

    if Rails.env.test? || Rails.env.cucumber?
        config.storage = :file
        config.enable_processing = false
        config.root = "#{Rails.root}/tmp"
    else
        config.storage = :fog
    end
end


