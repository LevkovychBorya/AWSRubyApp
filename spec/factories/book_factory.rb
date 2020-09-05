FactoryGirl.define do
factory :book do
   title 'lalala'
   description 'lalala'
   attachment Rack::Test::UploadedFile.new(File.open(File.join(Rails.root,'spec', 'fixtures', 'books', 'Template.docx')))
end
end
