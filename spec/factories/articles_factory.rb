FactoryGirl.define do
  factory :article do |f|
    sequence(:title){|n| "Article#{n}" }
    body 'Some awesome text'
    status 'shared'

    factory :article_with_author do
      after(:build) {|article| article.users = [create(:user)]}
    end

    trait :restricted do
      status 'restricted'
    end

    trait :modified do
      title 'new title'
      body 'new body'
      status 'restricted'
    end
  end
end
