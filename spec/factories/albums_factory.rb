FactoryGirl.define do
  factory :album do
    sequence(:title) { |n| "Album title #{n}" }
    description 'Standart album description'
    user_id 4

    factory :album_with_pictures do
      transient do
        pictures_count 5
      end
      after(:create) do |album, evaluator|
        create_list(:picture, evaluator.pictures_count, album: album)
      end
    end
    trait :without_title do
      title ''
    end
    trait :too_long_description do
      description 'd ' * 301
    end
  end
end
