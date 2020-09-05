
FactoryGirl.define do

  factory :event do |f|
    f.id 1
    f.name 'Event'
    f.description 'I had a dream, which was not all a dream. The bright sun was extinguish’d, and the stars Did wander darkling in the eternal space, Rayless, and pathless, and the icy earth'
    f.capacity 15
    f.date {Time.now}
    f.place 'Lviv Franko National University'
    f.latitude 49.84061
    f.longitude 24.02251

    trait :without_name do
      name ''
    end

    trait :with_short_name do
      name 'Abc'
    end

    trait :with_long_name do
      name 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    end

    trait :with_short_description do
      description 'I had a dream'
    end

  end
end