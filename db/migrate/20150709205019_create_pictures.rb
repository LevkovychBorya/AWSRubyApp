class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :title
      t.text :description
      t.string :image
      t.references :album, index: true

      t.timestamps null: false
    end
  end
end
