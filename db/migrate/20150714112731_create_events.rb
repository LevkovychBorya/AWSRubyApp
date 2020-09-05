class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.integer :capacity
      t.datetime :date
      t.string :place
      t.float :latitude
      t.float :longitude

      t.timestamps null: false
    end
  end
end
