FactoryGirl.define do 
  factory :menu do |f|
    f.parent_id 0
    f.name "Exams"
    f.url '#exams'
  end 

  factory :invalid_menu, parent: :menu do |f|
    f.name nil 
  end
end 
