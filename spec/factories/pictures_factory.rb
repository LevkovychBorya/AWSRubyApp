FactoryGirl.define do
  factory :picture do
    sequence(:title) { |n| "Picture #{n}" }
    description "Standart picture description"
    association :album, factory: :album
    #image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'app', 'assets', 'images', 'people.jpg')) }
    # image 'assets/images/people.jpg'
    # image { File.open("#{Rails.root}/app/assets/images/people.jpg") }
   image Rack::Test::UploadedFile.new(File.open(File.join(Rails.root,'spec', 'fixtures', 'pictures', 'people.jpg')))


  end
  trait :without_album do 
    album_id nil
  end
  trait :oversized_file do 
    #image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'app', 'assets', 'images', 'jir.jpg')) }
    #image 'assets/images/jir.jpg'
    # image { File.open("#{Rails.root}/app/assets/images/jir.jpg") }
   image Rack::Test::UploadedFile.new(File.open(File.join(Rails.root,'spec', 'fixtures', 'pictures', 'jir.jpg')))
  end
end
