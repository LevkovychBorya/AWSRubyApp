class CreateArticlesUsersJoinTable < ActiveRecord::Migration
  def change
    create_table :articles_users, id: false do |t|
      t.integer :article_id
      t.integer :user_id
    end

    add_index :articles_users, :article_id
    add_index :articles_users, :user_id
  end
end
